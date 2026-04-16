import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PlayCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import { StatCards } from "@/components/dashboard/stat-cards";
import { ContinueWatchingHero } from "@/components/dashboard/continue-watching-hero";
import { GlobalUpdatesFeed } from "@/components/dashboard/global-updates-feed";

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

        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <h2 className="text-2xl font-bold mb-2">My Classes</h2>
          
          <div className="flex flex-col gap-5">
            {enrolledClasses.map((cls) => (
              <Card key={cls.id} className="flex flex-col overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow bg-card relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                
                <div className="p-5 flex-1 mt-2">
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <h3 className="text-lg font-bold leading-tight">{cls.title}</h3>
                    <Badge variant="secondary" className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground bg-muted shrink-0">
                      {cls.code}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-5">
                    <PlayCircle className="w-4 h-4" />
                    {cls.watchedVideos} / {cls.totalVideos} Videos Watched
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Progress</span>
                      <span className="text-primary">{cls.progress}%</span>
                    </div>
                    <Progress value={cls.progress} className="h-1.5" />
                  </div>
                </div>
                
                <div className="p-3 bg-muted/20 border-t border-border">
                  <Link href={`/classes/${cls.id}`} className="w-full">
                    <Button variant="ghost" className="w-full justify-between group hover:bg-primary/5 hover:text-primary text-sm font-semibold h-10">
                      View Curriculum
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
