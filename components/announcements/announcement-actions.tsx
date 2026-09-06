"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Pin, PinOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConfirmDeleteButton } from "@/components/shared/buttons/confirm-delete-button";
import { IconActionButton } from "@/components/shared/buttons/icon-action-button";
import { deleteAnnouncementAction, setAnnouncementPinnedAction } from "@/app/actions/announcements";

interface AnnouncementActionsProps {
  classId: string;
  announcementId: string;
  /** Current sticky state — drives the Pin ↔ Unpin toggle. */
  pinned: boolean;
  size?: "sm" | "xs";
}

type BusyKey = "pin" | "delete";

export function AnnouncementActions({ classId, announcementId, pinned, size = "sm" }: AnnouncementActionsProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<BusyKey | null>(null);
  const [pending, startTransition] = useTransition();
  const iconSize = size === "xs" ? "icon-xs" : "icon-sm";

  /* Per-action busy key so only the clicked control spins. The key is cleared only on the error path:
     on success it stays set through router.refresh() (the transition's `pending` gates the spinner and
     drops once the refreshed tree commits), so the toggle never flashes its stale state mid-refresh. */
  const run = (key: BusyKey, fn: () => Promise<{ error?: string }>) => {
    setError(null);
    setBusy(key);
    startTransition(async () => {
      const res = await fn();
      if (res.error) {
        setError(res.error);
        setBusy(null);
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-1">
      <Button variant="ghost" size={size} className="text-muted-foreground" asChild>
        <Link href={`/class/${classId}/announce/${announcementId}/edit`}>
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </Link>
      </Button>
      <IconActionButton
        icon={pinned ? PinOff : Pin}
        label={pinned ? "Unpin" : "Pin to top"}
        active={pinned}
        size={iconSize}
        loading={pending && busy === "pin"}
        disabled={pending && busy !== "pin"}
        onClick={() => run("pin", () => setAnnouncementPinnedAction(classId, announcementId, !pinned))}
      />
      <ConfirmDeleteButton
        label="Delete announcement"
        size={iconSize}
        pending={pending && busy === "delete"}
        onConfirm={() => run("delete", () => deleteAnnouncementAction(classId, announcementId))}
      />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}
