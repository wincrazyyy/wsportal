"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { 
  LayoutDashboard, 
  PlayCircle, 
  BookOpen, 
  Settings, 
  LogOut, 
  GraduationCap 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Video Lectures", href: "/courses", icon: PlayCircle },
  { name: "Document Vault", href: "/vault", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
];

function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 flex flex-col gap-2 px-4 py-6 overflow-y-auto">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
        Menu
      </div>
      
      {sidebarLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="w-5 h-5" />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col md:flex">
      
      {/* Header */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <GraduationCap className="w-6 h-6" />
          <span className="font-bold text-lg tracking-tight">WSPortal</span>
        </Link>
      </div>

      <Suspense 
        fallback={
          <div className="flex-1 px-4 py-6">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
              Menu
            </div>
            <div className="flex flex-col gap-2 px-2 mt-4">
              <div className="h-10 w-full bg-muted/50 rounded-lg animate-pulse"></div>
              <div className="h-10 w-full bg-muted/50 rounded-lg animate-pulse"></div>
              <div className="h-10 w-full bg-muted/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
        }
      >
        <SidebarNav />
      </Suspense>

      <div className="p-4 border-t border-border flex items-center gap-2">
        <form action="/auth/sign-out" method="post" className="flex-1">
          <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </form>
        <div className="shrink-0">
          <ThemeSwitcher />
        </div>
      </div>

    </aside>
  );
}
