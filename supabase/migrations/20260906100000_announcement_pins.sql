/* ==========  ANNOUNCEMENT PINS  ==========
   announcements.is_pinned — an explicit educator/admin sticky flag (the forum_posts.is_pinned
   precedent). Pinned announcements float above the chronological list on the per-class
   surfaces; the flag is orthogonal to the type badge (standard, important, event).
   Authorization needs nothing new: only the class educator or an admin can author an
   announcement, and announcements_update_author is already author-or-admin, so the pin
   toggle is gated by the existing policy.
   The updated_at trigger is swapped for a column-aware variant so a pin flip alone never
   marks the announcement as edited.
   Hand-authored (db diff is blocked by the redeem_class_invite ROWTYPE forward-ref),
   mirroring supabase/schemas/01_functions.sql + 02_schema.sql — the source of truth. */

ALTER TABLE public.announcements ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT FALSE NOT NULL;
COMMENT ON COLUMN public.announcements.is_pinned IS 'Educator/admin sticky flag (the forum_posts.is_pinned precedent). Pinned announcements float above the chronological list on the per-class surfaces (the announcements page and the class feed); the cross-class dashboard feed and the class-manage latest-preview stay chronological. Orthogonal to type: an important notice may be unpinned and a plain standing note (a recurring meeting link) may be pinned. Toggled by setAnnouncementPinnedAction and gated by announcements_update_author (author or admin, and only the class educator or an admin can author), so no extra trigger is needed. A flip alone does NOT bump updated_at (set_announcement_updated_at).';

CREATE OR REPLACE FUNCTION internal.set_announcement_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    IF (to_jsonb(NEW) - 'is_pinned' - 'updated_at') = (to_jsonb(OLD) - 'is_pinned' - 'updated_at') THEN
        NEW.updated_at = OLD.updated_at;
        RETURN NEW;
    END IF;
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION internal.set_announcement_updated_at() IS 'Column-aware variant of set_current_timestamp_updated_at scoped to announcements. Compares the row with is_pinned and updated_at masked out: when nothing else changed (a pin or unpin, or a no-op update) the previous updated_at is preserved, so the card never shows an edited marker for a sticky flip; any content edit still arrives here and bumps updated_at as before. Also discards a caller-supplied updated_at on a pin-only update.';

DROP TRIGGER IF EXISTS set_announcements_updated_at ON public.announcements;
CREATE TRIGGER set_announcements_updated_at
    BEFORE UPDATE ON public.announcements
    FOR EACH ROW EXECUTE PROCEDURE internal.set_announcement_updated_at();
