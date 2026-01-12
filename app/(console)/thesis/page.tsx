"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, FilePlus2, ClipboardCheck, ListChecks } from "lucide-react";
import ConsoleShell from "../_components/ConsoleShell";
import { Badge, Card, MiniBar, Pill } from "../_components/ui";

const THESIS_STATS = [
  { label: "Total Theses", value: "4,120", delta: "+4%", trend: "up" as const, sub: "catalog growth" },
  { label: "Issued", value: "186", delta: "+9%", trend: "up" as const, sub: "last 30 days" },
  { label: "Overdue", value: "14", delta: "+2", trend: "up" as const, sub: "needs follow-up" },
  { label: "Pending Approval", value: "7", delta: "-1", trend: "down" as const, sub: "submission queue" },
];

const PENDING = [
  { id: "T-2025-091", title: "Blockchain-based Archiving", student: "Ayesha Khalid", dept: "CS", year: "2025", status: "Supervisor review" },
  { id: "T-2025-077", title: "Water Quality Prediction", student: "Hassan Raza", dept: "Env", year: "2025", status: "LSIT LIBRARY verification" },
];

const RECENT_ISSUES = [
  { txn: "TX-3901", thesisId: "T-2024-018", title: "NLP for Urdu", member: "#22391", issued: "2025-12-28", due: "2026-01-04", status: "Open" },
  { txn: "TX-3897", thesisId: "T-2023-122", title: "Supply Chain Analytics", member: "#12903", issued: "2025-12-27", due: "2026-01-03", status: "Overdue" },
];

export default function Page() {
  return (
    <ConsoleShell
      title="Thesis Management"
      subtitle="Track thesis submissions, approvals, issuance, and overdue control."
      rightActions={
        <>
          <Link
            href="/thesis/add"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
          >
            <FilePlus2 className="h-4 w-4" />
            Add Thesis
          </Link>
          <Link
            href="/thesis/issue"
            className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <ClipboardCheck className="h-4 w-4 text-slate-500" />
            Issue Thesis
          </Link>
          <Link
            href="/thesis/records"
            className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <ListChecks className="h-4 w-4 text-slate-500" />
            Records
          </Link>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {THESIS_STATS.map((s, idx) => (
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
              <MiniBar value={idx % 2 === 0 ? 70 - idx * 3 : 52 + idx * 4} />
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span>Control</span>
                <span>{idx === 2 ? "Watchlist" : "Stable"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-4">
        <Card title="Recent Thesis Issues" right={<Badge text={`${RECENT_ISSUES.length} txns`} />}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500">
                  <th className="text-left font-medium py-2">Txn</th>
                  <th className="text-left font-medium py-2">Thesis</th>
                  <th className="text-left font-medium py-2">Member</th>
                  <th className="text-left font-medium py-2">Issued</th>
                  <th className="text-left font-medium py-2">Due</th>
                  <th className="text-left font-medium py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {RECENT_ISSUES.map((r) => (
                  <tr key={r.txn} className="text-slate-700">
                    <td className="py-2">
                      <div className="font-medium text-slate-900">{r.txn}</div>
                      <div className="text-xs text-slate-500">{r.thesisId}</div>
                    </td>
                    <td className="py-2">{r.title}</td>
                    <td className="py-2">{r.member}</td>
                    <td className="py-2">{r.issued}</td>
                    <td className="py-2">{r.due}</td>
                    <td className="py-2">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          r.status === "Overdue" ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700",
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
            <Link href="/thesis/records" className="text-xs text-slate-600 hover:text-slate-800 inline-flex items-center gap-1">
              Open records <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Card>

        <Card title="Pending Submissions" right={<Badge text={`${PENDING.length} items`} />}>
          <div className="space-y-3">
            {PENDING.map((p) => (
              <div key={p.id} className="rounded-2xl border p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{p.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {p.id} • {p.student} • {p.dept} • {p.year}
                    </div>
                  </div>
                  <Badge text={p.status} />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button className="rounded-xl border bg-white px-3 py-2 text-xs hover:bg-slate-50">Approve</button>
                  <button className="rounded-xl border bg-white px-3 py-2 text-xs hover:bg-slate-50">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </ConsoleShell>
  );
}
