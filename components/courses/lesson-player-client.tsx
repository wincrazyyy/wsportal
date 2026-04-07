"use client";

import { 
  ChevronLeft, 
  ChevronRight, 
  PlayCircle, 
  FileText, 
  MessageSquare, 
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LessonPlayerClientProps {
  lessonId: string;
  lessonData: any;
}

export function LessonPlayerClient({ lessonId, lessonData }: LessonPlayerClientProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background h-full">
      <div className="w-full aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden relative group border-4 border-card">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 to-transparent text-white">
          <PlayCircle className="w-20 h-20 text-primary/80 group-hover:text-primary transition-all group-hover:scale-110 cursor-pointer" />
          <p className="mt-4 font-medium text-lg opacity-80">AWS Secure Stream Initialization...</p>
          <p className="mt-2 text-xs opacity-40 font-mono">ID: {lessonId}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 mb-10">
        <Button variant="outline" className="rounded-full gap-2 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Previous
        </Button>
        <div className="flex items-center gap-2">
           <Button className="rounded-full gap-2 px-8 font-bold shadow-lg shadow-primary/20">
             Mark as Complete
             <CheckCircle2 className="w-4 h-4" />
           </Button>
        </div>
        <Button variant="outline" className="rounded-full gap-2 group">
          Next
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="overview" className="gap-2"><FileText className="w-4 h-4" /> Overview</TabsTrigger>
          <TabsTrigger value="resources" className="gap-2"><FileText className="w-4 h-4" /> Resources</TabsTrigger>
          <TabsTrigger value="discussion" className="gap-2"><MessageSquare className="w-4 h-4" /> Discussion</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <h3 className="text-xl font-bold">About this lesson</h3>
          <p className="text-muted-foreground leading-relaxed">
            {lessonData.description}
          </p>
        </TabsContent>

        <TabsContent value="resources" className="grid gap-4">
           {lessonData.resources?.map((file: any) => (
             <Card key={file.name} className="p-4 flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer group">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-primary/10 rounded text-primary">
                   <FileText className="w-5 h-5" />
                 </div>
                 <div>
                   <div className="font-semibold group-hover:text-primary transition-colors">{file.name}</div>
                   <div className="text-xs text-muted-foreground">{file.size}</div>
                 </div>
               </div>
               <Button variant="ghost" size="sm" className="text-primary">Download</Button>
             </Card>
           ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
