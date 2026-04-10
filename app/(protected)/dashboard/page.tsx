import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { 
  BookMarked, 
  ArrowRight, 
  PlayCircle, 
  Megaphone, 
  Bell, 
  CalendarDays,
  MessageCircle,
  Paperclip,
  BookOpen,
  Clock,
  Play
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    author: { name: "Winson Siu", initials: "WS" }
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
    author: { name: "Dr. Sarah Jenkins", initials: "SJ" }
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
    author: { name: "Winson Siu", initials: "WS" }
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

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-sm border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Videos Watched
            </CardTitle>
            <PlayCircle className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">14<span className="text-lg text-muted-foreground font-medium"> / 72</span></div>
            <p className="text-sm text-muted-foreground mt-1">Across all registered classes</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Past Papers Solved
            </CardTitle>
            <BookOpen className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">5</div>
            <p className="text-sm text-muted-foreground mt-1">Next up: 2018 Paper 1 (AA HL)</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Study Time (This Week)
            </CardTitle>
            <Clock className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">4.2 <span className="text-lg text-muted-foreground font-medium">hrs</span></div>
            <p className="text-sm text-emerald-500 font-medium mt-1">+1.2 hrs from last week</p>
          </CardContent>
        </Card>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
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
