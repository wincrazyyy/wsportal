/**
 * Size cap for a single notes (PDF) upload. Client-safe (no server-only import) so the upload dialog
 * pre-checks each file and the server action enforces the SAME number against R2's authoritative
 * HeadObject size — one constant, so the two can never drift. The bytes go browser → R2 direct via a
 * presigned PUT (single-PUT limit ~5 GB), so this is a product choice, not an infrastructure limit.
 */
export const NOTE_MAX_BYTES = 500 * 1024 * 1024;

/** Human label for the cap, used verbatim in the client + server rejection copy. */
export const NOTE_MAX_LABEL = "500 MB";
