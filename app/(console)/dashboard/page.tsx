"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Download, Plus, ShieldCheck, Clock, Activity } from "lucide-react";
import ConsoleShell from "../_components/ConsoleShell";
import { Badge, Card, MiniBar, Pill } from "../_components/ui";
import { useConsole } from "../_components/ConsoleContext";

type Stat = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  sub?: string;
};

// STATS will be computed from filtered data

const OVERDUE_ROWS = [
  { memberId: "#48964", member: "Ali", title: "Magnolia Palace", isbn: "3234", dueIn: "5d", fine: "PKR 100", status: "Reminder sent" },
  { memberId: "#12903", member: "mishii", title: "Don Quixote", isbn: "1188", dueIn: "2d", fine: "PKR 150", status: "Call required" },
  { memberId: "#22391", member: "Fatima", title: "Pride and Prejudice", isbn: "0031", dueIn: "1d", fine: "PKR 200", status: "Escalated" },
];

export default function Page() {
  return (
    <ConsoleShell
      title="Dashboard"
      subtitle="Track circulation, overdue risk, member growth, and fee collections."
      rightActions={
        <>
          <Link
            href="/add-books"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Book
          </Link>
        </>
      }
    >
      <DashboardContent />
    </ConsoleShell>
  );
}

function DashboardContent() {
  const { search, range, availability } = useConsole();

  // Simulate a dateAdded for demo (real data should have a date field)
  const now = Date.now();
  const days = (n: number) => n * 24 * 60 * 60 * 1000;
  const threshold = range === "Last 30 days" ? days(30) : days(180);
  // Fake date mapping for demo
  const overdueWithDate = OVERDUE_ROWS.map((r, i) => ({
    ...r,
    // Stagger dates: first = 10d ago, second = 40d, third = 150d
    dateAdded: new Date(now - [10, 40, 150][i % 3] * 24 * 60 * 60 * 1000).toISOString(),
    available: r.status === "Reminder sent" ? 1 : 0 // fake availability
  }));

  const filteredOverdue = overdueWithDate.filter((r) => {
    // Search
    const matchesSearch = !search || [r.member, r.title, r.isbn].join(" ").toLowerCase().includes(search.toLowerCase());
    // Range
    const added = new Date(r.dateAdded).getTime();
    const matchesRange = !r.dateAdded || added >= now - threshold;
    // Availability
    const matchesAvailability =
      availability === "All" || (availability === "Available" ? r.available > 0 : r.available === 0);
    return matchesSearch && matchesRange && matchesAvailability;
  });

  // Compute stats from filtered data
  const borrowed = filteredOverdue.length + 10; // fake: add 10 for demo
  const returned = Math.max(0, 50 - filteredOverdue.length); // fake: 50 minus overdue
  const overdue = filteredOverdue.length;
  const missing = filteredOverdue.filter(r => r.status === "Escalated").length;
  const STATS: Stat[] = [
    { label: "Borrowed Books", value: borrowed.toString(), delta: "+23%", trend: "up", sub: "vs last period" },
    { label: "Returned Books", value: returned.toString(), delta: "-14%", trend: "down", sub: "processing slower" },
    { label: "Overdue Books", value: overdue.toString(), delta: "+11%", trend: "up", sub: "needs follow-up" },
    { label: "Missing Books", value: missing.toString(), delta: "+11%", trend: "up", sub: "investigation opened" },
  ];

  return (
    <>
      {/* Quick strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-2xl border bg-slate-50 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-slate-700" />
            <div>
              <div className="text-sm font-semibold text-slate-900">System Health</div>
              <div className="text-xs text-slate-600">Email, DB, reminders OK</div>
            </div>
          </div>
          <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-full">Healthy</span>
        </div>

        <div className="rounded-2xl border bg-slate-50 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-slate-700" />
            <div>
              <div className="text-sm font-semibold text-slate-900">Today</div>
              <div className="text-xs text-slate-600">Peak hours: 12:00–15:00</div>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-700 bg-white border px-2 py-1 rounded-full">1,504 visits</span>
        </div>

        <div className="rounded-2xl border bg-slate-50 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-slate-700" />
            <div>
              <div className="text-sm font-semibold text-slate-900">Circulation</div>
              <div className="text-xs text-slate-600">Borrow/return ratio stable</div>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-900 bg-white border px-2 py-1 rounded-full">+2.3%</span>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s, idx) => (
          <div key={s.label} className="rounded-2xl border bg-white shadow-sm p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-slate-500">{s.label}</div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">{s.value}</div>
                <div className="mt-1 text-xs text-slate-500">{s.sub}</div>
              </div>
              <Pill trend={s.trend} text={s.delta} />
            </div>

            <div className="mt-3">
              <MiniBar value={idx % 2 === 0 ? 74 - idx * 4 : 58 + idx * 5} />
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span>Target</span>
                <span>{idx % 2 === 0 ? "On track" : "Needs attention"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overdue */}
      <Card title="Overdue’s History" right={<span className="text-xs text-slate-500">{OVERDUE_ROWS.length} items</span>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-xs text-slate-500">
                <th className="text-left font-medium py-2">Member</th>
                <th className="text-left font-medium py-2">Title</th>
                <th className="text-left font-medium py-2">ISBN</th>
                <th className="text-left font-medium py-2">Due</th>
                <th className="text-left font-medium py-2">Fine</th>
                <th className="text-left font-medium py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOverdue.map((r, idx) => (
                <tr key={idx} className="text-slate-700">
                  <td className="py-2">
                    <div className="font-medium text-slate-900">{r.member}</div>
                    <div className="text-xs text-slate-500">{r.memberId}</div>
                  </td>
                  <td className="py-2">{r.title}</td>
                  <td className="py-2">{r.isbn}</td>
                  <td className="py-2">
                    <Badge text={r.dueIn} />
                  </td>
                  <td className="py-2">{r.fine}</td>
                  <td className="py-2">
                    <span
                      className={[
                        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                        r.status === "Escalated"
                          ? "bg-rose-50 text-rose-700"
                          : r.status === "Call required"
                          ? "bg-amber-50 text-amber-800"
                          : "bg-blue-50 text-blue-700",
                      ].join(" ")}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <Link href="/checkout" className="text-xs text-blue-700 hover:text-blue-800 inline-flex items-center gap-1">
            Go to Check-out / Returns <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Card>
    </>
  );
}
