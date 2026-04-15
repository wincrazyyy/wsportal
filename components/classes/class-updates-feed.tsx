import Link from "next/link";
import { MessageCircle, Paperclip, ExternalLink, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ClassUpdatesFeedProps {
  announcements: any[];
  tutor: {
    name: string;
    initials: string;
  };
}

export function ClassUpdatesFeed({ announcements, tutor }: ClassUpdatesFeedProps) {
  return (
    <div className="xl:col-span-7 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">Class Updates</h2>
        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Filter</Button>
      </div>
      
      <div className="flex flex-col gap-6">
        {announcements.map((ann) => {
          const isImportant = ann.type === "important";

          return (
            <Card 
              key={ann.id} 
              className={`p-6 bg-card border shadow-sm transition-all hover:shadow-md ${isImportant ? 'border-primary/30 ring-1 ring-primary/10' : 'border-border'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {tutor.initials}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">{tutor.name}</div>
                    <div className="text-xs text-muted-foreground font-medium">{ann.date}</div>
                  </div>
                </div>
                {isImportant && <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 border-transparent pointer-events-none">Important</Badge>}
              </div>
              
              <h3 className="text-xl font-bold mb-3">{ann.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {ann.content}
              </p>

              {ann.link && (
                <Link href={ann.link.url} className="mt-4 flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors group">
                  <div className="p-2 bg-background rounded-md text-primary group-hover:bg-primary/10 transition-colors shadow-sm">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex-1 truncate">
                    {ann.link.title}
                  </span>
                </Link>
              )}

              {ann.image && (
                <div className="mt-4 rounded-xl border border-border bg-muted/20 flex flex-col items-center justify-center aspect-video overflow-hidden">
                  <ImageIcon className="w-10 h-10 text-muted-foreground/30 mb-2" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{ann.image.alt}</span>
                </div>
              )}

              <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border/50 text-sm font-medium text-muted-foreground">
                <button className="flex items-center gap-2 hover:text-primary transition-colors">
                  <MessageCircle className="w-4 h-4" /> 
                  {ann.comments > 0 ? `${ann.comments} Comments` : 'Discuss'}
                </button>
                {ann.type === "event" && (
                  <button className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Paperclip className="w-4 h-4" /> 1 Attachment
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
