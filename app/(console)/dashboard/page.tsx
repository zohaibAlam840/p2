"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Download, Filter, Plus, ShieldCheck, Clock, Activity } from "lucide-react";
import ConsoleShell from '../_components/ConsoleShell';
import { Badge, Card, MiniBar, Pill } from "../_components/ui";

type Stat = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  sub?: string;
};

const STATS: Stat[] = [
  { label: "Borrowed Books", value: "2,405", delta: "+23%", trend: "up", sub: "vs last period" },
  { label: "Returned Books", value: "783", delta: "-14%", trend: "down", sub: "processing slower" },
  { label: "Overdue Books", value: "45", delta: "+11%", trend: "up", sub: "needs follow-up" },
  { label: "Missing Books", value: "12", delta: "+11%", trend: "up", sub: "investigation opened" },
];

const OVERDUE_ROWS = [
  { memberId: "#48964", member: "Ali", title: "Magnolia Palace", isbn: "3234", dueIn: "5d", fine: "$10", status: "Reminder sent" },
  { memberId: "#12903", member: "mishii", title: "Don Quixote", isbn: "1188", dueIn: "2d", fine: "$15", status: "Call required" },
  { memberId: "#22391", member: "Fatima", title: "Pride and Prejudice", isbn: "0031", dueIn: "1d", fine: "$20", status: "Escalated" },
];

export default function Page() {
  return (
    <ConsoleShell
      title="Dashboard"
      subtitle="Track circulation, overdue risk, member growth, and fee collections."
      rightActions={
        <>
          <button className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
            <Filter className="h-4 w-4 text-slate-500" />
            Filters
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
            <Download className="h-4 w-4 text-slate-500" />
            Export
          </button>
          <Link
            href="/add-books"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            Add Book
          </Link>
        </>
      }
    >
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
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">Healthy</span>
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
      <Card
        title="Overdue’s History"
        right={<span className="text-xs text-slate-500">{OVERDUE_ROWS.length} items</span>}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
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
              {OVERDUE_ROWS.map((r, idx) => (
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
                          : "bg-emerald-50 text-emerald-700",
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
          <Link href="/checkout" className="text-xs text-slate-600 hover:text-slate-800 inline-flex items-center gap-1">
            Go to Check-out / Returns <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Card>
    </ConsoleShell>
  );
}
