import Link from "next/link";
import { 
  BookMarked, 
  ArrowRight, 
  PlayCircle, 
  Megaphone, 
  Bell, 
  CalendarDays 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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

const announcements = [
  {
    id: "ann-1",
    title: "Mock Exam Solutions Uploaded",
    content: "I've just uploaded the video walkthroughs for the May 2023 TZ2 Past Paper in the Document Vault. Make sure to review Q9 and Q11!",
    date: "2 hours ago",
    type: "important",
    icon: Bell
  },
  {
    id: "ann-2",
    title: "Live Q&A Session Tomorrow",
    content: "We will be running a live Zoom session covering Calculus Kinematics tomorrow at 5 PM GMT. Link will be posted here 10 mins before.",
    date: "1 day ago",
    type: "event",
    icon: CalendarDays
  },
  {
    id: "ann-3",
    title: "New Module 5 Videos",
    content: "Topic 5.1 (Differentiation Rules) is now fully unlocked for all AA HL students. Let me know if you have questions in the lesson discussions.",
    date: "3 days ago",
    type: "standard",
    icon: Megaphone
  }
];

export default function CoursesHubPage() {
  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Here is your curriculum and the latest updates from your tutor.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <h2 className="text-xl font-bold">My Classes</h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
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
                    <Button className="w-full gap-2 group border-border">
                      View Curriculum
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-80 xl:w-96 shrink-0 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Announcements</h2>
            <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold">
              {announcements.length} New
            </Badge>
          </div>
          
          <Card className="border border-border shadow-sm bg-card overflow-hidden">
            <div className="flex flex-col">
              {announcements.map((ann, idx) => {
                const Icon = ann.icon;
                const isImportant = ann.type === "important";

                return (
                  <div 
                    key={ann.id} 
                    className={`p-5 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors relative ${isImportant ? 'bg-primary/5' : ''}`}
                  >
                    {isImportant && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                    )}
                    
                    <div className="flex gap-4">
                      <div className={`mt-0.5 shrink-0 ${isImportant ? 'text-primary' : 'text-muted-foreground'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-col gap-0.5">
                          <h3 className={`font-semibold leading-tight ${isImportant ? 'text-primary' : 'text-foreground'}`}>
                            {ann.title}
                          </h3>
                          <span className="text-xs font-medium text-muted-foreground">
                            {ann.date}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                          {ann.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-3 bg-muted/30 border-t border-border">
              <Button variant="ghost" className="w-full text-sm font-medium text-muted-foreground hover:text-foreground">
                View All Announcements
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
