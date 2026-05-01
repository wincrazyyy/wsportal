create type "public"."announcement_type" as enum ('standard', 'important', 'event');

create type "public"."forum_post_type" as enum ('general', 'video_qa');

create type "public"."topic_status" as enum ('locked', 'active', 'completed');

create type "public"."user_role" as enum ('student', 'educator', 'admin');


  create table "public"."announcements" (
    "id" uuid not null default gen_random_uuid(),
    "class_id" uuid not null,
    "author_id" uuid not null,
    "title" character varying(255) not null,
    "content" text not null,
    "type" public.announcement_type not null default 'standard'::public.announcement_type,
    "link_title" character varying(255),
    "link_url" character varying(2048),
    "image_alt" character varying(255),
    "image_url" character varying(2048),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."announcements" enable row level security;


  create table "public"."class_enrollments" (
    "user_id" uuid not null,
    "class_id" uuid not null,
    "enrolled_at" timestamp with time zone not null default now()
      );


alter table "public"."class_enrollments" enable row level security;


  create table "public"."classes" (
    "id" uuid not null default gen_random_uuid(),
    "code" character varying(50) not null,
    "title" character varying(255) not null,
    "educator_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."classes" enable row level security;


  create table "public"."forum_post_upvotes" (
    "user_id" uuid not null,
    "post_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."forum_post_upvotes" enable row level security;


  create table "public"."forum_posts" (
    "id" uuid not null default gen_random_uuid(),
    "class_id" uuid not null,
    "author_id" uuid not null,
    "type" public.forum_post_type not null default 'general'::public.forum_post_type,
    "video_id" uuid,
    "title" character varying(255) not null,
    "content" text not null,
    "upvotes" integer not null default 0,
    "is_resolved" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."forum_posts" enable row level security;


  create table "public"."forum_replies" (
    "id" uuid not null default gen_random_uuid(),
    "post_id" uuid not null,
    "parent_reply_id" uuid,
    "author_id" uuid not null,
    "content" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."forum_replies" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null,
    "first_name" character varying(100),
    "last_name" character varying(100),
    "display_name" character varying(100),
    "role" public.user_role not null default 'student'::public.user_role,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."profiles" enable row level security;


  create table "public"."resources" (
    "id" uuid not null default gen_random_uuid(),
    "title" character varying(255) not null,
    "size_bytes" bigint not null,
    "file_url" character varying(2048) not null,
    "topic_id" uuid,
    "subtopic_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."resources" enable row level security;


  create table "public"."subtopics" (
    "id" uuid not null default gen_random_uuid(),
    "topic_id" uuid not null,
    "title" character varying(255) not null,
    "order_index" integer not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."subtopics" enable row level security;


  create table "public"."topics" (
    "id" uuid not null default gen_random_uuid(),
    "class_id" uuid not null,
    "title" character varying(255) not null,
    "total_duration" interval,
    "status" public.topic_status not null default 'locked'::public.topic_status,
    "order_index" integer not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."topics" enable row level security;


  create table "public"."user_video_progress" (
    "user_id" uuid not null,
    "video_id" uuid not null,
    "last_position" interval not null default '00:00:00'::interval,
    "total_watch_time" interval not null default '00:00:00'::interval,
    "is_completed" boolean not null default false,
    "completed_at" timestamp with time zone,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."user_video_progress" enable row level security;


  create table "public"."videos" (
    "id" uuid not null default gen_random_uuid(),
    "subtopic_id" uuid not null,
    "title" character varying(255) not null,
    "description" text,
    "duration" interval,
    "video_url" character varying(2048),
    "order_index" integer not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."videos" enable row level security;

CREATE UNIQUE INDEX announcements_pkey ON public.announcements USING btree (id);

CREATE UNIQUE INDEX class_enrollments_pkey ON public.class_enrollments USING btree (user_id, class_id);

CREATE UNIQUE INDEX classes_code_key ON public.classes USING btree (code);

CREATE UNIQUE INDEX classes_pkey ON public.classes USING btree (id);

CREATE UNIQUE INDEX forum_post_upvotes_pkey ON public.forum_post_upvotes USING btree (user_id, post_id);

CREATE UNIQUE INDEX forum_posts_pkey ON public.forum_posts USING btree (id);

CREATE UNIQUE INDEX forum_replies_pkey ON public.forum_replies USING btree (id);

CREATE INDEX idx_announcements_author_id ON public.announcements USING btree (author_id);

CREATE INDEX idx_announcements_class_id ON public.announcements USING btree (class_id);

CREATE INDEX idx_class_enrollments_class_id ON public.class_enrollments USING btree (class_id);

CREATE INDEX idx_classes_educator_id ON public.classes USING btree (educator_id);

CREATE INDEX idx_forum_post_upvotes_post_id ON public.forum_post_upvotes USING btree (post_id);

CREATE INDEX idx_forum_posts_author_id ON public.forum_posts USING btree (author_id);

CREATE INDEX idx_forum_posts_class_id ON public.forum_posts USING btree (class_id);

CREATE INDEX idx_forum_posts_video_id ON public.forum_posts USING btree (video_id);

CREATE INDEX idx_forum_replies_author_id ON public.forum_replies USING btree (author_id);

CREATE INDEX idx_forum_replies_parent_reply_id ON public.forum_replies USING btree (parent_reply_id);

CREATE INDEX idx_forum_replies_post_id ON public.forum_replies USING btree (post_id);

CREATE INDEX idx_resources_subtopic_id ON public.resources USING btree (subtopic_id);

CREATE INDEX idx_resources_topic_id ON public.resources USING btree (topic_id);

CREATE INDEX idx_subtopics_topic_id ON public.subtopics USING btree (topic_id);

CREATE INDEX idx_topics_class_id ON public.topics USING btree (class_id);

CREATE INDEX idx_user_video_progress_video_id ON public.user_video_progress USING btree (video_id);

CREATE INDEX idx_videos_subtopic_id ON public.videos USING btree (subtopic_id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX resources_pkey ON public.resources USING btree (id);

CREATE UNIQUE INDEX subtopics_pkey ON public.subtopics USING btree (id);

CREATE UNIQUE INDEX topics_pkey ON public.topics USING btree (id);

CREATE UNIQUE INDEX user_video_progress_pkey ON public.user_video_progress USING btree (user_id, video_id);

CREATE UNIQUE INDEX videos_pkey ON public.videos USING btree (id);

alter table "public"."announcements" add constraint "announcements_pkey" PRIMARY KEY using index "announcements_pkey";

alter table "public"."class_enrollments" add constraint "class_enrollments_pkey" PRIMARY KEY using index "class_enrollments_pkey";

alter table "public"."classes" add constraint "classes_pkey" PRIMARY KEY using index "classes_pkey";

alter table "public"."forum_post_upvotes" add constraint "forum_post_upvotes_pkey" PRIMARY KEY using index "forum_post_upvotes_pkey";

alter table "public"."forum_posts" add constraint "forum_posts_pkey" PRIMARY KEY using index "forum_posts_pkey";

alter table "public"."forum_replies" add constraint "forum_replies_pkey" PRIMARY KEY using index "forum_replies_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."resources" add constraint "resources_pkey" PRIMARY KEY using index "resources_pkey";

alter table "public"."subtopics" add constraint "subtopics_pkey" PRIMARY KEY using index "subtopics_pkey";

alter table "public"."topics" add constraint "topics_pkey" PRIMARY KEY using index "topics_pkey";

alter table "public"."user_video_progress" add constraint "user_video_progress_pkey" PRIMARY KEY using index "user_video_progress_pkey";

alter table "public"."videos" add constraint "videos_pkey" PRIMARY KEY using index "videos_pkey";

alter table "public"."announcements" add constraint "announcements_author_id_fkey" FOREIGN KEY (author_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."announcements" validate constraint "announcements_author_id_fkey";

alter table "public"."announcements" add constraint "announcements_class_id_fkey" FOREIGN KEY (class_id) REFERENCES public.classes(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."announcements" validate constraint "announcements_class_id_fkey";

alter table "public"."announcements" add constraint "chk_announcements_image_url_format" CHECK (((image_url IS NULL) OR ((image_url)::text ~* '^https://'::text))) not valid;

alter table "public"."announcements" validate constraint "chk_announcements_image_url_format";

alter table "public"."announcements" add constraint "chk_announcements_link_url_format" CHECK (((link_url IS NULL) OR ((link_url)::text ~* '^https://'::text))) not valid;

alter table "public"."announcements" validate constraint "chk_announcements_link_url_format";

alter table "public"."class_enrollments" add constraint "class_enrollments_class_id_fkey" FOREIGN KEY (class_id) REFERENCES public.classes(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."class_enrollments" validate constraint "class_enrollments_class_id_fkey";

alter table "public"."class_enrollments" add constraint "class_enrollments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."class_enrollments" validate constraint "class_enrollments_user_id_fkey";

alter table "public"."classes" add constraint "classes_code_key" UNIQUE using index "classes_code_key";

alter table "public"."classes" add constraint "classes_educator_id_fkey" FOREIGN KEY (educator_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."classes" validate constraint "classes_educator_id_fkey";

alter table "public"."forum_post_upvotes" add constraint "forum_post_upvotes_post_id_fkey" FOREIGN KEY (post_id) REFERENCES public.forum_posts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."forum_post_upvotes" validate constraint "forum_post_upvotes_post_id_fkey";

alter table "public"."forum_post_upvotes" add constraint "forum_post_upvotes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."forum_post_upvotes" validate constraint "forum_post_upvotes_user_id_fkey";

alter table "public"."forum_posts" add constraint "chk_forum_post_video_context" CHECK ((((type = 'general'::public.forum_post_type) AND (video_id IS NULL)) OR ((type = 'video_qa'::public.forum_post_type) AND (video_id IS NOT NULL)))) not valid;

alter table "public"."forum_posts" validate constraint "chk_forum_post_video_context";

alter table "public"."forum_posts" add constraint "forum_posts_author_id_fkey" FOREIGN KEY (author_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."forum_posts" validate constraint "forum_posts_author_id_fkey";

alter table "public"."forum_posts" add constraint "forum_posts_class_id_fkey" FOREIGN KEY (class_id) REFERENCES public.classes(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."forum_posts" validate constraint "forum_posts_class_id_fkey";

alter table "public"."forum_posts" add constraint "forum_posts_upvotes_check" CHECK ((upvotes >= 0)) not valid;

alter table "public"."forum_posts" validate constraint "forum_posts_upvotes_check";

alter table "public"."forum_posts" add constraint "forum_posts_video_id_fkey" FOREIGN KEY (video_id) REFERENCES public.videos(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."forum_posts" validate constraint "forum_posts_video_id_fkey";

alter table "public"."forum_replies" add constraint "forum_replies_author_id_fkey" FOREIGN KEY (author_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."forum_replies" validate constraint "forum_replies_author_id_fkey";

alter table "public"."forum_replies" add constraint "forum_replies_parent_reply_id_fkey" FOREIGN KEY (parent_reply_id) REFERENCES public.forum_replies(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."forum_replies" validate constraint "forum_replies_parent_reply_id_fkey";

alter table "public"."forum_replies" add constraint "forum_replies_post_id_fkey" FOREIGN KEY (post_id) REFERENCES public.forum_posts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."forum_replies" validate constraint "forum_replies_post_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."resources" add constraint "chk_resource_parent_exclusivity" CHECK ((((topic_id IS NOT NULL) AND (subtopic_id IS NULL)) OR ((topic_id IS NULL) AND (subtopic_id IS NOT NULL)))) not valid;

alter table "public"."resources" validate constraint "chk_resource_parent_exclusivity";

alter table "public"."resources" add constraint "chk_resources_url_format" CHECK (((file_url)::text ~* '^https://'::text)) not valid;

alter table "public"."resources" validate constraint "chk_resources_url_format";

alter table "public"."resources" add constraint "resources_size_bytes_check" CHECK ((size_bytes >= 0)) not valid;

alter table "public"."resources" validate constraint "resources_size_bytes_check";

alter table "public"."resources" add constraint "resources_subtopic_id_fkey" FOREIGN KEY (subtopic_id) REFERENCES public.subtopics(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."resources" validate constraint "resources_subtopic_id_fkey";

alter table "public"."resources" add constraint "resources_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."resources" validate constraint "resources_topic_id_fkey";

alter table "public"."subtopics" add constraint "subtopics_order_index_check" CHECK ((order_index >= 0)) not valid;

alter table "public"."subtopics" validate constraint "subtopics_order_index_check";

alter table "public"."subtopics" add constraint "subtopics_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."subtopics" validate constraint "subtopics_topic_id_fkey";

alter table "public"."topics" add constraint "topics_class_id_fkey" FOREIGN KEY (class_id) REFERENCES public.classes(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."topics" validate constraint "topics_class_id_fkey";

alter table "public"."topics" add constraint "topics_order_index_check" CHECK ((order_index >= 0)) not valid;

alter table "public"."topics" validate constraint "topics_order_index_check";

alter table "public"."user_video_progress" add constraint "user_video_progress_last_position_check" CHECK ((last_position >= '00:00:00'::interval)) not valid;

alter table "public"."user_video_progress" validate constraint "user_video_progress_last_position_check";

alter table "public"."user_video_progress" add constraint "user_video_progress_total_watch_time_check" CHECK ((total_watch_time >= '00:00:00'::interval)) not valid;

alter table "public"."user_video_progress" validate constraint "user_video_progress_total_watch_time_check";

alter table "public"."user_video_progress" add constraint "user_video_progress_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_video_progress" validate constraint "user_video_progress_user_id_fkey";

alter table "public"."user_video_progress" add constraint "user_video_progress_video_id_fkey" FOREIGN KEY (video_id) REFERENCES public.videos(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_video_progress" validate constraint "user_video_progress_video_id_fkey";

alter table "public"."videos" add constraint "chk_videos_url_format" CHECK (((video_url IS NULL) OR ((video_url)::text ~* '^https://'::text))) not valid;

alter table "public"."videos" validate constraint "chk_videos_url_format";

alter table "public"."videos" add constraint "videos_order_index_check" CHECK ((order_index >= 0)) not valid;

alter table "public"."videos" validate constraint "videos_order_index_check";

alter table "public"."videos" add constraint "videos_subtopic_id_fkey" FOREIGN KEY (subtopic_id) REFERENCES public.subtopics(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."videos" validate constraint "videos_subtopic_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_user_class_ids()
 RETURNS SETOF uuid
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
    RETURN QUERY
        SELECT class_id FROM public.class_enrollments WHERE user_id = auth.uid()
        UNION
        SELECT id FROM public.classes WHERE educator_id = auth.uid();
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_role()
 RETURNS public.user_role
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_role public.user_role;
BEGIN
    SELECT role INTO v_role FROM public.profiles WHERE id = auth.uid();
    RETURN COALESCE(v_role, 'student'::public.user_role);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.is_class_educator(p_class_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.classes
        WHERE id = p_class_id AND educator_id = auth.uid()
    );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.maintain_forum_post_upvote_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.prevent_immutable_modifications()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
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
$function$
;

create or replace view "public"."profiles_public" as  SELECT id,
    first_name,
    last_name,
    display_name,
    role
   FROM public.profiles;


CREATE OR REPLACE FUNCTION public.protect_forum_post_ownership()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
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
$function$
;

CREATE OR REPLACE FUNCTION public.protect_forum_post_upvotes()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;

    IF NEW.upvotes IS DISTINCT FROM OLD.upvotes AND public.get_user_role() != 'admin' THEN
        RAISE EXCEPTION 'SECURITY VIOLATION: Direct manipulation of upvote counts is prohibited. Insert into forum_post_upvotes instead.';
    END IF;

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.protect_profile_role()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF public.get_user_role() != 'admin' THEN
        IF NEW.role IS DISTINCT FROM OLD.role THEN
            RAISE EXCEPTION 'SECURITY VIOLATION: Only admins can modify user roles.';
        END IF;
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.protect_subtopic_class_lineage()
 RETURNS trigger
 LANGUAGE plpgsql
 STABLE
AS $function$
DECLARE
    v_old_class_id UUID;
    v_new_class_id UUID;
BEGIN
    IF NEW.topic_id IS NOT DISTINCT FROM OLD.topic_id THEN
        RETURN NEW;
    END IF;

    SELECT class_id INTO v_old_class_id FROM public.topics WHERE id = OLD.topic_id;
    SELECT class_id INTO v_new_class_id FROM public.topics WHERE id = NEW.topic_id;

    IF v_old_class_id IS DISTINCT FROM v_new_class_id
       AND EXISTS (
           SELECT 1
           FROM public.forum_posts fp
           JOIN public.videos v ON v.id = fp.video_id
           WHERE v.subtopic_id = NEW.id
       ) THEN
        RAISE EXCEPTION 'CONSTRAINT VIOLATION: Cannot reparent subtopic % to a topic in a different class while forum_posts reference videos within it. Move or delete the dependent video_qa posts first.', NEW.id;
    END IF;

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.protect_topic_class_lineage()
 RETURNS trigger
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
    IF NEW.class_id IS NOT DISTINCT FROM OLD.class_id THEN
        RETURN NEW;
    END IF;

    IF EXISTS (
        SELECT 1
        FROM public.forum_posts fp
        JOIN public.videos v ON v.id = fp.video_id
        JOIN public.subtopics s ON s.id = v.subtopic_id
        WHERE s.topic_id = NEW.id
    ) THEN
        RAISE EXCEPTION 'CONSTRAINT VIOLATION: Cannot move topic % to a different class while forum_posts reference videos within its subtree. Move or delete the dependent video_qa posts first.', NEW.id;
    END IF;

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.protect_video_class_lineage()
 RETURNS trigger
 LANGUAGE plpgsql
 STABLE
AS $function$
DECLARE
    v_old_class_id UUID;
    v_new_class_id UUID;
BEGIN
    IF NEW.subtopic_id IS NOT DISTINCT FROM OLD.subtopic_id THEN
        RETURN NEW;
    END IF;

    SELECT t.class_id INTO v_old_class_id
    FROM public.subtopics s JOIN public.topics t ON t.id = s.topic_id
    WHERE s.id = OLD.subtopic_id;

    SELECT t.class_id INTO v_new_class_id
    FROM public.subtopics s JOIN public.topics t ON t.id = s.topic_id
    WHERE s.id = NEW.subtopic_id;

    IF v_old_class_id IS DISTINCT FROM v_new_class_id
       AND EXISTS (SELECT 1 FROM public.forum_posts WHERE video_id = NEW.id) THEN
        RAISE EXCEPTION 'CONSTRAINT VIOLATION: Cannot reparent video % to a subtopic in a different class while forum_posts reference it. Move or delete the dependent video_qa posts first.', NEW.id;
    END IF;

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_forum_post_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF pg_trigger_depth() > 1 THEN
        RETURN NEW;
    END IF;
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.validate_forum_post_video_class()
 RETURNS trigger
 LANGUAGE plpgsql
 STABLE
AS $function$
DECLARE
    v_video_class_id UUID;
BEGIN
    IF NEW.video_id IS NULL THEN
        RETURN NEW;
    END IF;

    IF TG_OP = 'UPDATE' THEN
        IF NEW.video_id IS NOT DISTINCT FROM OLD.video_id
           AND NEW.class_id IS NOT DISTINCT FROM OLD.class_id THEN
            RETURN NEW;
        END IF;
    END IF;

    SELECT t.class_id INTO v_video_class_id
    FROM public.videos v
    JOIN public.subtopics s ON s.id = v.subtopic_id
    JOIN public.topics t ON t.id = s.topic_id
    WHERE v.id = NEW.video_id;

    IF v_video_class_id IS DISTINCT FROM NEW.class_id THEN
        RAISE EXCEPTION 'CONSTRAINT VIOLATION: forum_posts.video_id must reference a video belonging to the same class as the post (post class %, video class %).', NEW.class_id, v_video_class_id;
    END IF;

    RETURN NEW;
END;
$function$
;

grant delete on table "public"."announcements" to "anon";

grant insert on table "public"."announcements" to "anon";

grant references on table "public"."announcements" to "anon";

grant select on table "public"."announcements" to "anon";

grant trigger on table "public"."announcements" to "anon";

grant truncate on table "public"."announcements" to "anon";

grant update on table "public"."announcements" to "anon";

grant delete on table "public"."announcements" to "authenticated";

grant insert on table "public"."announcements" to "authenticated";

grant references on table "public"."announcements" to "authenticated";

grant select on table "public"."announcements" to "authenticated";

grant trigger on table "public"."announcements" to "authenticated";

grant truncate on table "public"."announcements" to "authenticated";

grant update on table "public"."announcements" to "authenticated";

grant delete on table "public"."announcements" to "service_role";

grant insert on table "public"."announcements" to "service_role";

grant references on table "public"."announcements" to "service_role";

grant select on table "public"."announcements" to "service_role";

grant trigger on table "public"."announcements" to "service_role";

grant truncate on table "public"."announcements" to "service_role";

grant update on table "public"."announcements" to "service_role";

grant delete on table "public"."class_enrollments" to "anon";

grant insert on table "public"."class_enrollments" to "anon";

grant references on table "public"."class_enrollments" to "anon";

grant select on table "public"."class_enrollments" to "anon";

grant trigger on table "public"."class_enrollments" to "anon";

grant truncate on table "public"."class_enrollments" to "anon";

grant update on table "public"."class_enrollments" to "anon";

grant delete on table "public"."class_enrollments" to "authenticated";

grant insert on table "public"."class_enrollments" to "authenticated";

grant references on table "public"."class_enrollments" to "authenticated";

grant select on table "public"."class_enrollments" to "authenticated";

grant trigger on table "public"."class_enrollments" to "authenticated";

grant truncate on table "public"."class_enrollments" to "authenticated";

grant update on table "public"."class_enrollments" to "authenticated";

grant delete on table "public"."class_enrollments" to "service_role";

grant insert on table "public"."class_enrollments" to "service_role";

grant references on table "public"."class_enrollments" to "service_role";

grant select on table "public"."class_enrollments" to "service_role";

grant trigger on table "public"."class_enrollments" to "service_role";

grant truncate on table "public"."class_enrollments" to "service_role";

grant update on table "public"."class_enrollments" to "service_role";

grant delete on table "public"."classes" to "anon";

grant insert on table "public"."classes" to "anon";

grant references on table "public"."classes" to "anon";

grant select on table "public"."classes" to "anon";

grant trigger on table "public"."classes" to "anon";

grant truncate on table "public"."classes" to "anon";

grant update on table "public"."classes" to "anon";

grant delete on table "public"."classes" to "authenticated";

grant insert on table "public"."classes" to "authenticated";

grant references on table "public"."classes" to "authenticated";

grant select on table "public"."classes" to "authenticated";

grant trigger on table "public"."classes" to "authenticated";

grant truncate on table "public"."classes" to "authenticated";

grant update on table "public"."classes" to "authenticated";

grant delete on table "public"."classes" to "service_role";

grant insert on table "public"."classes" to "service_role";

grant references on table "public"."classes" to "service_role";

grant select on table "public"."classes" to "service_role";

grant trigger on table "public"."classes" to "service_role";

grant truncate on table "public"."classes" to "service_role";

grant update on table "public"."classes" to "service_role";

grant delete on table "public"."forum_post_upvotes" to "anon";

grant insert on table "public"."forum_post_upvotes" to "anon";

grant references on table "public"."forum_post_upvotes" to "anon";

grant select on table "public"."forum_post_upvotes" to "anon";

grant trigger on table "public"."forum_post_upvotes" to "anon";

grant truncate on table "public"."forum_post_upvotes" to "anon";

grant update on table "public"."forum_post_upvotes" to "anon";

grant delete on table "public"."forum_post_upvotes" to "authenticated";

grant insert on table "public"."forum_post_upvotes" to "authenticated";

grant references on table "public"."forum_post_upvotes" to "authenticated";

grant select on table "public"."forum_post_upvotes" to "authenticated";

grant trigger on table "public"."forum_post_upvotes" to "authenticated";

grant truncate on table "public"."forum_post_upvotes" to "authenticated";

grant update on table "public"."forum_post_upvotes" to "authenticated";

grant delete on table "public"."forum_post_upvotes" to "service_role";

grant insert on table "public"."forum_post_upvotes" to "service_role";

grant references on table "public"."forum_post_upvotes" to "service_role";

grant select on table "public"."forum_post_upvotes" to "service_role";

grant trigger on table "public"."forum_post_upvotes" to "service_role";

grant truncate on table "public"."forum_post_upvotes" to "service_role";

grant update on table "public"."forum_post_upvotes" to "service_role";

grant delete on table "public"."forum_posts" to "anon";

grant insert on table "public"."forum_posts" to "anon";

grant references on table "public"."forum_posts" to "anon";

grant select on table "public"."forum_posts" to "anon";

grant trigger on table "public"."forum_posts" to "anon";

grant truncate on table "public"."forum_posts" to "anon";

grant update on table "public"."forum_posts" to "anon";

grant delete on table "public"."forum_posts" to "authenticated";

grant insert on table "public"."forum_posts" to "authenticated";

grant references on table "public"."forum_posts" to "authenticated";

grant select on table "public"."forum_posts" to "authenticated";

grant trigger on table "public"."forum_posts" to "authenticated";

grant truncate on table "public"."forum_posts" to "authenticated";

grant update on table "public"."forum_posts" to "authenticated";

grant delete on table "public"."forum_posts" to "service_role";

grant insert on table "public"."forum_posts" to "service_role";

grant references on table "public"."forum_posts" to "service_role";

grant select on table "public"."forum_posts" to "service_role";

grant trigger on table "public"."forum_posts" to "service_role";

grant truncate on table "public"."forum_posts" to "service_role";

grant update on table "public"."forum_posts" to "service_role";

grant delete on table "public"."forum_replies" to "anon";

grant insert on table "public"."forum_replies" to "anon";

grant references on table "public"."forum_replies" to "anon";

grant select on table "public"."forum_replies" to "anon";

grant trigger on table "public"."forum_replies" to "anon";

grant truncate on table "public"."forum_replies" to "anon";

grant update on table "public"."forum_replies" to "anon";

grant delete on table "public"."forum_replies" to "authenticated";

grant insert on table "public"."forum_replies" to "authenticated";

grant references on table "public"."forum_replies" to "authenticated";

grant select on table "public"."forum_replies" to "authenticated";

grant trigger on table "public"."forum_replies" to "authenticated";

grant truncate on table "public"."forum_replies" to "authenticated";

grant update on table "public"."forum_replies" to "authenticated";

grant delete on table "public"."forum_replies" to "service_role";

grant insert on table "public"."forum_replies" to "service_role";

grant references on table "public"."forum_replies" to "service_role";

grant select on table "public"."forum_replies" to "service_role";

grant trigger on table "public"."forum_replies" to "service_role";

grant truncate on table "public"."forum_replies" to "service_role";

grant update on table "public"."forum_replies" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."resources" to "anon";

grant insert on table "public"."resources" to "anon";

grant references on table "public"."resources" to "anon";

grant select on table "public"."resources" to "anon";

grant trigger on table "public"."resources" to "anon";

grant truncate on table "public"."resources" to "anon";

grant update on table "public"."resources" to "anon";

grant delete on table "public"."resources" to "authenticated";

grant insert on table "public"."resources" to "authenticated";

grant references on table "public"."resources" to "authenticated";

grant select on table "public"."resources" to "authenticated";

grant trigger on table "public"."resources" to "authenticated";

grant truncate on table "public"."resources" to "authenticated";

grant update on table "public"."resources" to "authenticated";

grant delete on table "public"."resources" to "service_role";

grant insert on table "public"."resources" to "service_role";

grant references on table "public"."resources" to "service_role";

grant select on table "public"."resources" to "service_role";

grant trigger on table "public"."resources" to "service_role";

grant truncate on table "public"."resources" to "service_role";

grant update on table "public"."resources" to "service_role";

grant delete on table "public"."subtopics" to "anon";

grant insert on table "public"."subtopics" to "anon";

grant references on table "public"."subtopics" to "anon";

grant select on table "public"."subtopics" to "anon";

grant trigger on table "public"."subtopics" to "anon";

grant truncate on table "public"."subtopics" to "anon";

grant update on table "public"."subtopics" to "anon";

grant delete on table "public"."subtopics" to "authenticated";

grant insert on table "public"."subtopics" to "authenticated";

grant references on table "public"."subtopics" to "authenticated";

grant select on table "public"."subtopics" to "authenticated";

grant trigger on table "public"."subtopics" to "authenticated";

grant truncate on table "public"."subtopics" to "authenticated";

grant update on table "public"."subtopics" to "authenticated";

grant delete on table "public"."subtopics" to "service_role";

grant insert on table "public"."subtopics" to "service_role";

grant references on table "public"."subtopics" to "service_role";

grant select on table "public"."subtopics" to "service_role";

grant trigger on table "public"."subtopics" to "service_role";

grant truncate on table "public"."subtopics" to "service_role";

grant update on table "public"."subtopics" to "service_role";

grant delete on table "public"."topics" to "anon";

grant insert on table "public"."topics" to "anon";

grant references on table "public"."topics" to "anon";

grant select on table "public"."topics" to "anon";

grant trigger on table "public"."topics" to "anon";

grant truncate on table "public"."topics" to "anon";

grant update on table "public"."topics" to "anon";

grant delete on table "public"."topics" to "authenticated";

grant insert on table "public"."topics" to "authenticated";

grant references on table "public"."topics" to "authenticated";

grant select on table "public"."topics" to "authenticated";

grant trigger on table "public"."topics" to "authenticated";

grant truncate on table "public"."topics" to "authenticated";

grant update on table "public"."topics" to "authenticated";

grant delete on table "public"."topics" to "service_role";

grant insert on table "public"."topics" to "service_role";

grant references on table "public"."topics" to "service_role";

grant select on table "public"."topics" to "service_role";

grant trigger on table "public"."topics" to "service_role";

grant truncate on table "public"."topics" to "service_role";

grant update on table "public"."topics" to "service_role";

grant delete on table "public"."user_video_progress" to "anon";

grant insert on table "public"."user_video_progress" to "anon";

grant references on table "public"."user_video_progress" to "anon";

grant select on table "public"."user_video_progress" to "anon";

grant trigger on table "public"."user_video_progress" to "anon";

grant truncate on table "public"."user_video_progress" to "anon";

grant update on table "public"."user_video_progress" to "anon";

grant delete on table "public"."user_video_progress" to "authenticated";

grant insert on table "public"."user_video_progress" to "authenticated";

grant references on table "public"."user_video_progress" to "authenticated";

grant select on table "public"."user_video_progress" to "authenticated";

grant trigger on table "public"."user_video_progress" to "authenticated";

grant truncate on table "public"."user_video_progress" to "authenticated";

grant update on table "public"."user_video_progress" to "authenticated";

grant delete on table "public"."user_video_progress" to "service_role";

grant insert on table "public"."user_video_progress" to "service_role";

grant references on table "public"."user_video_progress" to "service_role";

grant select on table "public"."user_video_progress" to "service_role";

grant trigger on table "public"."user_video_progress" to "service_role";

grant truncate on table "public"."user_video_progress" to "service_role";

grant update on table "public"."user_video_progress" to "service_role";

grant delete on table "public"."videos" to "anon";

grant insert on table "public"."videos" to "anon";

grant references on table "public"."videos" to "anon";

grant select on table "public"."videos" to "anon";

grant trigger on table "public"."videos" to "anon";

grant truncate on table "public"."videos" to "anon";

grant update on table "public"."videos" to "anon";

grant delete on table "public"."videos" to "authenticated";

grant insert on table "public"."videos" to "authenticated";

grant references on table "public"."videos" to "authenticated";

grant select on table "public"."videos" to "authenticated";

grant trigger on table "public"."videos" to "authenticated";

grant truncate on table "public"."videos" to "authenticated";

grant update on table "public"."videos" to "authenticated";

grant delete on table "public"."videos" to "service_role";

grant insert on table "public"."videos" to "service_role";

grant references on table "public"."videos" to "service_role";

grant select on table "public"."videos" to "service_role";

grant trigger on table "public"."videos" to "service_role";

grant truncate on table "public"."videos" to "service_role";

grant update on table "public"."videos" to "service_role";


  create policy "Announcements_Delete_Author"
  on "public"."announcements"
  as permissive
  for delete
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (author_id = auth.uid())));



  create policy "Announcements_Insert_Author"
  on "public"."announcements"
  as permissive
  for insert
  to public
with check (((public.get_user_role() = 'admin'::public.user_role) OR ((author_id = auth.uid()) AND (EXISTS ( SELECT 1
   FROM public.classes
  WHERE ((classes.id = announcements.class_id) AND (classes.educator_id = auth.uid())))))));



  create policy "Announcements_Select_Authorized"
  on "public"."announcements"
  as permissive
  for select
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (class_id IN ( SELECT public.get_user_class_ids() AS get_user_class_ids))));



  create policy "Announcements_Update_Author"
  on "public"."announcements"
  as permissive
  for update
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (author_id = auth.uid())));



  create policy "Enrollments_Delete_Authorized"
  on "public"."class_enrollments"
  as permissive
  for delete
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (user_id = auth.uid()) OR public.is_class_educator(class_id)));



  create policy "Enrollments_Insert_EducatorOrAdmin"
  on "public"."class_enrollments"
  as permissive
  for insert
  to public
with check (((public.get_user_role() = 'admin'::public.user_role) OR public.is_class_educator(class_id)));



  create policy "Enrollments_Select_Authorized"
  on "public"."class_enrollments"
  as permissive
  for select
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (user_id = auth.uid()) OR public.is_class_educator(class_id)));



  create policy "Classes_Delete_Admin"
  on "public"."classes"
  as permissive
  for delete
  to public
using ((public.get_user_role() = 'admin'::public.user_role));



  create policy "Classes_Insert_Admin"
  on "public"."classes"
  as permissive
  for insert
  to public
with check ((public.get_user_role() = 'admin'::public.user_role));



  create policy "Classes_Select_Authorized"
  on "public"."classes"
  as permissive
  for select
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (id IN ( SELECT public.get_user_class_ids() AS get_user_class_ids))));



  create policy "Classes_Update_EducatorOrAdmin"
  on "public"."classes"
  as permissive
  for update
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (educator_id = auth.uid())));



  create policy "ForumPostUpvotes_Delete_Self"
  on "public"."forum_post_upvotes"
  as permissive
  for delete
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (user_id = auth.uid())));



  create policy "ForumPostUpvotes_Insert_Self"
  on "public"."forum_post_upvotes"
  as permissive
  for insert
  to public
with check (((user_id = auth.uid()) AND (EXISTS ( SELECT 1
   FROM public.forum_posts fp
  WHERE ((fp.id = forum_post_upvotes.post_id) AND (fp.class_id IN ( SELECT public.get_user_class_ids() AS get_user_class_ids)))))));



  create policy "ForumPostUpvotes_Select_Authorized"
  on "public"."forum_post_upvotes"
  as permissive
  for select
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (EXISTS ( SELECT 1
   FROM public.forum_posts fp
  WHERE ((fp.id = forum_post_upvotes.post_id) AND (fp.class_id IN ( SELECT public.get_user_class_ids() AS get_user_class_ids)))))));



  create policy "ForumPosts_Delete_Authorized"
  on "public"."forum_posts"
  as permissive
  for delete
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (author_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM public.classes
  WHERE ((classes.id = forum_posts.class_id) AND (classes.educator_id = auth.uid()))))));



  create policy "ForumPosts_Insert_Authorized"
  on "public"."forum_posts"
  as permissive
  for insert
  to public
with check (((author_id = auth.uid()) AND ((public.get_user_role() = 'admin'::public.user_role) OR (class_id IN ( SELECT public.get_user_class_ids() AS get_user_class_ids)))));



  create policy "ForumPosts_Select_Authorized"
  on "public"."forum_posts"
  as permissive
  for select
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (class_id IN ( SELECT public.get_user_class_ids() AS get_user_class_ids))));



  create policy "ForumPosts_Update_Authorized"
  on "public"."forum_posts"
  as permissive
  for update
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (author_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM public.classes
  WHERE ((classes.id = forum_posts.class_id) AND (classes.educator_id = auth.uid()))))));



  create policy "ForumReplies_Delete_Authorized"
  on "public"."forum_replies"
  as permissive
  for delete
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (author_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM (public.forum_posts fp
     JOIN public.classes c ON ((c.id = fp.class_id)))
  WHERE ((fp.id = forum_replies.post_id) AND (c.educator_id = auth.uid()))))));



  create policy "ForumReplies_Insert_Authorized"
  on "public"."forum_replies"
  as permissive
  for insert
  to public
