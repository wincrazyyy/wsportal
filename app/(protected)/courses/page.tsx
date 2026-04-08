import Link from "next/link";
import { PlayCircle, CheckCircle2, Lock, Clock, Play, FolderTree } from "lucide-react";
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
    id: "top-1",
    title: "Topic 1: Number & Algebra",
    totalDuration: "4h 15m",
    status: "completed",
    subtopics: [
      {
        id: "sub-1-1",
        title: "1.1 Sequences and Series",
        videos: [
          { id: "vid-1a", title: "Arithmetic Sequences & Series", duration: "25m", completed: true },
          { id: "vid-1b", title: "Geometric Sequences & Series", duration: "30m", completed: true },
        ]
      },
      {
        id: "sub-1-2",
        title: "1.2 Exponents and Logarithms",
        videos: [
          { id: "vid-1c", title: "Laws of Exponents", duration: "20m", completed: true },
          { id: "vid-1d", title: "Logarithmic Equations", duration: "35m", completed: true },
        ]
      }
    ]
  },
  {
    id: "top-2",
    title: "Topic 2: Functions",
    totalDuration: "5h 30m",
    status: "active",
    subtopics: [
      {
        id: "sub-2-1",
        title: "2.1 Linear & Quadratic Functions",
        videos: [
          { id: "vid-2a", title: "Domain, Range & Composites", duration: "40m", completed: true },
          { id: "vid-2b", title: "Inverse Functions", duration: "35m", completed: true },
        ]
      },
      {
        id: "sub-2-2",
        title: "2.2 Transformations",
        videos: [
          { id: "vid-2c", title: "Translations & Dilations", duration: "45m", completed: false }, // CURRENT VIDEO
          { id: "vid-2d", title: "Absolute Value Transformations", duration: "30m", completed: false },
        ]
      }
    ]
  },
  {
    id: "top-3",
    title: "Topic 3: Geometry & Trigonometry",
    totalDuration: "6h 00m",
    status: "locked",
    subtopics: [
      {
        id: "sub-3-1",
        title: "3.1 3D Geometry",
        videos: [
          { id: "vid-3a", title: "Volume & Surface Area", duration: "30m", completed: false },
          { id: "vid-3b", title: "Angles in 3D Space", duration: "40m", completed: false },
        ]
      },
      {
        id: "sub-3-2",
        title: "3.2 Trigonometric Functions",
        videos: [
          { id: "vid-3c", title: "The Unit Circle", duration: "35m", completed: false },
        ]
      }
    ]
  },
  {
    id: "top-4",
    title: "Topic 4: Statistics & Probability",
    totalDuration: "4h 45m",
    status: "locked",
    subtopics: [
      {
        id: "sub-4-1",
        title: "4.1 Descriptive Statistics",
        videos: [
          { id: "vid-4a", title: "Mean, Variance & Standard Deviation", duration: "40m", completed: false },
        ]
      }
    ]
  },
  {
    id: "top-5",
    title: "Topic 5: Calculus",
    totalDuration: "8h 20m",
    status: "locked",
    subtopics: [
      {
        id: "sub-5-1",
        title: "5.1 Differentiation",
        videos: [
          { id: "vid-5a", title: "Limits & First Principles", duration: "45m", completed: false },
          { id: "vid-5b", title: "Chain, Product & Quotient Rules", duration: "50m", completed: false },
        ]
      }
    ]
  }
];

export default function CoursesPage() {
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">Video Lectures</h1>
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
            <Link href={`/courses/${nextVideo.id}`} className="w-full md:w-auto shrink-0">
              <Button size="lg" className="w-full rounded-full text-md h-12 px-8 shadow-md">
                Resume Lesson
              </Button>
            </Link>
          </div>
        </Card>
      )}

      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Curriculum Topics</h2>
        
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
                            href={`/courses/${video.id}`}
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
