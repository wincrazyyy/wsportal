import Link from "next/link";
import { BookMarked, ArrowRight, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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

export default function CoursesHubPage() {
  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto max-w-6xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Classes</h1>
        <p className="text-muted-foreground">
          Select a curriculum to continue learning.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {enrolledClasses.map((cls) => (
          <Card key={cls.id} className="flex flex-col overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow bg-card">
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <BookMarked className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold tracking-wider uppercase text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {cls.code}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2">{cls.title}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <PlayCircle className="w-4 h-4" />
                {cls.watchedVideos} of {cls.totalVideos} videos watched
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Overall Progress</span>
                  <span className="text-primary">{cls.progress}%</span>
                </div>
                <Progress value={cls.progress} className="h-2" />
              </div>
            </div>
            <div className="p-4 bg-muted/30 border-t border-border">
              <Link href={`/courses/${cls.id}`} className="w-full">
                <Button className="w-full gap-2 group">
                  View Curriculum
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