with check (((author_id = auth.uid()) AND ((public.get_user_role() = 'admin'::public.user_role) OR (EXISTS ( SELECT 1
   FROM public.forum_posts fp
  WHERE ((fp.id = forum_replies.post_id) AND (fp.class_id IN ( SELECT public.get_user_class_ids() AS get_user_class_ids))))))));



  create policy "ForumReplies_Select_Authorized"
  on "public"."forum_replies"
  as permissive
  for select
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (EXISTS ( SELECT 1
   FROM public.forum_posts fp
  WHERE ((fp.id = forum_replies.post_id) AND (fp.class_id IN ( SELECT public.get_user_class_ids() AS get_user_class_ids)))))));



  create policy "ForumReplies_Update_Author"
  on "public"."forum_replies"
  as permissive
  for update
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (author_id = auth.uid())));



  create policy "Profiles_Select_SelfOrAdmin"
  on "public"."profiles"
  as permissive
  for select
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (auth.uid() = id)));



  create policy "Profiles_Update_SelfOrAdmin"
  on "public"."profiles"
  as permissive
  for update
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (auth.uid() = id)))
with check (((public.get_user_role() = 'admin'::public.user_role) OR (auth.uid() = id)));



  create policy "Resources_Modify_EducatorOrAdmin"
  on "public"."resources"
  as permissive
  for all
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (EXISTS ( SELECT 1
   FROM (public.topics t
     JOIN public.classes c ON ((c.id = t.class_id)))
  WHERE ((t.id = resources.topic_id) AND (c.educator_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM ((public.subtopics s
     JOIN public.topics t ON ((t.id = s.topic_id)))
     JOIN public.classes c ON ((c.id = t.class_id)))
  WHERE ((s.id = resources.subtopic_id) AND (c.educator_id = auth.uid()))))));



  create policy "Resources_Select_Authorized"
  on "public"."resources"
  as permissive
  for select
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (EXISTS ( SELECT 1
   FROM public.topics t
  WHERE ((t.id = resources.topic_id) AND (t.class_id IN ( SELECT public.get_user_class_ids() AS get_user_class_ids))))) OR (EXISTS ( SELECT 1
   FROM (public.subtopics s
     JOIN public.topics t ON ((t.id = s.topic_id)))
  WHERE ((s.id = resources.subtopic_id) AND (t.class_id IN ( SELECT public.get_user_class_ids() AS get_user_class_ids)))))));



  create policy "Subtopics_Modify_EducatorOrAdmin"
  on "public"."subtopics"
  as permissive
  for all
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (EXISTS ( SELECT 1
   FROM (public.topics t
     JOIN public.classes c ON ((c.id = t.class_id)))
  WHERE ((t.id = subtopics.topic_id) AND (c.educator_id = auth.uid()))))));



  create policy "Subtopics_Select_Authorized"
  on "public"."subtopics"
  as permissive
  for select
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (EXISTS ( SELECT 1
   FROM public.topics t
  WHERE ((t.id = subtopics.topic_id) AND (t.class_id IN ( SELECT public.get_user_class_ids() AS get_user_class_ids)))))));



  create policy "Topics_Modify_EducatorOrAdmin"
  on "public"."topics"
  as permissive
  for all
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (EXISTS ( SELECT 1
   FROM public.classes
  WHERE ((classes.id = topics.class_id) AND (classes.educator_id = auth.uid()))))));



  create policy "Topics_Select_Authorized"
  on "public"."topics"
  as permissive
  for select
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (class_id IN ( SELECT public.get_user_class_ids() AS get_user_class_ids))));



  create policy "Progress_Insert_Self"
  on "public"."user_video_progress"
  as permissive
  for insert
  to public
