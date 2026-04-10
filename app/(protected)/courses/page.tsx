import Link from "next/link";
import { 
  BookMarked, 
  ArrowRight, 
  PlayCircle, 
  Megaphone, 
  Bell, 
  CalendarDays,
  MessageCircle,
  Paperclip
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
    courseCode: "AA HL",
    title: "Mock Exam Solutions Uploaded",
    content: "I've just uploaded the video walkthroughs for the May 2023 TZ2 Past Paper in the Document Vault. Make sure to review Q9 and Q11, as the mark scheme is quite particular about the working out for those integration steps.",
    date: "2 hours ago",
    type: "important",
    comments: 8,
    icon: Bell,
    author: {
      name: "Winson Siu",
      initials: "WS"
    }
  },
  {
    id: "ann-2",
    courseCode: "PHYS HL",
    title: "Live Q&A Session Tomorrow",
    content: "We will be running a live Zoom session covering Kinematics tomorrow at 5 PM GMT. Link will be posted here 10 mins before. Bring your toughest questions!",
    date: "1 day ago",
    type: "event",
    comments: 24,
    icon: CalendarDays,
    author: {
      name: "Dr. Sarah Jenkins",
      initials: "SJ"
    }
  },
  {
    id: "ann-3",
    courseCode: "AA HL",
    title: "New Module 5 Videos",
    content: "Topic 5.1 (Differentiation Rules) is now fully unlocked for all AA HL students. Let me know if you have questions in the lesson discussions.",
    date: "3 days ago",
    type: "standard",
    comments: 2,
    icon: Megaphone,
    author: {
      name: "Winson Siu",
      initials: "WS"
    }
  }
];

export default function CoursesHubPage() {
  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-8">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Here is your curriculum and the latest global updates from your tutors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Global Updates</h2>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Filter</Button>
          </div>
          
          <div className="flex flex-col gap-6">
            {announcements.map((ann) => {
              const Icon = ann.icon;
              const isImportant = ann.type === "important";

              return (
                <Card 
                  key={ann.id} 
                  className={`p-6 bg-card border shadow-sm transition-all hover:shadow-md ${isImportant ? 'border-primary/30 ring-1 ring-primary/10' : 'border-border'}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {ann.author.initials}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-foreground flex items-center gap-2">
                          {ann.author.name}
                          <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            {ann.courseCode}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground font-medium mt-0.5">{ann.date}</div>
                      </div>
                    </div>
                    {isImportant && <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 border-transparent pointer-events-none shrink-0">Important</Badge>}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{ann.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {ann.content}
                  </p>

                  <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border/50 text-sm font-medium text-muted-foreground">
                    <button className="flex items-center gap-2 hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" /> 
                      {ann.comments > 0 ? `${ann.comments} Comments` : 'Discuss'}
                    </button>
                    {ann.type === "event" && (
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Paperclip className="w-4 h-4" /> 1 Attachment
                      </button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

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
                  <Link href={`/courses/${cls.id}`} className="w-full">
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
