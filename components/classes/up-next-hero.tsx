import Link from "next/link";
import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UpNextHeroProps {
  video: {
    id: string;
    title: string;
    subtopicTitle: string;
    duration: string;
  } | undefined;
}

export function UpNextHero({ video }: UpNextHeroProps) {
  if (!video) return null;

  return (
    <Card className="w-full relative overflow-hidden border-2 border-primary/20 bg-card shadow-lg">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Play className="w-8 h-8 text-primary ml-1" />
          </div>
          <div>
            <div className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Up Next</div>
            <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
            <p className="text-muted-foreground">{video.subtopicTitle} • {video.duration}</p>
          </div>
        </div>
        <Link href={`/lessons/${video.id}`} className="w-full md:w-auto shrink-0">
          <Button size="lg" className="w-full rounded-full text-md h-12 px-8 shadow-md">
            Resume Lesson
          </Button>
        </Link>
      </div>
    </Card>
  );
}