with check ((user_id = auth.uid()));



  create policy "Progress_Select_Authorized"
  on "public"."user_video_progress"
  as permissive
  for select
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (user_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM (((public.videos v
     JOIN public.subtopics s ON ((s.id = v.subtopic_id)))
     JOIN public.topics t ON ((t.id = s.topic_id)))
     JOIN public.classes c ON ((c.id = t.class_id)))
  WHERE ((v.id = user_video_progress.video_id) AND (c.educator_id = auth.uid()))))));



  create policy "Progress_Update_Self"
  on "public"."user_video_progress"
  as permissive
  for update
  to public
using ((user_id = auth.uid()));



  create policy "Videos_Modify_EducatorOrAdmin"
  on "public"."videos"
  as permissive
  for all
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (EXISTS ( SELECT 1
   FROM ((public.subtopics s
     JOIN public.topics t ON ((t.id = s.topic_id)))
     JOIN public.classes c ON ((c.id = t.class_id)))
  WHERE ((s.id = videos.subtopic_id) AND (c.educator_id = auth.uid()))))));



  create policy "Videos_Select_Authorized"
  on "public"."videos"
  as permissive
  for select
  to public
using (((public.get_user_role() = 'admin'::public.user_role) OR (EXISTS ( SELECT 1
   FROM (public.subtopics s
     JOIN public.topics t ON ((t.id = s.topic_id)))
  WHERE ((s.id = videos.subtopic_id) AND (t.class_id IN ( SELECT public.get_user_class_ids() AS get_user_class_ids)))))));


