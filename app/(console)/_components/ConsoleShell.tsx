"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  BookPlus,
  Boxes,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  HelpCircle,
  LayoutGrid,
  LogOut,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "./ui";

function SideLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm border border-transparent",
        active ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "text-slate-700 hover:bg-slate-50"
      )}
    >
      <span className={cn(active ? "text-emerald-700" : "text-slate-500")}>{icon}</span>
      <span className="flex-1 text-left">{label}</span>
    </Link>
  );
}

export default function ConsoleShell({
  title,
  subtitle,
  children,
  rightActions,
}: {
  title: string;
  subtitle?: string;
  rightActions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [rangeLabel, setRangeLabel] = React.useState("Last 6 months");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="bg-white border-b lg:border-b-0 lg:border-r">
          <div className="px-6 py-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white grid place-items-center text-sm font-semibold">
              L
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-slate-900">LSIT LIBRARY</div>
              <div className="text-xs text-slate-500">Operations Console</div>
            </div>
          </div>

          <nav className="px-3 pb-4">
            <SideLink href="/dashboard" icon={<LayoutGrid className="h-4 w-4" />} label="Dashboard" />
            <SideLink href="/members" icon={<Users className="h-4 w-4" />} label="Members" />
            <SideLink href="/add-books" icon={<BookPlus className="h-4 w-4" />} label="Add Books" />
            <SideLink href="/checkout" icon={<ClipboardCheck className="h-4 w-4" />} label="Check-out Books" />
            <SideLink href="/inventory" icon={<Boxes className="h-4 w-4" />} label="Inventory" />
            <SideLink href="/thesis" icon={<GraduationCap className="h-4 w-4" />} label="Thesis Management" />

            <div className="my-3 border-t" />
            <SideLink href="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" />
            
          </nav>

          <div className="px-6 py-4 border-t">
            <button className="w-full flex items-center gap-2 text-sm text-rose-600 hover:text-rose-700">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="bg-slate-50">
          <div className="border-b bg-white">
            <div className="px-6 py-5 flex flex-col gap-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
                  {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
                </div>

                <div className="flex items-center gap-2">{rightActions}</div>
              </div>

              {/* Search + controls */}
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-[680px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    className="w-full rounded-2xl border bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    placeholder="Search: ISBN, Title, Author, Member, Transaction…"
                  />
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3">
                  <button
                    className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => setRangeLabel((p) => (p === "Last 6 months" ? "Last 30 days" : "Last 6 months"))}
                    title="Toggle range (mock)"
                  >
                    <Activity className="h-4 w-4 text-slate-500" />
                    {rangeLabel}
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>

                  <button className="rounded-2xl border p-2 hover:bg-slate-50" aria-label="Notifications">
                    <Bell className="h-4 w-4 text-slate-600" />
                  </button>

                  <button className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-slate-50">
                    <div className="h-7 w-7 rounded-full bg-slate-200" />
                    <div className="text-left leading-tight">
                      <div className="text-sm font-medium text-slate-800">Allison</div>
                      <div className="text-[11px] text-slate-500">Librarian</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-6 space-y-6">{children}</div>

          <div className="px-6 pb-8 text-xs text-slate-500">
            UI-only mock data. Next: connect API.
          </div>
        </main>
      </div>
    </div>
  );
}
