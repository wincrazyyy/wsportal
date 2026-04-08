import Link from "next/link";
import { PlayCircle, CheckCircle2, Lock, Clock, Play, FolderTree, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const currentClass = {
  id: "pkg-11a2b3c4-d5e6-7f8a-9b0c-1234567890ab",
  code: "AA HL",
  title: "IBDP Math AA HL Mastery System"
};

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
  
  // Later: fetch currentClass and curriculum based on classId

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
    <div className="flex-1 p-6 md:p-8 overflow-y-auto max-w-6xl mx-auto w-full">
      <Link href="/courses">
        <Button variant="ghost" size="sm" className="mb-6 gap-2 text-muted-foreground hover:text-foreground -ml-2">
          <ArrowLeft className="w-4 h-4" />
          Back to My Classes
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">Curriculum</h1>
            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 uppercase tracking-wider font-bold">
              Class: {currentClass.code}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {currentClass.title}
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

      {nextVideo && (
        <Card className="w-full relative overflow-hidden border-2 border-primary/20 bg-card shadow-lg mb-12">
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

      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Topics</h2>
        
        <div className="flex flex-col gap-6">
          {curriculum.map((topic) => {
            const totalVideos = topic.subtopics.reduce((acc, sub) => acc + sub.videos.length, 0);

            return (
              <div key={topic.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-5 md:p-6 bg-muted/30 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{topic.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {topic.totalDuration}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><FolderTree className="w-4 h-4" /> {topic.subtopics.length} Subtopics</span>
                      <span>•</span>
                      <span>{totalVideos} Videos</span>
                    </div>
                  </div>
                  <div>
                    {topic.status === "completed" && <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-transparent font-semibold">Completed</Badge>}
                    {topic.status === "active" && <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">In Progress</Badge>}
                    {topic.status === "locked" && <Badge variant="outline" className="text-muted-foreground font-semibold"><Lock className="w-3 h-3 mr-1" /> Locked</Badge>}
                  </div>
                </div>

                <div className="flex flex-col">
                  {topic.subtopics.map((subtopic) => (
                    <div key={subtopic.id} className="border-b border-border/50 last:border-0">
                      <div className="bg-muted/10 px-5 md:px-6 py-3 text-sm font-bold text-muted-foreground uppercase tracking-wide border-b border-border/50">
                        {subtopic.title}
                      </div>

                      <div className="flex flex-col">
                        {subtopic.videos.map((video) => (
                          <Link 
                            key={video.id} 
                            href={`/lessons/${video.id}`}
                            className={`flex items-center justify-between p-4 px-5 md:px-6 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0 ${topic.status === "locked" ? "opacity-60 pointer-events-none" : ""}`}
                          >
                            <div className="flex items-center gap-4">
                              {video.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                              ) : (
                                <PlayCircle className="w-5 h-5 text-muted-foreground shrink-0" />
                              )}
                              <span className={`font-medium ${video.completed ? "text-muted-foreground" : "text-foreground"}`}>
                                {video.title}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {video.duration}
                            </div>
                          </Link>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
