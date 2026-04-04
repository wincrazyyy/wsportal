import { ShieldCheck, PlayCircle, BookOpen } from "lucide-react";

export function Features() {
  return (
    <div className="flex-1 w-full flex flex-col items-center bg-muted/30">
      <div className="max-w-5xl p-8 w-full py-16 grid md:grid-cols-3 gap-8">
        
        <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm flex flex-col items-center text-center gap-4 hover:border-primary/50 transition-colors">
          <div className="p-4 bg-primary/10 rounded-full text-primary">
            <PlayCircle className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-xl">On-Demand Lectures</h3>
          <p className="text-muted-foreground">
            Watch crystal-clear, adaptive bitrate video lessons anytime, anywhere. Never buffer during a study session again.
          </p>
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm flex flex-col items-center text-center gap-4 hover:border-primary/50 transition-colors">
          <div className="p-4 bg-primary/10 rounded-full text-primary">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-xl">The Document Vault</h3>
          <p className="text-muted-foreground">
            Access hundreds of categorized past papers, mark schemes, and exclusive revision notes in our secure viewer.
          </p>
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm flex flex-col items-center text-center gap-4 hover:border-primary/50 transition-colors">
          <div className="p-4 bg-primary/10 rounded-full text-primary">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-xl">Track Your Progress</h3>
          <p className="text-muted-foreground">
            Pick up exactly where you left off. Our dashboard tracks your watched videos and completed modules automatically.
          </p>
        </div>

      </div>
    </div>
  );
}