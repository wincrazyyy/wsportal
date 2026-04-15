import { 
  Megaphone, 
  Bell, 
  CalendarDays,
  MessageCircle,
  Paperclip
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const announcements = [
  {
    id: "ann-1",
    courseCode: "AA HL",
    title: "Mock Exam Solutions Uploaded",
    content: "I've just uploaded the video walkthroughs for the May 2023 TZ2 Past Paper in the Document Vault. Make sure to review Q9 and Q11, as the mark scheme is quite particular about the working out for those integration steps.",
    date: "2 hours ago",
    type: "important",
    comments: 8,
    icon: Bell,
    author: { name: "Winson Siu", initials: "WS" }
  },
  {
    id: "ann-2",
    courseCode: "PHYS HL",
    title: "Live Q&A Session Tomorrow",
    content: "We will be running a live Zoom session covering Kinematics tomorrow at 5 PM GMT. Link will be posted here 10 mins before. Bring your toughest questions!",
    date: "1 day ago",
    type: "event",
    comments: 24,
    icon: CalendarDays,
    author: { name: "Dr. Sarah Jenkins", initials: "SJ" }
  },
  {
    id: "ann-3",
    courseCode: "AA HL",
    title: "New Module 5 Videos",
    content: "Topic 5.1 (Differentiation Rules) is now fully unlocked for all AA HL students. Let me know if you have questions in the lesson discussions.",
    date: "3 days ago",
    type: "standard",
    comments: 2,
    icon: Megaphone,
    author: { name: "Winson Siu", initials: "WS" }
  }
];

export function GlobalUpdatesFeed() {
  return (
    <div className="lg:col-span-8 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">Global Updates</h2>
        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Filter</Button>
      </div>
      
      <div className="flex flex-col gap-6">
        {announcements.map((ann) => {
          const Icon = ann.icon;
          const isImportant = ann.type === "important";

          return (
            <Card 
              key={ann.id} 
              className={`p-6 bg-card border shadow-sm transition-all hover:shadow-md ${isImportant ? 'border-primary/30 ring-1 ring-primary/10' : 'border-border'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {ann.author.initials}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground flex items-center gap-2">
                      {ann.author.name}
                      <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {ann.courseCode}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground font-medium mt-0.5">{ann.date}</div>
                  </div>
                </div>
                {isImportant && <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 border-transparent pointer-events-none shrink-0">Important</Badge>}
              </div>
              
              <h3 className="text-xl font-bold mb-3">{ann.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {ann.content}
              </p>

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
