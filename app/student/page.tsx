"use client";

import React from "react";
import StudentShell from "./_components/StudentShell";
import { Card, Badge, Pill } from "../(console)/_components/ui";
import { BookOpen, Calendar, Clock, GraduationCap, Star, TrendingUp, Search as SearchIcon } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
    const [search, setSearch] = React.useState("");

    return (
        <StudentShell
            title="Dashboard"
            subtitle="Welcome back, Muhammad Zohaib • AI Development (BSIT)"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Statistics Cards */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-indigo-100 bg-white/50 backdrop-blur-sm self-stretch">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-indigo-100 text-indigo-600 grid place-items-center flex-shrink-0">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Books Issued</div>
                                <div className="text-3xl font-black text-slate-900 tracking-tight">04</div>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-indigo-100 bg-white/50 backdrop-blur-sm self-stretch">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-600 grid place-items-center flex-shrink-0">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Due Today</div>
                                <div className="text-3xl font-black text-slate-900 tracking-tight">00</div>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-indigo-100 bg-white/50 backdrop-blur-sm self-stretch">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-600 grid place-items-center flex-shrink-0">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Late Return</div>
                                <div className="text-3xl font-black text-slate-900 tracking-tight">00</div>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-indigo-100 bg-white/50 backdrop-blur-sm self-stretch">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-violet-100 text-violet-600 grid place-items-center flex-shrink-0">
                                <Star className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Loyalty Points</div>
                                <div className="text-3xl font-black text-slate-900 tracking-tight">850</div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Currently Issued Books */}
                <div className="lg:col-span-2 space-y-6">
                    <Card
                        title={<span className="text-lg font-black tracking-tight text-slate-900">Current Readings</span>}
                        right={<Link href="/student/my-books" className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors">See Detailed List</Link>}
                        className="overflow-hidden border-slate-200 shadow-xl shadow-slate-200/40"
                    >
                        <div className="space-y-4">
                            {[
                                { title: "Clean Code", author: "Robert C. Martin", due: "15 March 2026", color: "indigo" },
                                { title: "React Design Patterns", author: "Elias Carlsson", due: "18 March 2026", color: "emerald" },
                            ].map((book, i) => (
                                <div key={i} className="group relative flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-12 w-9 rounded-md bg-${book.color}-600/10 border border-${book.color}-200 overflow-hidden shadow-inner grid place-items-center`}>
                                            <BookOpen className={`h-4 w-4 text-${book.color}-600`} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900 leading-none mb-1 group-hover:text-indigo-700 transition-colors">{book.title}</h4>
                                            <p className="text-xs font-bold text-slate-500">{book.author}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Return Due</div>
                                        <div className="text-xs font-black text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">{book.due}</div>
                                    </div>
                                </div>
                            ))}

                            {/* Promotion / Announcement */}
                            <div className="mt-8 p-6 rounded-3xl bg-indigo-900 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20">
                                <div className="relative z-10">
                                    <Badge text="NEW ARRIVALS" className="bg-indigo-500/30 text-indigo-100 border-none px-2 py-0.5 mb-3" />
                                    <h3 className="text-2xl font-black mb-3 leading-tight tracking-tight">The Art of Prompt Engineering: Advanced Guide</h3>
                                    <p className="text-indigo-200 text-sm font-medium mb-6 max-w-sm">Now available for pre-booking in the BSIT department library shelf B-42. Book yours now!</p>
                                    <Link href="/student/catalog" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-indigo-900 rounded-xl font-black text-sm hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-white/20">
                                        Reserve Now
                                        <TrendingUp className="h-4 w-4" />
                                    </Link>
                                </div>
                                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 h-64 w-64 bg-indigo-500/20 blur-[80px] rounded-full" />
                                <GraduationCap className="absolute bottom-4 right-4 h-24 w-24 text-white/10 -rotate-12" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar content for Dashboard */}
                <div className="space-y-6">
                    <Card title={<span className="text-base font-black tracking-tight">Quick Search Library</span>} className="border-indigo-100 shadow-lg shadow-slate-200/40">
                        <div className="relative mt-2">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Find any book..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {['AI', 'React', 'Management', 'Calculus'].map(tag => (
                                <button key={tag} className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 text-[10px] font-black text-slate-600 tracking-wider transition-all active:scale-95">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </Card>

                    <Card title={<span className="text-base font-black tracking-tight text-slate-900">Notifications</span>} className="border-slate-200 shadow-xl shadow-slate-200/30">
                        <div className="space-y-4">
                            <div className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-indigo-600 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-slate-800 leading-tight mb-1">Membership Renewal</p>
                                    <p className="text-xs font-medium text-slate-500">Your student library card expires in 12 days. Renew online.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-slate-800 leading-tight mb-1">Fine Paid</p>
                                    <p className="text-xs font-medium text-slate-500">PKR 250 fine for 'Business Ethics' was paid successfully.</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </StudentShell>
    );
}
