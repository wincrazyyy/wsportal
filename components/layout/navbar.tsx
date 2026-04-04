import Link from "next/link";
import { Suspense } from "react";
import { GraduationCap } from "lucide-react";
import { AuthButton } from "@/components/auth-button";

export function Navbar() {
  return (
    <nav className="w-full flex justify-center border-b h-16 sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-bold text-lg">
          <Link href={"/"} className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <GraduationCap className="w-6 h-6" />
            <span>WSPortal</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Suspense fallback={<div className="h-8 w-20 bg-muted animate-pulse rounded-md" />}>
            <AuthButton />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}