CREATE TRIGGER enforce_immutability_announcements BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.prevent_immutable_modifications();

CREATE TRIGGER set_announcements_updated_at BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TRIGGER enforce_immutability_classes BEFORE UPDATE ON public.classes FOR EACH ROW EXECUTE FUNCTION public.prevent_immutable_modifications();

CREATE TRIGGER set_classes_updated_at BEFORE UPDATE ON public.classes FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TRIGGER maintain_upvote_count_on_delete AFTER DELETE ON public.forum_post_upvotes FOR EACH ROW EXECUTE FUNCTION public.maintain_forum_post_upvote_count();

CREATE TRIGGER maintain_upvote_count_on_insert AFTER INSERT ON public.forum_post_upvotes FOR EACH ROW EXECUTE FUNCTION public.maintain_forum_post_upvote_count();

CREATE TRIGGER enforce_forum_post_security BEFORE UPDATE ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION public.protect_forum_post_ownership();

CREATE TRIGGER enforce_forum_post_video_class BEFORE INSERT OR UPDATE ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION public.validate_forum_post_video_class();

CREATE TRIGGER enforce_immutability_forum_posts BEFORE UPDATE ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION public.prevent_immutable_modifications();

CREATE TRIGGER enforce_upvote_count_integrity BEFORE UPDATE ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION public.protect_forum_post_upvotes();

