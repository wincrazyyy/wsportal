import { PlayCircle } from "lucide-react";

export default function LessonLoading() {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background">
      <div className="w-full aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden relative group border-4 border-card">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 to-transparent text-white">
          <PlayCircle className="w-20 h-20 text-primary/80 opacity-50" />
          <p className="mt-4 font-medium text-lg opacity-80">Loading lesson...</p>
        </div>
      </div>
    </div>
  );
}
