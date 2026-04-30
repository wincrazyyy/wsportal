-- ====================================================================================
-- ENUMERATED TYPES
-- ====================================================================================

CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');
CREATE TYPE announcement_type AS ENUM ('standard', 'important', 'event');
CREATE TYPE topic_status AS ENUM ('locked', 'active', 'completed');
CREATE TYPE forum_post_type AS ENUM ('general', 'video_qa');

-- ====================================================================================
-- SHARED TRIGGER FUNCTIONS
-- ====================================================================================

CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.set_current_timestamp_updated_at() IS 'Generic trigger function to enforce accurate audit trails for record modifications.';

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, first_name, last_name, display_name, role)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name',
        NEW.raw_user_meta_data->>'display_name',
        'student'::user_role
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMENT ON FUNCTION public.handle_new_user() IS 'Automates profile provisioning upon identity creation. Hard-codes role to student to neutralize privilege escalation via user-controlled signup metadata. Runs with SECURITY DEFINER to bypass RLS during the authentication flow.';

-- ====================================================================================
-- PROFILES & RBAC
-- ====================================================================================

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    display_name VARCHAR(100),
    role user_role DEFAULT 'student'::user_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
COMMENT ON TABLE profiles IS 'Extended user profile data maintaining a strict 1:1 relationship with the external authentication provider.';
COMMENT ON COLUMN profiles.role IS 'Determines application-level access boundaries and feature flagging.';

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

-- ====================================================================================
-- CORE CURRICULUM ARCHITECTURE
-- ====================================================================================