CREATE TRIGGER set_forum_posts_updated_at BEFORE UPDATE ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION public.set_forum_post_updated_at();

CREATE TRIGGER enforce_immutability_forum_replies BEFORE UPDATE ON public.forum_replies FOR EACH ROW EXECUTE FUNCTION public.prevent_immutable_modifications();

CREATE TRIGGER set_forum_replies_updated_at BEFORE UPDATE ON public.forum_replies FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TRIGGER enforce_immutability_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.prevent_immutable_modifications();

CREATE TRIGGER enforce_role_security BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.protect_profile_role();

CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TRIGGER enforce_immutability_resources BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.prevent_immutable_modifications();

CREATE TRIGGER set_resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TRIGGER enforce_immutability_subtopics BEFORE UPDATE ON public.subtopics FOR EACH ROW EXECUTE FUNCTION public.prevent_immutable_modifications();

CREATE TRIGGER enforce_subtopic_class_lineage BEFORE UPDATE ON public.subtopics FOR EACH ROW EXECUTE FUNCTION public.protect_subtopic_class_lineage();

CREATE TRIGGER set_subtopics_updated_at BEFORE UPDATE ON public.subtopics FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TRIGGER enforce_immutability_topics BEFORE UPDATE ON public.topics FOR EACH ROW EXECUTE FUNCTION public.prevent_immutable_modifications();

CREATE TRIGGER enforce_topic_class_lineage BEFORE UPDATE ON public.topics FOR EACH ROW EXECUTE FUNCTION public.protect_topic_class_lineage();

CREATE TRIGGER set_topics_updated_at BEFORE UPDATE ON public.topics FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TRIGGER set_user_video_progress_updated_at BEFORE UPDATE ON public.user_video_progress FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TRIGGER enforce_immutability_videos BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.prevent_immutable_modifications();

CREATE TRIGGER enforce_video_class_lineage BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.protect_video_class_lineage();

CREATE TRIGGER set_videos_updated_at BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


