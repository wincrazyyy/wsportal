import { Loader2 } from "lucide-react";

export default function ProtectedLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8 text-muted-foreground">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse">Loading dashboard...</p>
      </div>
    </div>
  );
}
