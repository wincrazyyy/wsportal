import Link from "next/link";
import { ShieldCheck, PlayCircle, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-24 text-white shadow-lg">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center px-5 gap-8">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl drop-shadow-sm">
          Master your exams with premium video tutoring.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-emerald-50 font-medium">
          Get exclusive access to high-definition video lessons, secured past papers, and comprehensive study notes.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Link href="/register">
            <Button size="lg" className="bg-white text-teal-700 hover:bg-emerald-50 text-lg font-semibold px-8 rounded-full shadow-md">
              Create Account <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-lg font-semibold px-8 rounded-full">
              Sign In
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium">
            <PlayCircle className="w-4 h-4" />
            <span>HD Streaming</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Access</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium">
            <BookOpen className="w-4 h-4" />
            <span>Past Papers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
