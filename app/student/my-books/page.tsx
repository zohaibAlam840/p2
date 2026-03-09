"use client";

import React from "react";
import StudentShell from "../_components/StudentShell";
import { Card, Badge, Pill } from "../../(console)/_components/ui";
import { BookOpen, Calendar, Clock, Lock, RefreshCcw, Search as SearchIcon } from "lucide-react";

export default function StudentMyBooks() {
    const [activeTab, setActiveTab] = React.useState("current");

    const MY_BOOKS = [
        {
            id: "ACC-2020-01",
            title: "Accounting-Information for Decisions",
            author: "Roger Juchau, Jack Flanagan",
            dateTaken: "02 March 2026",
            dueDate: "16 March 2026",
            status: "current",
            late: false,
        },
        {
            id: "ACC-2020-03",
            title: "Financial Manegerial Accounting Meigs & Meigs",
            author: "Jane R. Williams, Susan F. Haka & Mark Bettner",
            dateTaken: "05 March 2026",
            dueDate: "19 March 2026",
            status: "current",
            late: false,
        },
        {
            id: "ACC-2020-15",
            title: "Management Accounting",
            author: "Seal, Garrison & Noreen",
            dateTaken: "15 Jan 2026",
            dueDate: "29 Jan 2026",
            status: "returned",
            late: false,
        }
    ];

    const filtered = MY_BOOKS.filter(b => b.status === activeTab);

    return (
        <StudentShell
            title="My Issued Books"
            subtitle="Overview of your current loans and borrowing history."
        >
            <div className="flex flex-col gap-8">
                {/* Tabs for different statuses */}
                <div className="flex flex-wrap gap-4 items-center bg-white p-2 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 w-full max-w-sm sticky top-0 relative z-10">
                    <button
                        onClick={() => setActiveTab("current")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 ${activeTab === 'current' ? 'bg-indigo-900 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                        Active Loans
                    </button>
                    <button
                        onClick={() => setActiveTab("returned")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 ${activeTab === 'returned' ? 'bg-indigo-900 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                        Past History
                    </button>
                </div>

                {/* Display Books */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                    {filtered.length > 0 ? (
                        filtered.map((book, i) => (
                            <div key={i} className="group flex flex-col lg:flex-row bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-400/5 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                                {/* Side Section (Visual Indicator) */}
                                <div className={`w-full lg:w-48 bg-slate-50 p-10 flex flex-col justify-center items-center relative overflow-hidden`}>
                                    <BookOpen className="h-12 w-12 text-slate-300 relative z-10 mb-4" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest relative z-10">Department Library</span>
                                    <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                                    <div className="max-w-md">
                                        <Badge text={book.id} className="bg-slate-100 text-slate-600 font-black border-none px-2 py-0.5 mb-4" />
                                        <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 group-hover:text-indigo-700 transition-colors tracking-tight">{book.title}</h3>
                                        <p className="text-sm font-bold text-slate-500 mb-0">By {book.author}</p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Issued On</span>
                                            <span className="text-[13px] font-black text-slate-900">{book.dateTaken}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Return Due</span>
                                            <span className="text-[13px] font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 text-center">{book.dueDate}</span>
                                        </div>
                                        <div className="hidden md:flex flex-col">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Status</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                                                <span className="text-[13px] font-black text-indigo-900 uppercase tracking-tight">Active</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4 self-center lg:self-auto">
                                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-black text-xs rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95 group/btn">
                                            <RefreshCcw className="h-4 w-4 group-hover/btn:rotate-180 transition-transform duration-500" />
                                            RENEW LOAN
                                        </button>
                                        <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-95 shadow-lg shadow-slate-200/20">
                                            <Lock className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-slate-50 py-24 rounded-[60px] border border-slate-200 border-dashed flex flex-col items-center justify-center">
                            <div className="h-20 w-20 rounded-full bg-white text-slate-200 grid place-items-center mb-6 shadow-xl shadow-slate-200">
                                <BookOpen className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">No books found in this section</h3>
                            <p className="text-sm font-bold text-slate-500 mt-2">Try checking the other tabs or browse the library catalog.</p>
                        </div>
                    )}
                </div>
            </div>
        </StudentShell>
    );
}
