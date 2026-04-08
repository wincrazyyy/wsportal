"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  LogOut, 
  GraduationCap,
  BookMarked,
  Library
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Document Vault", href: "/vault", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
];

const registeredClasses = [
  { 
    id: "pkg-11a2b3c4-d5e6-7f8a-9b0c-1234567890ab", 
    name: "IBDP Math AA HL", 
    href: "/courses/pkg-11a2b3c4-d5e6-7f8a-9b0c-1234567890ab", 
  },
  { 
    id: "pkg-99x8y7z6-a1b2-c3d4-e5f6-1234567890ab", 
    name: "IBDP Physics HL", 
    href: "/courses/pkg-99x8y7z6-a1b2-c3d4-e5f6-1234567890ab", 
  },
];

function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 flex flex-col gap-6 px-4 py-6 overflow-y-auto">
      <div className="flex flex-col gap-2">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 px-2">
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
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
          My Classes
        </div>
        <Link
          href="/courses"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group z-10 relative",
            pathname === "/courses" 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Library className="w-5 h-5 shrink-0" />
          <span className="truncate">All Classes</span>
        </Link>

        <div className="relative flex flex-col gap-1 mt-1">
          <div className="absolute left-5 top-0 bottom-4 w-px bg-border/80"></div>
          
          {registeredClasses.map((cls) => {
            const isActive = pathname.includes(cls.id);

            return (
              <Link
                key={cls.id}
                href={cls.href}
                className={cn(
                  "flex items-center gap-3 ml-6 pl-2 pr-3 py-2 rounded-lg text-sm font-medium transition-colors group relative",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <div className="absolute -left-[13px] top-1/2 w-3 h-px bg-border/80 -translate-y-1/2"></div>
                
                <div className={cn(
                  "w-4 h-4 flex items-center justify-center rounded-[4px] border shrink-0",
                  isActive ? "border-primary bg-primary/20 text-primary" : "border-muted-foreground/40 text-muted-foreground group-hover:border-foreground"
                )}>
                  <BookMarked className="w-[10px] h-[10px]" />
                </div>
                <span className="truncate text-[13px]">{cls.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col md:flex shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
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

      <div className="p-4 border-t border-border flex items-center gap-2 shrink-0">
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
