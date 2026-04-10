import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockClassId = "pkg-11a2b3c4-d5e6-7f8a-9b0c-1234567890ab";

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
  }
];

export default async function LessonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;

  const activeTopic = curriculum.find(topic => 
    topic.subtopics.some(sub => 
      sub.videos.some(video => video.id === lessonId)
    )
  );

  const topicTitle = activeTopic?.title || "Course Content";
  const totalSubtopics = activeTopic?.subtopics.length || 0;
  const totalVideos = activeTopic?.subtopics.reduce((acc, sub) => acc + sub.videos.length, 0) || 0;

  const activeSubtopic = activeTopic?.subtopics.find(sub => 
    sub.videos.some(v => v.id === lessonId)
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="h-16 border-b flex items-center justify-between px-4 md:px-8 shrink-0 bg-card">
        <div className="flex items-center gap-4">
          <Link href={`/courses/${mockClassId}`}>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden md:inline">Back to Curriculum</span>
            </Button>
          </Link>
          <div className="h-4 w-px bg-border hidden md:block"></div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary leading-none mb-1">
              {topicTitle}
            </span>
            <h1 className="text-sm font-bold truncate max-w-[200px] md:max-w-md">
              {activeSubtopic?.title || "Current Lesson"}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Badge variant="outline" className="hidden sm:flex border-primary/20 text-primary bg-primary/5">AA HL</Badge>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {children}

        <aside className="w-full lg:w-80 border-l bg-card/50 flex flex-col shrink-0 overflow-hidden">
          <div className="p-4 border-b bg-card">
            <h2 className="font-bold">{topicTitle}</h2>
            <p className="text-xs text-muted-foreground mt-1">
              {totalSubtopics} Subtopics • {totalVideos} Videos
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {activeTopic?.subtopics.map((subtopic) => (
              <div key={subtopic.id} className="border-b border-border/50 last:border-0 pb-2">
                <div className="bg-muted/30 px-4 py-2.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest sticky top-0 backdrop-blur-md z-10">
                  {subtopic.title}
                </div>

                <div className="flex flex-col">
                  {subtopic.videos.map((video) => {
                    const isActive = video.id === lessonId; 

                    return (
                      <Link 
                        key={video.id} 
                        href={`/lessons/${video.id}`}
                        className={`flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors ${isActive ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                      >
                        {video.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        ) : (
                          <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 ${isActive ? 'border-primary' : 'border-muted-foreground/30'}`} />
                        )}
                        <div className="flex flex-col gap-1">
                          <span className={`text-sm font-semibold leading-tight ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {video.title}
                          </span>
                          <span className="text-xs text-muted-foreground font-medium">
                            {video.duration}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
}