CREATE TABLE classes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE, 
    title VARCHAR(255) NOT NULL, 
    tutor_id UUID REFERENCES profiles(id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
COMMENT ON TABLE classes IS 'Defines top-level instructional containers within the platform hierarchy.';
COMMENT ON COLUMN classes.tutor_id IS 'Permits NULL on deletion to preserve historical class data if an instructor is removed from the system.';

CREATE INDEX idx_classes_tutor_id ON classes(tutor_id);

CREATE TRIGGER set_classes_updated_at
    BEFORE UPDATE ON classes
    FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

-- ------------------------------------------------------------------------------------

CREATE TABLE class_enrollments (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE ON UPDATE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (user_id, class_id)
);
COMMENT ON TABLE class_enrollments IS 'Resolves the many-to-many relationship between users and classes.';
COMMENT ON COLUMN class_enrollments.user_id IS 'Acts as the leading column in the primary key B-tree, implicitly indexing queries filtering strictly by user_id.';

-- Secondary index required for reverse lookups (e.g., retrieving all users for a specific class)
CREATE INDEX idx_class_enrollments_class_id ON class_enrollments(class_id);

CREATE TRIGGER set_class_enrollments_updated_at
    BEFORE UPDATE ON class_enrollments
    FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

-- ------------------------------------------------------------------------------------

CREATE TABLE topics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    title VARCHAR(255) NOT NULL,
    total_duration INTERVAL, 
    status topic_status DEFAULT 'locked'::topic_status NOT NULL,
    order_index INTEGER NOT NULL CHECK (order_index >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
COMMENT ON TABLE topics IS 'First-order structural children of classes, representing sequential learning modules.';
COMMENT ON COLUMN topics.total_duration IS 'Utilises native INTERVAL type to allow precise date/time arithmetic and aggregation.';

CREATE INDEX idx_topics_class_id ON topics(class_id);

CREATE TRIGGER set_topics_updated_at
    BEFORE UPDATE ON topics
    FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

-- ------------------------------------------------------------------------------------

CREATE TABLE subtopics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE ON UPDATE CASCADE,
    title VARCHAR(255) NOT NULL,
    order_index INTEGER NOT NULL CHECK (order_index >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
COMMENT ON TABLE subtopics IS 'Second-order structural children providing granular organisational boundaries within topics.';

CREATE INDEX idx_subtopics_topic_id ON subtopics(topic_id);

CREATE TRIGGER set_subtopics_updated_at
    BEFORE UPDATE ON subtopics
    FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

-- ------------------------------------------------------------------------------------

CREATE TABLE videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subtopic_id UUID NOT NULL REFERENCES subtopics(id) ON DELETE CASCADE ON UPDATE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTERVAL,
    video_url VARCHAR(2048), 
    order_index INTEGER NOT NULL CHECK (order_index >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT chk_videos_url_format CHECK (
        video_url IS NULL OR video_url ~* '^https?://'
    )
);
COMMENT ON TABLE videos IS 'Primary instructional media nodes tied strictly to subtopics.';
COMMENT ON COLUMN videos.video_url IS 'Constrained to 2048 characters matching the maximum safe limit for standardised web URLs.';
COMMENT ON CONSTRAINT chk_videos_url_format ON videos IS 'Ensures any provided URL is a valid HTTP/HTTPS format, preventing plain-text data entry errors.';

CREATE INDEX idx_videos_subtopic_id ON videos(subtopic_id);

CREATE TRIGGER set_videos_updated_at
    BEFORE UPDATE ON videos
    FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

-- ------------------------------------------------------------------------------------

CREATE TABLE resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    size_bytes BIGINT NOT NULL CHECK (size_bytes >= 0), 
    file_url VARCHAR(2048) NOT NULL,
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE ON UPDATE CASCADE,
    subtopic_id UUID REFERENCES subtopics(id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT chk_resource_parent_exclusivity CHECK (
        (topic_id IS NOT NULL AND subtopic_id IS NULL) OR 
        (topic_id IS NULL AND subtopic_id IS NOT NULL)
    ),
    CONSTRAINT chk_resources_url_format CHECK (file_url ~* '^https?://')
);
COMMENT ON TABLE resources IS 'Polymorphic asset table supporting attachments to either topics or subtopics via constrained exclusivity.';
COMMENT ON COLUMN resources.size_bytes IS 'Enforces BIGINT to prevent overflow issues common with large file representations in 32-bit integers.';
COMMENT ON CONSTRAINT chk_resource_parent_exclusivity ON resources IS 'Guarantees the structural integrity of the asset hierarchy by acting as an XOR gate.';
COMMENT ON CONSTRAINT chk_resources_url_format ON resources IS 'Enforces valid HTTP/HTTPS protocol formatting for the mandatory file_url.';

CREATE INDEX idx_resources_topic_id ON resources(topic_id);
CREATE INDEX idx_resources_subtopic_id ON resources(subtopic_id);

CREATE TRIGGER set_resources_updated_at
    BEFORE UPDATE ON resources
    FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

-- ====================================================================================
-- USER PROGRESS TRACKING
-- ====================================================================================

CREATE TABLE user_video_progress (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE ON UPDATE CASCADE,
    video_id UUID REFERENCES videos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    last_position INTERVAL DEFAULT '0 seconds'::interval NOT NULL 
        CHECK (last_position >= '0 seconds'::interval),
    total_watch_time INTERVAL DEFAULT '0 seconds'::interval NOT NULL 
        CHECK (total_watch_time >= '0 seconds'::interval),
    is_completed BOOLEAN DEFAULT FALSE NOT NULL,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (user_id, video_id)
);
COMMENT ON TABLE user_video_progress IS 'Stateful record of client-side playback telemetry and definitive completion metrics.';
COMMENT ON COLUMN user_video_progress.last_position IS 'Maintains the exact playhead coordinate as an INTERVAL for persistent resume functionality.';
COMMENT ON COLUMN user_video_progress.total_watch_time IS 'Aggregates total engagement duration as an INTERVAL, facilitating advanced retention analytics.';

CREATE INDEX idx_user_video_progress_video_id ON user_video_progress(video_id);

CREATE TRIGGER set_user_video_progress_updated_at
    BEFORE UPDATE ON user_video_progress
    FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

-- ====================================================================================
-- COMMUNICATIONS & FORUM
-- ====================================================================================

CREATE TABLE announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE ON UPDATE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type announcement_type DEFAULT 'standard'::announcement_type NOT NULL,
    link_title VARCHAR(255),
    link_url VARCHAR(2048),
    image_alt VARCHAR(255),
    image_url VARCHAR(2048),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT chk_announcements_link_url_format CHECK (
        link_url IS NULL OR link_url ~* '^https?://'
    ),
    CONSTRAINT chk_announcements_image_url_format CHECK (
        image_url IS NULL OR image_url ~* '^https?://'
    )
);
COMMENT ON TABLE announcements IS 'Unidirectional broadcast payloads distributed from administrators/tutors to enrolled users.';
COMMENT ON CONSTRAINT chk_announcements_link_url_format ON announcements IS 'Ensures optional link attachments are valid HTTP/HTTPS URLs.';
COMMENT ON CONSTRAINT chk_announcements_image_url_format ON announcements IS 'Ensures optional image attachments are valid HTTP/HTTPS URLs.';

CREATE INDEX idx_announcements_class_id ON announcements(class_id);
CREATE INDEX idx_announcements_author_id ON announcements(author_id);

CREATE TRIGGER set_announcements_updated_at
    BEFORE UPDATE ON announcements
    FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

-- ------------------------------------------------------------------------------------

CREATE TABLE forum_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE ON UPDATE CASCADE,
    type forum_post_type DEFAULT 'general'::forum_post_type NOT NULL,
    video_id UUID REFERENCES videos(id) ON DELETE CASCADE ON UPDATE CASCADE, 
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0 NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT chk_forum_post_video_context CHECK (
        (type = 'general' AND video_id IS NULL) OR 
        (type = 'video_qa' AND video_id IS NOT NULL)
    )
);
COMMENT ON TABLE forum_posts IS 'Primary asynchronous discussion nodes establishing the root of a conversation thread.';
COMMENT ON CONSTRAINT chk_forum_post_video_context ON forum_posts IS 'Enforces the presence of a target video reference exclusively when the thread context demands it.';

CREATE INDEX idx_forum_posts_class_id ON forum_posts(class_id);
CREATE INDEX idx_forum_posts_author_id ON forum_posts(author_id);
CREATE INDEX idx_forum_posts_video_id ON forum_posts(video_id);

CREATE TRIGGER set_forum_posts_updated_at
    BEFORE UPDATE ON forum_posts
    FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

-- ------------------------------------------------------------------------------------

CREATE TABLE forum_replies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
    parent_reply_id UUID REFERENCES forum_replies(id) ON DELETE CASCADE ON UPDATE CASCADE,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE ON UPDATE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
COMMENT ON TABLE forum_replies IS 'Conversational appendages supporting infinite nesting via an adjacency list architecture.';
COMMENT ON COLUMN forum_replies.post_id IS 'Binds the reply to the root discussion thread. Retained on all nested replies to prevent expensive recursive lookups when fetching a flat thread count.';
COMMENT ON COLUMN forum_replies.parent_reply_id IS 'Self-referencing constraint enabling hierarchical, threaded comment trees. A NULL value indicates a top-level reply directly to the main post.';

CREATE INDEX idx_forum_replies_post_id ON forum_replies(post_id);
CREATE INDEX idx_forum_replies_parent_reply_id ON forum_replies(parent_reply_id);
CREATE INDEX idx_forum_replies_author_id ON forum_replies(author_id);

CREATE TRIGGER set_forum_replies_updated_at
    BEFORE UPDATE ON forum_replies
    FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

-- ------------------------------------------------------------------------------------

CREATE TABLE forum_post_upvotes (
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE ON UPDATE CASCADE,
    post_id UUID NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (user_id, post_id)
);
COMMENT ON TABLE forum_post_upvotes IS 'Authoritative ledger of forum post endorsements. The composite primary key enforces one-vote-per-user, and the table serves as the source of truth feeding the denormalized forum_posts.upvotes counter.';

CREATE INDEX idx_forum_post_upvotes_post_id ON forum_post_upvotes(post_id);

CREATE OR REPLACE FUNCTION public.maintain_forum_post_upvote_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.forum_posts SET upvotes = upvotes + 1 WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.forum_posts SET upvotes = GREATEST(upvotes - 1, 0) WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMENT ON FUNCTION public.maintain_forum_post_upvote_count() IS 'Maintains the denormalized forum_posts.upvotes counter in lockstep with the forum_post_upvotes ledger. Runs as SECURITY DEFINER so the upvoter (who is typically not the post owner) can mutate the counter despite forum_posts RLS.';

CREATE TRIGGER maintain_upvote_count_on_insert
    AFTER INSERT ON forum_post_upvotes
    FOR EACH ROW EXECUTE PROCEDURE public.maintain_forum_post_upvote_count();

CREATE TRIGGER maintain_upvote_count_on_delete
    AFTER DELETE ON forum_post_upvotes
    FOR EACH ROW EXECUTE PROCEDURE public.maintain_forum_post_upvote_count();

-- ====================================================================================
-- ANTI-TAMPERING TRIGGERS
-- ====================================================================================

CREATE OR REPLACE FUNCTION public.prevent_immutable_modifications()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        IF NEW.id IS DISTINCT FROM OLD.id THEN
            RAISE EXCEPTION 'SECURITY VIOLATION: Primary key modifications are strictly prohibited.';
        END IF;
        IF NEW.created_at IS DISTINCT FROM OLD.created_at THEN
            RAISE EXCEPTION 'SECURITY VIOLATION: created_at timestamp modifications are strictly prohibited.';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.prevent_immutable_modifications() IS 'Hard-rejects any attempt to modify immutable tracking and identity columns (id, created_at) to ensure cryptographic audit integrity.';

CREATE OR REPLACE FUNCTION public.protect_profile_role()
RETURNS TRIGGER AS $$
BEGIN
    -- If the user is NOT an admin, prevent them from changing their own role
    IF public.get_user_role() != 'admin' THEN
        IF NEW.role IS DISTINCT FROM OLD.role THEN
            RAISE EXCEPTION 'SECURITY VIOLATION: Only admins can modify user roles.';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.protect_profile_role() IS 'Prevents non-admins from escalating or changing their own application roles.';

CREATE OR REPLACE FUNCTION public.protect_forum_post_ownership()
RETURNS TRIGGER AS $$
BEGIN
    -- If the user is NOT an admin, prevent them from reassigning ownership or class
    IF public.get_user_role() != 'admin' THEN
        IF NEW.author_id IS DISTINCT FROM OLD.author_id THEN
            RAISE EXCEPTION 'SECURITY VIOLATION: Post authorship cannot be reassigned.';
        END IF;
        IF NEW.class_id IS DISTINCT FROM OLD.class_id THEN
            RAISE EXCEPTION 'SECURITY VIOLATION: Posts cannot be moved between classes.';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.protect_forum_post_ownership() IS 'Prevents users and tutors from tampering with the original authorship or class association of a forum post.';

CREATE OR REPLACE FUNCTION public.protect_forum_post_upvotes()
RETURNS TRIGGER AS $$
BEGIN
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;

    IF NEW.upvotes IS DISTINCT FROM OLD.upvotes AND public.get_user_role() != 'admin' THEN
        RAISE EXCEPTION 'SECURITY VIOLATION: Direct manipulation of upvote counts is prohibited. Insert into forum_post_upvotes instead.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION public.protect_forum_post_upvotes() IS 'Hard-rejects direct UPDATEs to the denormalized forum_posts.upvotes column by non-admins. Legitimate increments and decrements flow through the forum_post_upvotes ledger and are detected via pg_trigger_depth().';

-- Apply anti-tampering to all tables
CREATE TRIGGER enforce_immutability_profiles BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE public.prevent_immutable_modifications();
CREATE TRIGGER enforce_immutability_classes BEFORE UPDATE ON classes FOR EACH ROW EXECUTE PROCEDURE public.prevent_immutable_modifications();
CREATE TRIGGER enforce_immutability_topics BEFORE UPDATE ON topics FOR EACH ROW EXECUTE PROCEDURE public.prevent_immutable_modifications();
CREATE TRIGGER enforce_immutability_subtopics BEFORE UPDATE ON subtopics FOR EACH ROW EXECUTE PROCEDURE public.prevent_immutable_modifications();
CREATE TRIGGER enforce_immutability_videos BEFORE UPDATE ON videos FOR EACH ROW EXECUTE PROCEDURE public.prevent_immutable_modifications();
CREATE TRIGGER enforce_immutability_resources BEFORE UPDATE ON resources FOR EACH ROW EXECUTE PROCEDURE public.prevent_immutable_modifications();
CREATE TRIGGER enforce_immutability_announcements BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE PROCEDURE public.prevent_immutable_modifications();
CREATE TRIGGER enforce_immutability_forum_posts BEFORE UPDATE ON forum_posts FOR EACH ROW EXECUTE PROCEDURE public.prevent_immutable_modifications();
CREATE TRIGGER enforce_immutability_forum_replies BEFORE UPDATE ON forum_replies FOR EACH ROW EXECUTE PROCEDURE public.prevent_immutable_modifications();

-- Apply specific column protection triggers
CREATE TRIGGER enforce_role_security BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE public.protect_profile_role();
CREATE TRIGGER enforce_forum_post_security BEFORE UPDATE ON forum_posts FOR EACH ROW EXECUTE PROCEDURE public.protect_forum_post_ownership();
CREATE TRIGGER enforce_upvote_count_integrity BEFORE UPDATE ON forum_posts FOR EACH ROW EXECUTE PROCEDURE public.protect_forum_post_upvotes();

-- ====================================================================================
-- SECURITY HELPER FUNCTIONS
-- ====================================================================================

CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS public.user_role AS $$
DECLARE
    v_role public.user_role;
BEGIN
    SELECT role INTO v_role FROM public.profiles WHERE id = auth.uid();
    RETURN COALESCE(v_role, 'student'::public.user_role);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
COMMENT ON FUNCTION public.get_user_role() IS 'Bypasses RLS to securely fetch the requesting user role for policy evaluation. Marked as STABLE to cache results per-query and prevent performance degradation during large RLS scans.';

CREATE OR REPLACE FUNCTION public.get_user_class_ids()
RETURNS SETOF UUID AS $$
BEGIN
    RETURN QUERY
        SELECT class_id FROM public.class_enrollments WHERE user_id = auth.uid()
        UNION
        SELECT id FROM public.classes WHERE tutor_id = auth.uid();
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
COMMENT ON FUNCTION public.get_user_class_ids() IS 'Calculates the authorization perimeter for class-bound resources, mapping a user to all enrolled or tutored class IDs. Marked as STABLE for query optimization.';

CREATE OR REPLACE FUNCTION public.is_class_tutor(p_class_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    -- Executes as the function owner, bypassing RLS on the 'classes' table
    RETURN EXISTS (
        SELECT 1 FROM public.classes 
        WHERE id = p_class_id AND tutor_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
COMMENT ON FUNCTION public.is_class_tutor(UUID) IS 'Bypasses RLS to check if the current user is the tutor of a given class, preventing infinite recursion loops.';

-- ====================================================================================
-- RLS ACTIVATION
-- ====================================================================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE subtopics ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_video_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_post_upvotes ENABLE ROW LEVEL SECURITY;

-- Force RLS ensures even table owners respect the policies
ALTER TABLE profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE classes FORCE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments FORCE ROW LEVEL SECURITY;
ALTER TABLE topics FORCE ROW LEVEL SECURITY;
ALTER TABLE subtopics FORCE ROW LEVEL SECURITY;
ALTER TABLE videos FORCE ROW LEVEL SECURITY;
ALTER TABLE resources FORCE ROW LEVEL SECURITY;
ALTER TABLE user_video_progress FORCE ROW LEVEL SECURITY;
ALTER TABLE announcements FORCE ROW LEVEL SECURITY;
ALTER TABLE forum_posts FORCE ROW LEVEL SECURITY;
ALTER TABLE forum_replies FORCE ROW LEVEL SECURITY;
ALTER TABLE forum_post_upvotes FORCE ROW LEVEL SECURITY;

-- ====================================================================================
-- ROW LEVEL SECURITY POLICIES
-- ====================================================================================

-- ------------------------------------------------------------------------------------
-- PROFILES
-- ------------------------------------------------------------------------------------
CREATE POLICY "Profiles_Select_AllAuth" ON profiles 
    FOR SELECT USING (auth.role() = 'authenticated');
COMMENT ON POLICY "Profiles_Select_AllAuth" ON profiles IS 'Permits read access to all authenticated users for public profile and forum rendering.';

CREATE POLICY "Profiles_Update_SelfOrAdmin" ON profiles 
    FOR UPDATE USING (public.get_user_role() = 'admin' OR auth.uid() = id);
COMMENT ON POLICY "Profiles_Update_SelfOrAdmin" ON profiles IS 'Restricts profile modifications to the owning user or administrators. Anti-tampering triggers prevent role escalation.';

-- ------------------------------------------------------------------------------------
-- CLASSES
-- ------------------------------------------------------------------------------------
CREATE POLICY "Classes_Select_Authorized" ON classes 
    FOR SELECT USING (public.get_user_role() = 'admin' OR id IN (SELECT public.get_user_class_ids()));
COMMENT ON POLICY "Classes_Select_Authorized" ON classes IS 'Restricts class visibility strictly to enrolled students, assigned tutors, and global administrators.';

CREATE POLICY "Classes_Update_TutorOrAdmin" ON classes 
    FOR UPDATE USING (public.get_user_role() = 'admin' OR tutor_id = auth.uid());
COMMENT ON POLICY "Classes_Update_TutorOrAdmin" ON classes IS 'Delegates class metadata modification rights to the assigned tutor and administrators.';

CREATE POLICY "Classes_Insert_Admin" ON classes FOR INSERT WITH CHECK (public.get_user_role() = 'admin');
COMMENT ON POLICY "Classes_Insert_Admin" ON classes IS 'Restricts the creation of new curriculum containers to administrators.';

CREATE POLICY "Classes_Delete_Admin" ON classes FOR DELETE USING (public.get_user_role() = 'admin');
COMMENT ON POLICY "Classes_Delete_Admin" ON classes IS 'Restricts the deletion of classes to administrators to prevent accidental hierarchical cascades.';

-- ------------------------------------------------------------------------------------
-- CLASS ENROLLMENTS
-- ------------------------------------------------------------------------------------
CREATE POLICY "Enrollments_Select_Authorized" ON class_enrollments 
    FOR SELECT USING (
        public.get_user_role() = 'admin' OR 
        user_id = auth.uid() OR 
        public.is_class_tutor(class_id)
    );
COMMENT ON POLICY "Enrollments_Select_Authorized" ON class_enrollments IS 'Allows users to view their own enrollments, whilst granting tutors visibility over their class rosters.';

CREATE POLICY "Enrollments_Insert_TutorOrAdmin" ON class_enrollments 
    FOR INSERT WITH CHECK (
        public.get_user_role() = 'admin' OR 
        public.is_class_tutor(class_id)
    );
COMMENT ON POLICY "Enrollments_Insert_TutorOrAdmin" ON class_enrollments IS 'Restricts the addition of students to a roster exclusively to the assigned tutor and administrators.';

CREATE POLICY "Enrollments_Delete_Authorized" ON class_enrollments 
    FOR DELETE USING (
        public.get_user_role() = 'admin' OR 
        user_id = auth.uid() OR 
        public.is_class_tutor(class_id)
    );
COMMENT ON POLICY "Enrollments_Delete_Authorized" ON class_enrollments IS 'Permits self-unenrollment by students, and roster management by tutors/administrators.';

-- ------------------------------------------------------------------------------------
-- CURRICULUM HIERARCHY
-- ------------------------------------------------------------------------------------

-- TOPICS
CREATE POLICY "Topics_Select_Authorized" ON topics 
    FOR SELECT USING (public.get_user_role() = 'admin' OR class_id IN (SELECT public.get_user_class_ids()));
COMMENT ON POLICY "Topics_Select_Authorized" ON topics IS 'Inherits visibility boundaries from the parent class enrollment status.';

CREATE POLICY "Topics_Modify_TutorOrAdmin" ON topics 
    FOR ALL USING (
        public.get_user_role() = 'admin' OR 
        EXISTS (SELECT 1 FROM classes WHERE id = topics.class_id AND tutor_id = auth.uid())
    );
COMMENT ON POLICY "Topics_Modify_TutorOrAdmin" ON topics IS 'Delegates structural modification rights (Insert/Update/Delete) for topics to the parent class tutor and administrators.';

-- SUBTOPICS
CREATE POLICY "Subtopics_Select_Authorized" ON subtopics 
    FOR SELECT USING (
        public.get_user_role() = 'admin' OR 
        EXISTS (
            SELECT 1 FROM topics t 
            WHERE t.id = subtopics.topic_id AND t.class_id IN (SELECT public.get_user_class_ids())
        )
    );
COMMENT ON POLICY "Subtopics_Select_Authorized" ON subtopics IS 'Inherits visibility boundaries from the parent topic hierarchy via an EXISTS join.';

CREATE POLICY "Subtopics_Modify_TutorOrAdmin" ON subtopics 
    FOR ALL USING (
        public.get_user_role() = 'admin' OR 
        EXISTS (
            SELECT 1 FROM topics t 
            JOIN classes c ON c.id = t.class_id 
            WHERE t.id = subtopics.topic_id AND c.tutor_id = auth.uid()
        )
    );
COMMENT ON POLICY "Subtopics_Modify_TutorOrAdmin" ON subtopics IS 'Delegates structural modification rights (Insert/Update/Delete) for subtopics to the parent class tutor via hierarchical resolution.';

-- VIDEOS
CREATE POLICY "Videos_Select_Authorized" ON videos 
    FOR SELECT USING (
        public.get_user_role() = 'admin' OR 
        EXISTS (
            SELECT 1 FROM subtopics s 
            JOIN topics t ON t.id = s.topic_id 
            WHERE s.id = videos.subtopic_id AND t.class_id IN (SELECT public.get_user_class_ids())
        )
    );
COMMENT ON POLICY "Videos_Select_Authorized" ON videos IS 'Inherits visibility boundaries from the parent curriculum structure.';

CREATE POLICY "Videos_Modify_TutorOrAdmin" ON videos 
    FOR ALL USING (
        public.get_user_role() = 'admin' OR 
        EXISTS (
            SELECT 1 FROM subtopics s 
            JOIN topics t ON t.id = s.topic_id 
            JOIN classes c ON c.id = t.class_id 
            WHERE s.id = videos.subtopic_id AND c.tutor_id = auth.uid()
        )
    );
COMMENT ON POLICY "Videos_Modify_TutorOrAdmin" ON videos IS 'Delegates video asset management (Insert/Update/Delete) to the parent class tutor via hierarchical resolution.';

-- RESOURCES
CREATE POLICY "Resources_Select_Authorized" ON resources 
    FOR SELECT USING (
        public.get_user_role() = 'admin' OR 
        EXISTS (SELECT 1 FROM topics t WHERE t.id = resources.topic_id AND t.class_id IN (SELECT public.get_user_class_ids())) OR
        EXISTS (
            SELECT 1 FROM subtopics s 
            JOIN topics t ON t.id = s.topic_id 
            WHERE s.id = resources.subtopic_id AND t.class_id IN (SELECT public.get_user_class_ids())
        )
    );
COMMENT ON POLICY "Resources_Select_Authorized" ON resources IS 'Resolves visibility boundaries dynamically depending on whether the resource is bound to a topic or a subtopic.';

CREATE POLICY "Resources_Modify_TutorOrAdmin" ON resources 
    FOR ALL USING (
        public.get_user_role() = 'admin' OR 
        EXISTS (
            SELECT 1 FROM topics t 
            JOIN classes c ON c.id = t.class_id 
            WHERE t.id = resources.topic_id AND c.tutor_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM subtopics s 
            JOIN topics t ON t.id = s.topic_id 
            JOIN classes c ON c.id = t.class_id 
            WHERE s.id = resources.subtopic_id AND c.tutor_id = auth.uid()
        )
    );
COMMENT ON POLICY "Resources_Modify_TutorOrAdmin" ON resources IS 'Delegates file asset management to the parent class tutor, dynamically evaluating the polymorphic parent linkage.';

-- ------------------------------------------------------------------------------------
-- USER VIDEO PROGRESS
-- ------------------------------------------------------------------------------------
CREATE POLICY "Progress_Select_Authorized" ON user_video_progress 
    FOR SELECT USING (
        public.get_user_role() = 'admin' OR 
        user_id = auth.uid() OR 
        EXISTS (
            SELECT 1 FROM videos v 
            JOIN subtopics s ON s.id = v.subtopic_id 
            JOIN topics t ON t.id = s.topic_id 
            JOIN classes c ON c.id = t.class_id 
            WHERE v.id = user_video_progress.video_id AND c.tutor_id = auth.uid()
        )
    );
COMMENT ON POLICY "Progress_Select_Authorized" ON user_video_progress IS 'Permits students to fetch their own telemetry state, while granting tutors visibility over analytics for their owned classes.';

CREATE POLICY "Progress_Insert_Self" ON user_video_progress 
    FOR INSERT WITH CHECK (user_id = auth.uid());
COMMENT ON POLICY "Progress_Insert_Self" ON user_video_progress IS 'Restricts generation of playback telemetry strictly to the authenticated user generating the state.';

CREATE POLICY "Progress_Update_Self" ON user_video_progress 
    FOR UPDATE USING (user_id = auth.uid());
COMMENT ON POLICY "Progress_Update_Self" ON user_video_progress IS 'Restricts updating of playback telemetry strictly to the authenticated user generating the state.';

-- ------------------------------------------------------------------------------------
-- ANNOUNCEMENTS & FORUMS
-- ------------------------------------------------------------------------------------
CREATE POLICY "Announcements_Select_Authorized" ON announcements 
    FOR SELECT USING (public.get_user_role() = 'admin' OR class_id IN (SELECT public.get_user_class_ids()));
COMMENT ON POLICY "Announcements_Select_Authorized" ON announcements IS 'Inherits visibility boundaries from the parent class enrollment status.';

CREATE POLICY "Announcements_Insert_Author" ON announcements 
    FOR INSERT WITH CHECK (
        public.get_user_role() = 'admin' OR 
        (author_id = auth.uid() AND EXISTS (SELECT 1 FROM classes WHERE id = announcements.class_id AND tutor_id = auth.uid()))
    );
COMMENT ON POLICY "Announcements_Insert_Author" ON announcements IS 'Secures unidirectional broadcast capability exclusively to the assigned class tutor and administrators.';

CREATE POLICY "Announcements_Update_Author" ON announcements
    FOR UPDATE USING (public.get_user_role() = 'admin' OR author_id = auth.uid());
COMMENT ON POLICY "Announcements_Update_Author" ON announcements IS 'Grants broadcast modification rights strictly to the original authoring tutor or global administrators. Scoped to UPDATE only — INSERT remains exclusively governed by Announcements_Insert_Author so enrolled students cannot self-author announcements via permissive policy ORing.';

CREATE POLICY "Announcements_Delete_Author" ON announcements
    FOR DELETE USING (public.get_user_role() = 'admin' OR author_id = auth.uid());
COMMENT ON POLICY "Announcements_Delete_Author" ON announcements IS 'Grants broadcast deletion rights strictly to the original authoring tutor or global administrators.';

-- FORUM POSTS
CREATE POLICY "ForumPosts_Select_Authorized" ON forum_posts 
    FOR SELECT USING (public.get_user_role() = 'admin' OR class_id IN (SELECT public.get_user_class_ids()));
COMMENT ON POLICY "ForumPosts_Select_Authorized" ON forum_posts IS 'Confines discussion visibility strictly to users enrolled in or tutoring the related class.';

CREATE POLICY "ForumPosts_Insert_Authorized" ON forum_posts 
    FOR INSERT WITH CHECK (
        author_id = auth.uid() AND 
        (public.get_user_role() = 'admin' OR class_id IN (SELECT public.get_user_class_ids()))
    );
COMMENT ON POLICY "ForumPosts_Insert_Authorized" ON forum_posts IS 'Permits thread creation by explicitly enforcing the author identity and validating active class enrollment.';

CREATE POLICY "ForumPosts_Update_Authorized" ON forum_posts 
    FOR UPDATE USING (
        public.get_user_role() = 'admin' OR 
        author_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM classes WHERE id = forum_posts.class_id AND tutor_id = auth.uid())
    );
COMMENT ON POLICY "ForumPosts_Update_Authorized" ON forum_posts IS 'Grants editing rights to authors and tutors. Anti-tampering triggers prevent authors from hijacking posts or moving classes.';

CREATE POLICY "ForumPosts_Delete_Authorized" ON forum_posts 
    FOR DELETE USING (
        public.get_user_role() = 'admin' OR 
        author_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM classes WHERE id = forum_posts.class_id AND tutor_id = auth.uid())
    );
COMMENT ON POLICY "ForumPosts_Delete_Authorized" ON forum_posts IS 'Permits content deletion by the original author, acting tutors (for moderation), or global administrators.';

-- FORUM REPLIES
CREATE POLICY "ForumReplies_Select_Authorized" ON forum_replies 
    FOR SELECT USING (
        public.get_user_role() = 'admin' OR 
        EXISTS (
            SELECT 1 FROM forum_posts fp 
            WHERE fp.id = forum_replies.post_id AND fp.class_id IN (SELECT public.get_user_class_ids())
        )
    );
COMMENT ON POLICY "ForumReplies_Select_Authorized" ON forum_replies IS 'Resolves reply visibility dynamically by validating access to the parent post context.';

CREATE POLICY "ForumReplies_Insert_Authorized" ON forum_replies 
    FOR INSERT WITH CHECK (
        author_id = auth.uid() AND 
        (
            public.get_user_role() = 'admin' OR 
            EXISTS (
                SELECT 1 FROM forum_posts fp 
                WHERE fp.id = forum_replies.post_id AND fp.class_id IN (SELECT public.get_user_class_ids())
            )
        )
    );
COMMENT ON POLICY "ForumReplies_Insert_Authorized" ON forum_replies IS 'Permits reply creation by enforcing author identity and validating access to the parent post context.';

CREATE POLICY "ForumReplies_Update_Author" ON forum_replies 
    FOR UPDATE USING (public.get_user_role() = 'admin' OR author_id = auth.uid());
COMMENT ON POLICY "ForumReplies_Update_Author" ON forum_replies IS 'Strictly isolates reply editing capabilities to the original author, preventing tutors from modifying student discourse.';

CREATE POLICY "ForumReplies_Delete_Authorized" ON forum_replies
    FOR DELETE USING (
        public.get_user_role() = 'admin' OR
        author_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM forum_posts fp
            JOIN classes c ON c.id = fp.class_id
            WHERE fp.id = forum_replies.post_id AND c.tutor_id = auth.uid()
        )
    );
