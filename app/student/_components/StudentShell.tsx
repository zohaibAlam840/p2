"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Activity,
    Bell,
    Book,
    ChevronDown,
    LayoutGrid,
    Library,
    LogOut,
    Menu,
    Search,
    User,
    X,
    History,
} from "lucide-react";
import { cn } from "../../(console)/_components/ui";

function SideLink({
    href,
    icon,
    label,
    onClick,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}) {
    const pathname = usePathname();
    const active = pathname === href || (href !== "/student" && pathname.startsWith(href));

    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm border border-transparent transition-colors",
                active
                    ? "bg-white/80 text-indigo-900 border-indigo-200"
                    : "text-white hover:bg-white/10"
            )}
        >
            <span className={cn(active ? "text-indigo-800" : "text-white/90")}>{icon}</span>
            <span className="flex-1 text-left">{label}</span>
        </Link>
    );
}

export default function StudentShell({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const pathname = usePathname();

    React.useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr]">
                {/* Mobile overlay */}
                {sidebarOpen && (
                    <button
                        aria-label="Close sidebar overlay"
                        className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={cn(
                        "bg-indigo-900 border-indigo-950 border-r text-white",
                        "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:static lg:inset-auto lg:w-auto lg:translate-x-0",
                        sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
                    )}
                >
                    <div className="px-6 py-8 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="h-10 w-10 rounded-2xl bg-indigo-500 text-white grid place-items-center text-xl font-black shadow-lg shadow-indigo-500/20">
                                S
                            </div>
                            <div className="leading-tight">
                                <div className="font-black text-lg tracking-tight">KIPS STUDENT</div>
                                <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Digital Library</div>
                            </div>

                            <button
                                className="lg:hidden ml-auto rounded-xl p-2 hover:bg-white/10 transition-colors"
                                aria-label="Close sidebar"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X className="h-5 w-5 text-indigo-200" />
                            </button>
                        </div>

                        <nav className="flex-1 space-y-2">
                            <div className="px-3 mb-2 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Menu</div>
                            <SideLink href="/student" icon={<LayoutGrid className="h-4 w-4" />} label="Dashboard" />
                            <SideLink href="/student/catalog" icon={<Book className="h-4 w-4" />} label="Browse Library" />
                            <SideLink href="/student/my-books" icon={<Library className="h-4 w-4" />} label="My Issued Books" />
                            <SideLink href="/student/history" icon={<History className="h-4 w-4" />} label="Borrowing History" />

                            <div className="my-6 border-t border-white/10 mx-3" />
                            <div className="px-3 mb-2 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Personal</div>
                            <SideLink href="/student/profile" icon={<User className="h-4 w-4" />} label="My Profile" />
                        </nav>

                        <div className="mt-auto pt-6 border-t border-white/10">
                            <button className="w-full flex items-center justify-between gap-2 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-indigo-400/20 border border-indigo-400/30 grid place-items-center text-xs font-bold">ST</div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold leading-none mb-0.5">Student Room</div>
                                        <div className="text-[10px] text-indigo-300 font-medium tracking-tight">Reg: 2024-BSIT-042</div>
                                    </div>
                                </div>
                                <LogOut className="h-4 w-4 text-indigo-200 group-hover:text-white transition-colors" />
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex flex-col min-h-screen relative overflow-x-hidden">
                    {/* Top Navbar */}
                    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    className="lg:hidden rounded-xl bg-slate-100 p-2.5 hover:bg-slate-200 transition-colors"
                                    aria-label="Open sidebar"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <Menu className="h-5 w-5 text-indigo-900" />
                                </button>

                                <div>
                                    <h1 className="text-xl font-black text-slate-900 tracking-tight">{title}</h1>
                                    {subtitle && <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{subtitle}</p>}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center bg-slate-100 px-3 py-1.5 rounded-full text-indigo-900 border border-slate-200 font-bold text-xs gap-2">
                                    <Activity className="h-3 w-3 text-emerald-500" />
                                    Library Online
                                </div>

                                <button className="relative p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all active:scale-95">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                                </button>

                                <Link href="/" className="px-4 py-2 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-black transition-all shadow-lg shadow-black/10 active:scale-95">
                                    MAIN EXIT
                                </Link>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <section className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
                        {children}
                    </section>

                    {/* Footer */}
                    <footer className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                        &copy; 2026 LSIT Digital Library Portal • Student Excellence Center
                    </footer>
                </main>
            </div>
        </div>
    );
}
