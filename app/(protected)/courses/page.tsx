import Link from "next/link";
import { PlayCircle, CheckCircle2, Lock, Clock, Play } from "lucide-react";
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
    id: "mod-d290f1ee-6c54-4b01-90e6-d701748f0851",
    title: "Module 1: Algebra & Equations",
    totalDuration: "2h 15m",
    status: "completed",
    lessons: [
      { id: "les-c64a5d8b-1a2b-3c4d-5e6f-7a8b9c0d1e2f", title: "Sequences and Series", duration: "45m", completed: true },
      { id: "les-b31d9e7c-8f9a-0b1c-2d3e-4f5a6b7c8d9e", title: "Exponents and Logarithms", duration: "50m", completed: true },
      { id: "les-a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d", title: "Binomial Theorem", duration: "40m", completed: true },
    ],
  },
  {
    id: "mod-8a2b5c71-3318-4221-8408-72481023023e",
    title: "Module 2: Functions",
    totalDuration: "3h 45m",
    status: "active",
    lessons: [
      { id: "les-f1e2d3c4-b5a6-9f8e-7d6c-5b4a3f2e1d0c", title: "Domain, Range, and Composite Functions", duration: "55m", completed: true },
      { id: "les-9a8b7c6d-5e4f-3a2b-1c0d-e9f8a7b6c5d4", title: "Inverse Functions & Transformations", duration: "1h 10m", completed: false },
      { id: "les-1a2b3c4d-5e6f-7a8b-9c0d-e1f2a3b4c5d6", title: "Rational Functions", duration: "45m", completed: false },
      { id: "les-7a8b9c0d-1e2f-3a4b-5c6d-e7f8a9b0c1d2", title: "Exponential & Logarithmic Functions", duration: "55m", completed: false },
    ],
  },
  {
    id: "mod-e9b7b9cc-8b45-4246-8805-4c0716c5b96b",
    title: "Module 3: Calculus (Differentiation)",
    totalDuration: "4h 20m",
    status: "locked",
    lessons: [
      { id: "les-3a4b5c6d-7e8f-9a0b-1c2d-e3f4a5b6c7d8", title: "Limits and Principles", duration: "40m", completed: false },
      { id: "les-5c6d7e8f-9a0b-1c2d-3e4f-a5b6c7d8e9f0", title: "Chain, Product, and Quotient Rules", duration: "1h 20m", completed: false },
      { id: "les-9a0b1c2d-3e4f-5a6b-7c8d-e9f0a1b2c3d4", title: "Kinematics & Optimization", duration: "1h 15m", completed: false },
    ],
  },
];

export default function CoursesPage() {
  const overallProgress = 38;

  const activeModule = curriculum.find(m => m.status === 'active');
  const nextLesson = activeModule?.lessons.find(l => !l.completed);

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

      {nextLesson && activeModule && (
        <Card className="w-full relative overflow-hidden border-2 border-primary/20 bg-card shadow-lg mb-12">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
              <div>
                <div className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Up Next</div>
                <h2 className="text-2xl font-bold mb-2">{nextLesson.title}</h2>
                <p className="text-muted-foreground">{activeModule.title} • {nextLesson.duration}</p>
              </div>
            </div>
            <Link href={`/courses/${nextLesson.id}`} className="w-full md:w-auto shrink-0">
              <Button size="lg" className="w-full rounded-full text-md h-12 px-8 shadow-md">
                Resume Lesson
              </Button>
            </Link>
          </div>
        </Card>
      )}

      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Curriculum</h2>
        
        <div className="flex flex-col gap-6">
          {curriculum.map((module, index) => (
            <div key={module.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              
              <div className="p-5 md:p-6 bg-muted/30 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{module.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {module.totalDuration}</span>
                    <span>•</span>
                    <span>{module.lessons.length} Lessons</span>
                  </div>
                </div>
                <div>
                  {module.status === "completed" && <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">Completed</Badge>}
                  {module.status === "active" && <Badge className="bg-primary hover:bg-primary">In Progress</Badge>}
                  {module.status === "locked" && <Badge variant="outline" className="text-muted-foreground"><Lock className="w-3 h-3 mr-1" /> Locked</Badge>}
                </div>
              </div>

              <div className="flex flex-col">
                {module.lessons.map((lesson, lessonIndex) => (
                  <Link 
                    key={lesson.id} 
                    href={`/courses/${lesson.id}`}
                    className={`flex items-center justify-between p-4 px-5 md:px-6 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0 ${module.status === "locked" ? "opacity-60 pointer-events-none" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <PlayCircle className="w-5 h-5 text-muted-foreground shrink-0" />
                      )}
                      <div>
                        <span className="text-sm font-medium text-muted-foreground mr-3">
                          {index + 1}.{lessonIndex + 1}
                        </span>
                        <span className={`font-medium ${lesson.completed ? "text-muted-foreground" : "text-foreground"}`}>
                          {lesson.title}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {lesson.duration}
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
