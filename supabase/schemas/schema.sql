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
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student'::user_role)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMENT ON FUNCTION public.handle_new_user() IS 'Automates profile provisioning upon identity creation. Runs with SECURITY DEFINER to bypass RLS during the authentication flow.';

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
        (type = 'general') OR 
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

-- ====================================================================================
-- ROW LEVEL SECURITY (RLS) INITIALISATION
-- ====================================================================================

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
