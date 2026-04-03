// app/page.tsx
import { AuthButton } from "@/components/auth-button";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Suspense } from "react";
import { GraduationCap, ShieldCheck, PlayCircle, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <nav className="w-full flex justify-center border-b h-16 sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-bold text-lg">
            <Link href={"/"} className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
              <GraduationCap className="w-6 h-6" />
              <span>WSPortal</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Suspense>
              <AuthButton />
            </Suspense>
          </div>
        </div>
      </nav>

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

      <Footer />
    </main>
  );
}
