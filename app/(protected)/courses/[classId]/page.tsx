import Link from "next/link";
import { 
  PlayCircle, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Play, 
  FolderTree, 
  ArrowLeft,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const currentClass = {
  id: "pkg-11a2b3c4-d5e6-7f8a-9b0c-1234567890ab",
  code: "AA HL",
  title: "IBDP Math AA HL Mastery System"
};

const classTutor = {
  name: "Winson Siu",
  initials: "WS",
  role: "Lead Instructor"
};

const classAnnouncements = [
  {
    id: "ann-math-1",
    title: "Topic 2 Practice Quiz Live",
    content: "I have just published a 15-question practice quiz for Functions. I highly recommend completing it before moving on to Calculus. Focus heavily on the composite function questions at the end, as those reflect the Section B style questions you will see on Paper 1.",
    date: "4 hours ago",
    type: "important",
    comments: 3,
    icon: Bell
  },
  {
    id: "ann-math-2",
    title: "Correction in Video 2.2",
    content: "At timestamp 14:20 in the Translations video, the x-axis shift should be to the LEFT, not the right. A note has been added to the video player, but please update your written notes if you copied that example down!",
    date: "2 days ago",
    type: "standard",
    comments: 0,
    icon: Megaphone
  },
  {
    id: "ann-math-3",
    title: "Calculus Bootcamp Next Week",
    content: "We will be running a live deep-dive into Integration by Parts next Thursday. Check your email for the Zoom link. I've attached the prerequisite worksheet below—please complete it beforehand so we can jump straight into the hard problems.",
    date: "5 days ago",
    type: "event",
    comments: 12,
    icon: CalendarDays
  }
];

const curriculum = [
  {
    id: "top-d290f1ee-6c54-4b01-90e6-d701748f0851",
    title: "Topic 1: Number & Algebra",
    totalDuration: "4h 15m",
    status: "completed",
    subtopics: [
      {
        id: "sub-1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        title: "1.1 Sequences and Series",
        videos: [
          { id: "les-c64a5d8b-1a2b-3c4d-5e6f-7a8b9c0d1e2f", title: "Arithmetic Sequences & Series", duration: "25m", completed: true },
          { id: "les-b31d9e7c-8f9a-0b1c-2d3e-4f5a6b7c8d9e", title: "Geometric Sequences & Series", duration: "30m", completed: true },
        ]
      },
      {
        id: "sub-f1e2d3c4-b5a6-9f8e-7d6c-5b4a3f2e1d0c",
        title: "1.2 Exponents and Logarithms",
        videos: [
          { id: "les-7a8b9c0d-1e2f-3a4b-5c6d-e7f8a9b0c1d2", title: "Laws of Exponents", duration: "20m", completed: true },
          { id: "les-3a4b5c6d-7e8f-9a0b-1c2d-e3f4a5b6c7d8", title: "Logarithmic Equations", duration: "35m", completed: true },
        ]
      }
    ]
  },
  {
    id: "top-8a2b5c71-3318-4221-8408-72481023023e",
    title: "Topic 2: Functions",
    totalDuration: "5h 30m",
    status: "active",
    subtopics: [
      {
        id: "sub-5c6d7e8f-9a0b-1c2d-3e4f-a5b6c7d8e9f0",
        title: "2.1 Linear & Quadratic Functions",
        videos: [
          { id: "les-9a0b1c2d-3e4f-5a6b-7c8d-e9f0a1b2c3d4", title: "Domain, Range & Composites", duration: "40m", completed: true },
          { id: "les-2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e", title: "Inverse Functions", duration: "35m", completed: true },
        ]
      },
      {
        id: "sub-8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e",
        title: "2.2 Transformations",
        videos: [
          { id: "les-9a8b7c6d-5e4f-3a2b-1c0d-e9f8a7b6c5d4", title: "Translations & Dilations", duration: "45m", completed: false }, 
          { id: "les-4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e", title: "Absolute Value Transformations", duration: "30m", completed: false },
        ]
      }
    ]
  },
  {
    id: "top-e9b7b9cc-8b45-4246-8805-4c0716c5b96b",
    title: "Topic 3: Geometry & Trigonometry",
    totalDuration: "6h 00m",
    status: "locked",
    subtopics: [
      {
        id: "sub-1c2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d5e6f",
        title: "3.1 3D Geometry",
        videos: [
          { id: "les-7c8d9e0f-1a2b-3c4d-5e6f-7a8b9c0d1e2f", title: "Volume & Surface Area", duration: "30m", completed: false },
          { id: "les-3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8a", title: "Angles in 3D Space", duration: "40m", completed: false },
        ]
      },
      {
        id: "sub-9e0f1a2b-3c4d-5e6f-7a8b-9c0d1e2f3a4b",
        title: "3.2 Trigonometric Functions",
        videos: [
          { id: "les-5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0c", title: "The Unit Circle", duration: "35m", completed: false },
        ]
      }
    ]
  },
  {
    id: "top-4a5b6c7d-8e9f-0a1b-2c3d-4e5f6a7b8c9d",
    title: "Topic 4: Statistics & Probability",
    totalDuration: "4h 45m",
    status: "locked",
    subtopics: [
      {
        id: "sub-0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
        title: "4.1 Descriptive Statistics",
        videos: [
          { id: "les-6b7c8d9e-0f1a-2b3c-4d5e-6f7a8b9c0d1e", title: "Mean, Variance & Standard Deviation", duration: "40m", completed: false },
        ]
      }
    ]
  },
  {
    id: "top-2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
    title: "Topic 5: Calculus",
    totalDuration: "8h 20m",
    status: "locked",
    subtopics: [
      {
        id: "sub-8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f",
        title: "5.1 Differentiation",
        videos: [
          { id: "les-2d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a", title: "Limits & First Principles", duration: "45m", completed: false },
          { id: "les-8e9f0a1b-2c3d-4e5f-6a7b-8c9d0e1f2a3b", title: "Chain, Product & Quotient Rules", duration: "50m", completed: false },
        ]
      }
    ]
  }
];

export default async function ClassCurriculumPage({ 
  params 
}: { 
  params: Promise<{ classId: string }> 
}) {
  const { classId } = await params;
  const overallProgress = 38;

  const allVideos = curriculum.flatMap(topic => 
    topic.subtopics.flatMap(sub => 
      sub.videos.map(video => ({
        ...video,
        topicTitle: topic.title,
        subtopicTitle: sub.title,
        topicStatus: topic.status
      }))
    )
  );
  
  const nextVideo = allVideos.find(v => !v.completed && v.topicStatus !== "locked");

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-8">
      <div>
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-6 gap-2 text-muted-foreground hover:text-foreground -ml-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{currentClass.title}</h1>
            </div>
            <p className="text-muted-foreground">
              Your centralized dashboard for curriculum, progress, and tutor updates.
            </p>
          </div>
          <div className="w-full md:w-72 bg-card p-4 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">Overall Progress</span>
              <span className="text-sm font-bold text-primary">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </div>
      </div>

      {nextVideo && (
        <Card className="w-full relative overflow-hidden border-2 border-primary/20 bg-card shadow-lg">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
              <div>
                <div className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Up Next</div>
                <h2 className="text-2xl font-bold mb-2">{nextVideo.title}</h2>
                <p className="text-muted-foreground">{nextVideo.subtopicTitle} • {nextVideo.duration}</p>
              </div>
            </div>
            <Link href={`/lessons/${nextVideo.id}`} className="w-full md:w-auto shrink-0">
              <Button size="lg" className="w-full rounded-full text-md h-12 px-8 shadow-md">
                Resume Lesson
              </Button>
            </Link>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        <div className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Class Updates</h2>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Filter</Button>
          </div>
          
          <div className="flex flex-col gap-6">
            {classAnnouncements.map((ann) => {
              const isImportant = ann.type === "important";

              return (
                <Card 
                  key={ann.id} 
                  className={`p-6 bg-card border shadow-sm transition-all hover:shadow-md ${isImportant ? 'border-primary/30 ring-1 ring-primary/10' : 'border-border'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {classTutor.initials}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-foreground">{classTutor.name}</div>
                        <div className="text-xs text-muted-foreground font-medium">{ann.date}</div>
                      </div>
                    </div>
                    {isImportant && <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 border-transparent pointer-events-none">Important</Badge>}
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

        <div className="xl:col-span-4 space-y-6 sticky top-24">
          <h2 className="text-2xl font-bold mb-2">Curriculum</h2>
          
          <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
            {curriculum.map((topic) => {
              const totalVideos = topic.subtopics.reduce((acc, sub) => acc + sub.videos.length, 0);

              return (
                <AccordionItem 
                  key={topic.id} 
                  value={topic.id} 
                  className="bg-card rounded-xl border border-border shadow-sm overflow-hidden relative"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 ${topic.status === 'active' ? 'bg-primary' : 'bg-muted'}`}></div>
                  
                  <AccordionTrigger className="p-5 md:p-6 bg-muted/10 hover:bg-muted/40 transition-colors border-b border-border hover:no-underline [&[data-state=open]]:bg-muted/40 text-left pt-6">
                    <div className="flex flex-col gap-3 w-full pr-2">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-base font-bold leading-tight">{topic.title}</h3>
                        <div className="shrink-0 mt-0.5">
                          {topic.status === "completed" && <CheckCircle2 className="w-4 h-4 text-primary" />}
                          {topic.status === "locked" && <Lock className="w-4 h-4 text-muted-foreground" />}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground font-medium">
                        <span className="flex items-center gap-1 shrink-0"><Clock className="w-3 h-3" /> {topic.totalDuration}</span>
                        <span className="flex items-center gap-1 shrink-0"><FolderTree className="w-3 h-3" /> {topic.subtopics.length}</span>
                        <span className="shrink-0">{totalVideos} Videos</span>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="p-0 border-none">
                    <div className="flex flex-col">
                      {topic.subtopics.map((subtopic) => (
                        <div key={subtopic.id} className="border-b border-border/50 last:border-0">
                          <div className="bg-muted/20 px-4 py-2.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50">
                            {subtopic.title}
                          </div>

                          <div className="flex flex-col">
                            {subtopic.videos.map((video) => (
                              <Link 
                                key={video.id} 
                                href={`/lessons/${video.id}`}
                                className={`flex flex-col gap-1.5 p-4 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0 ${topic.status === "locked" ? "opacity-60 pointer-events-none" : ""}`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="mt-0.5">
                                    {video.completed ? (
                                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                    ) : (
                                      <PlayCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                                    )}
                                  </div>
                                  <span className={`font-medium text-sm leading-tight ${video.completed ? "text-muted-foreground" : "text-foreground"}`}>
                                    {video.title}
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground font-medium ml-7">
                                  {video.duration}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>

                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

      </div>
    </div>
  );
}
