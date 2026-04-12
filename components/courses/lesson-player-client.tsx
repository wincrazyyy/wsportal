"use client";

import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  PlayCircle, 
  FileText, 
  MessageSquare, 
  CheckCircle2,
  FolderTree,
  Download,
  Clock,
  Paperclip
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LessonPlayerClientProps {
  lessonId: string;
  lessonData: any;
  curriculum: any; 
  activeTopic: any;
}

export function LessonPlayerClient({ lessonId, lessonData, curriculum, activeTopic }: LessonPlayerClientProps) {
  
  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 flex flex-col">
        <div className="w-full aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden relative group border-4 border-card shrink-0">
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 to-transparent text-white">
            <PlayCircle className="w-20 h-20 text-primary/80 group-hover:text-primary transition-all group-hover:scale-110 cursor-pointer" />
            <p className="mt-4 font-medium text-lg opacity-80">AWS Secure Stream Initialization...</p>
            <p className="mt-2 text-xs opacity-40 font-mono">ID: {lessonId}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 shrink-0">
          <Button variant="outline" className="rounded-full gap-2 group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
          
          <div className="flex items-center gap-2">
             <Button className="rounded-full gap-2 px-6 sm:px-8 font-bold shadow-lg shadow-primary/20">
               <span className="hidden sm:inline">Mark as Complete</span>
               <span className="sm:hidden">Complete</span>
               <CheckCircle2 className="w-4 h-4" />
             </Button>
          </div>
          
          <Button variant="outline" className="rounded-full gap-2 group">
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <aside className="w-full lg:w-[400px] xl:w-[450px] border-l bg-card flex flex-col shrink-0 h-full">
        <Tabs defaultValue="curriculum" className="w-full flex flex-col h-full">
          
          <div className="p-4 border-b border-border bg-card shrink-0">
            <TabsList className="w-full grid grid-cols-3 bg-muted/50 p-1">
              <TabsTrigger value="curriculum" className="text-[10px] sm:text-xs"><FolderTree className="w-3.5 h-3.5 mr-1.5 hidden sm:block" /> Course</TabsTrigger>
              <TabsTrigger value="overview" className="text-[10px] sm:text-xs"><FileText className="w-3.5 h-3.5 mr-1.5 hidden sm:block" /> Info</TabsTrigger>
              <TabsTrigger value="discussion" className="text-[10px] sm:text-xs"><MessageSquare className="w-3.5 h-3.5 mr-1.5 hidden sm:block" /> Q&A</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-y-auto p-0">
            <TabsContent value="curriculum" className="m-0 border-none outline-none">
              <div className="p-4 border-b bg-card sticky top-0 z-20 backdrop-blur-md">
                <h2 className="font-bold text-sm">{activeTopic?.title || "Course Content"}</h2>
              </div>
              <div className="flex flex-col">
                {activeTopic?.resources && activeTopic.resources.length > 0 && (
                  <div className="p-4 bg-primary/5 border-b border-border/50 flex flex-col gap-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                      Topic Resources
                    </div>
                    {activeTopic.resources.map((res: any) => (
                      <Link key={res.id} href="#" className="flex items-center justify-between p-3 bg-card border border-primary/20 rounded-lg hover:border-primary/50 hover:shadow-sm transition-all group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-md text-primary group-hover:bg-primary/20 transition-colors">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                              {res.title}
                            </span>
                            <span className="text-xs text-muted-foreground mt-0.5">{res.size} • PDF</span>
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all mr-2" />
                      </Link>
                    ))}
                  </div>
                )}

                {activeTopic?.subtopics.map((subtopic: any) => (
                  <div key={subtopic.id} className="border-b border-border/50 last:border-0 pb-2">
                    <div className="bg-muted/30 px-4 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest sticky top-[53px] backdrop-blur-md z-10 border-b border-border/50">
                      {subtopic.title}
                    </div>
                    
                    <div className="flex flex-col">
                      {subtopic.resources && subtopic.resources.length > 0 && (
                        <div className="flex flex-col border-b border-border/50 bg-muted/5">
                          {subtopic.resources.map((res: any) => (
                            <Link key={res.id} href="#" className="flex items-center gap-3 p-3 px-5 hover:bg-muted/50 transition-colors group">
                              <Paperclip className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate">
                                {res.title}
                              </span>
                              <span className="text-[10px] text-muted-foreground ml-auto border border-border px-1.5 py-0.5 rounded bg-background shrink-0">
                                {res.size}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}

                      {subtopic.videos.map((video: any) => {
                        const isActive = video.id === lessonId; 
                        return (
                          <Link 
                            key={video.id} 
                            href={`/lessons/${video.id}`}
                            className={`flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0 ${isActive ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
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
            </TabsContent>

            <TabsContent value="overview" className="m-0 p-6 space-y-4 outline-none">
              <h3 className="text-xl font-bold">{lessonData.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium mb-4">
                <Clock className="w-4 h-4" />
                {lessonData.duration}
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {lessonData.description}
              </p>
            </TabsContent>

            <TabsContent value="discussion" className="m-0 p-6 outline-none">
              <div className="text-center text-muted-foreground text-sm py-12">
                 <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-20" />
                 Discussion board coming soon.
              </div>
            </TabsContent>

          </div>
        </Tabs>
      </aside>
    </div>
  );
}