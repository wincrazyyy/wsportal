import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { GraduationCap, ShieldCheck, PlayCircle, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <nav className="w-full flex justify-center border-b h-16 sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-bold text-lg">
            <Link href={"/"} className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
              <GraduationCap className="w-6 h-6" />
              <span>WSPortal</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </div>
      </nav>

      <section className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-24 text-white shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center px-5 gap-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
            Master your exams with premium video tutoring.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-emerald-50 font-medium">
            Get exclusive access to high-definition video lessons, secured past papers, and comprehensive study notes.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <PlayCircle className="w-5 h-5" />
              <span>HD Streaming</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Secure Access</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <BookOpen className="w-5 h-5" />
              <span>Past Papers</span>
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1 w-full flex flex-col items-center">
        <div className="flex-1 flex flex-col gap-12 max-w-5xl p-8 w-full mt-8">
          <main className="flex-1 flex flex-col gap-6 bg-muted/30 p-8 rounded-xl border">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <h2 className="font-semibold text-2xl">Database Connection Status</h2>
            </div>
            {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
          </main>
          
        </div>
      </div>

      <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-sm gap-8 py-8 mt-12 bg-muted/20">
        <p className="text-muted-foreground">
          Built with Next.js, Supabase, and AWS.
        </p>
        <ThemeSwitcher />
      </footer>

    </main>
  );
}