COMMENT ON POLICY "ForumReplies_Delete_Authorized" ON forum_replies IS 'Permits reply deletion by the original author, acting tutors (for moderation), or global administrators.';

-- ------------------------------------------------------------------------------------
-- FORUM POST UPVOTES
-- ------------------------------------------------------------------------------------
CREATE POLICY "ForumPostUpvotes_Select_Authorized" ON forum_post_upvotes
    FOR SELECT USING (
        public.get_user_role() = 'admin' OR
        EXISTS (
            SELECT 1 FROM forum_posts fp
            WHERE fp.id = forum_post_upvotes.post_id AND fp.class_id IN (SELECT public.get_user_class_ids())
        )
    );
COMMENT ON POLICY "ForumPostUpvotes_Select_Authorized" ON forum_post_upvotes IS 'Mirrors forum post visibility — endorsements are visible only to users authorised to access the parent post context.';

CREATE POLICY "ForumPostUpvotes_Insert_Self" ON forum_post_upvotes
    FOR INSERT WITH CHECK (
        user_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM forum_posts fp
            WHERE fp.id = forum_post_upvotes.post_id AND fp.class_id IN (SELECT public.get_user_class_ids())
        )
    );
COMMENT ON POLICY "ForumPostUpvotes_Insert_Self" ON forum_post_upvotes IS 'Permits a user to register a single endorsement against a post within their authorisation perimeter. The composite primary key structurally prevents duplicate votes.';

CREATE POLICY "ForumPostUpvotes_Delete_Self" ON forum_post_upvotes
    FOR DELETE USING (public.get_user_role() = 'admin' OR user_id = auth.uid());
COMMENT ON POLICY "ForumPostUpvotes_Delete_Self" ON forum_post_upvotes IS 'Permits self-rescission of an endorsement, alongside administrative override for moderation.';
