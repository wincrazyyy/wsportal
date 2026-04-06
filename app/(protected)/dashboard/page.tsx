import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, BookOpen, Clock } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Welcome back, {user.email?.split('@')[0] || "Student"}! 👋
        </h1>
        <p className="text-muted-foreground">
          Here is your current progress in the IBDP Math Mastery System.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Videos Watched
            </CardTitle>
            <PlayCircle className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 / 32</div>
            <p className="text-xs text-muted-foreground mt-1">38% of curriculum completed</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Past Papers Solved
            </CardTitle>
            <BookOpen className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">Next paper: 2018 Paper 1</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Study Time (This Week)
            </CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 hrs</div>
            <p className="text-xs text-muted-foreground mt-1">+1.2 hrs from last week</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-12">Continue Watching</h2>
      <Card className="p-6 border-border/50 shadow-sm flex items-center justify-between bg-card hover:border-primary/50 transition-colors cursor-pointer group">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <PlayCircle className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Calculus: Integration by Parts</h3>
            <p className="text-sm text-muted-foreground">Module 4 • 15 mins remaining</p>
          </div>
        </div>
        <div className="text-sm font-medium text-primary hidden md:block">
          Resume Lesson &rarr;
        </div>
      </Card>
      
    </div>
  );
}
