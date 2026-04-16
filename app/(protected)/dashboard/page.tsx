import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { StatCards } from "@/components/dashboard/stat-cards";
import { ContinueWatchingHero } from "@/components/dashboard/continue-watching-hero";
import { GlobalUpdatesFeed } from "@/components/dashboard/global-updates-feed";
import { EnrolledClassesList } from "@/components/dashboard/enrolled-classes-list";

const enrolledClasses = [
  {
    id: "pkg-11a2b3c4-d5e6-7f8a-9b0c-1234567890ab",
    code: "AA HL",
    title: "IBDP Math AA HL Mastery System",
    progress: 38,
    totalVideos: 32,
    watchedVideos: 12,
  },
  {
    id: "pkg-99x8y7z6-a1b2-c3d4-e5f6-1234567890ab",
    code: "PHYS HL",
    title: "IBDP Physics HL Mastery System",
    progress: 5,
    totalVideos: 40,
    watchedVideos: 2,
  }
];

export default async function DashboardHubPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Welcome back, {user.email?.split('@')[0] || "Student"}! 👋
        </h1>
        <p className="text-muted-foreground">
          Here is your overall progress and the latest updates from your tutors.
        </p>
      </div>

      <StatCards />
      <ContinueWatchingHero />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        <GlobalUpdatesFeed />
        <EnrolledClassesList classes={enrolledClasses} />
      </div>
    </div>
  );
}
