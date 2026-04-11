import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Hardcoded for mock purposes.
const mockClassId = "pkg-11a2b3c4-d5e6-7f8a-9b0c-1234567890ab";

export default async function LessonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;

  return (
    <div className="flex flex-col h-screen bg-background">
      
      {/* Top Navigation Bar */}
      <header className="h-16 border-b flex items-center justify-between px-4 md:px-6 shrink-0 bg-card z-50">
        <div className="flex items-center gap-4 overflow-hidden">
          <Link href={`/courses/${mockClassId}`} className="shrink-0">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Curriculum</span>
            </Button>
          </Link>
          <div className="h-4 w-px bg-border hidden md:block shrink-0"></div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary leading-none mb-1 truncate">
              Topic 2: Functions
            </span>
            <h1 className="text-sm font-bold truncate">
              2.2 Transformations
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
           <Badge variant="outline" className="hidden sm:flex border-primary/20 text-primary bg-primary/5">AA HL</Badge>
        </div>
      </header>

      {/* Main Content Area (Where the Video and Sidebar render) */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}