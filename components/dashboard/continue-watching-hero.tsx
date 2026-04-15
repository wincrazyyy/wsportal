import Link from "next/link";
import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContinueWatchingHero() {
  return (
    <Card className="w-full relative overflow-hidden border-2 border-primary/20 bg-card shadow-md">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
      <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
            <Play className="w-6 h-6 text-primary ml-1" />
          </div>
          <div>
            <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Continue Watching</div>
            <h2 className="text-xl font-bold mb-1">Translations & Dilations</h2>
            <p className="text-sm text-muted-foreground">Topic 2.2 • IBDP Math AA HL • 15 mins remaining</p>
          </div>
        </div>
        <Link href="/lessons/les-9a8b7c6d-5e4f-3a2b-1c0d-e9f8a7b6c5d4" className="w-full md:w-auto shrink-0">
          <Button className="w-full rounded-full shadow-md">
            Resume Lesson
          </Button>
        </Link>
      </div>
    </Card>
  );
}
