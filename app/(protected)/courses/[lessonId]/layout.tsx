import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const relatedLessons = [
  { id: "les-f1e2d3c4-b5a6-9f8e-7d6c-5b4a3f2e1d0c", title: "Domain, Range, and Composite Functions", completed: true },
  { id: "les-9a8b7c6d-5e4f-3a2b-1c0d-e9f8a7b6c5d4", title: "Inverse Functions & Transformations", completed: false, active: true },
  { id: "les-1a2b3c4d-5e6f-7a8b-9c0d-e1f2a3b4c5d6", title: "Rational Functions", completed: false },
  { id: "les-7a8b9c0d-1e2f-3a4b-5c6d-e7f8a9b0c1d2", title: "Exponential & Logarithmic Functions", completed: false },
];

export default async function LessonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="h-16 border-b flex items-center justify-between px-4 md:px-8 shrink-0 bg-card">
        <div className="flex items-center gap-4">
          <Link href="/courses">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden md:inline">Back to Curriculum</span>
            </Button>
          </Link>
          <div className="h-4 w-px bg-border hidden md:block"></div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary leading-none mb-1">
              Module 2: Functions
            </span>
            <h1 className="text-sm font-bold truncate max-w-[200px] md:max-w-md">
              Current Lesson Context
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
            <h2 className="font-bold">Course Content</h2>
            <p className="text-xs text-muted-foreground mt-1">4 Lessons • 3h 45m</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {relatedLessons.map((item, idx) => {
              const isActive = item.id === lessonId || item.active; 

              return (
                <Link 
                  key={item.id} 
                  href={`/courses/${item.id}`}
                  className={`flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0 ${isActive ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                  ) : (
                    <div className={`w-4 h-4 rounded-full border-2 mt-1 shrink-0 ${isActive ? 'border-primary' : 'border-muted-foreground/30'}`} />
                  )}
                  <div className="flex flex-col gap-1">
                    <span className={`text-xs font-bold ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                      Lesson {idx + 1}
                    </span>
                    <span className={`text-sm font-semibold leading-tight ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {item.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </aside>

      </div>
    </div>
  );
}
