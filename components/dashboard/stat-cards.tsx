import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, BookOpen, Clock } from "lucide-react";

export function StatCards() {
  return (
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
  );
}
