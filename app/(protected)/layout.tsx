import { Sidebar } from "@/components/layout/sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function AuthGuard({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return <>{children}</>;
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-muted/20">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Suspense 
          fallback={
            <div className="p-8 flex items-center gap-3 text-muted-foreground">
              <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              <span>Securing connection...</span>
            </div>
          }
        >
          <AuthGuard>
            {children}
          </AuthGuard>
        </Suspense>
      </main>

    </div>
  );
}
