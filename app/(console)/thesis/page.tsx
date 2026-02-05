
"use client";
import React from "react";
import Link from "next/link";
import { FilePlus2, ClipboardCheck, ListChecks } from "lucide-react";
import ConsoleShell from "../_components/ConsoleShell";
import { Card, Badge, Pill, MiniBar } from "../_components/ui";

// Mock data for thesis dashboard
type ThesisStat = {
  label: string;
  value: number;
  sub: string;
  trend: "up" | "down";
  delta: string;
};
const THESIS_STATS: ThesisStat[] = [
  { label: "Total Theses", value: 120, sub: "All time", trend: "up", delta: "+5" },
  { label: "Issued", value: 80, sub: "This year", trend: "up", delta: "+2" },
  { label: "Pending", value: 10, sub: "Approvals", trend: "down", delta: "-1" },
  { label: "Overdue", value: 3, sub: "Control", trend: "up", delta: "+1" },
];

const RECENT_ISSUES = [
  { txn: "#T1001", thesisId: "TH-001", title: "AI in Healthcare", member: "Ali", issued: "2025-12-01", due: "2026-01-01", status: "Open" },
  { txn: "#T1002", thesisId: "TH-002", title: "Blockchain Security", member: "Fatima", issued: "2025-11-15", due: "2025-12-15", status: "Overdue" },
  { txn: "#T1003", thesisId: "TH-003", title: "Quantum Computing", member: "Mishii", issued: "2025-12-20", due: "2026-01-20", status: "Open" },
];

const PENDING = [
  { id: "P-001", title: "Edge AI Devices", student: "Sara", dept: "CS", year: "2025", status: "Pending" },
  { id: "P-002", title: "IoT Security", student: "Usman", dept: "EE", year: "2025", status: "Pending" },
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
      <ThesisContent />
    </ConsoleShell>
  );
}

import { useConsole } from "../_components/ConsoleContext";

function ThesisContent() {
  const { search } = useConsole();
  const filteredIssues = RECENT_ISSUES.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return [r.title, r.member, r.thesisId, r.txn].join(" ").toLowerCase().includes(q);
  });
  const filteredPending = PENDING.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return [r.title, r.student, r.id, r.dept].join(" ").toLowerCase().includes(q);
  });
  return (
    <>
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
        <Card title="Recent Thesis Issues" right={<Badge text={`${filteredIssues.length} txns`} />}>
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
                {filteredIssues.map((r) => (
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
                          r.status === "Overdue"
                            ? "bg-rose-50 text-rose-700"
                            : r.status === "Open"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-800",
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
        </Card>

        <Card title="Pending Approvals" right={<Badge text={`${filteredPending.length} pending`} />}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500">
                  <th className="text-left font-medium py-2">ID</th>
                  <th className="text-left font-medium py-2">Title</th>
                  <th className="text-left font-medium py-2">Student</th>
                  <th className="text-left font-medium py-2">Dept</th>
                  <th className="text-left font-medium py-2">Year</th>
                  <th className="text-left font-medium py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredPending.map((r) => (
                  <tr key={r.id} className="text-slate-700">
                    <td className="py-2">
                      <div className="font-medium text-slate-900">{r.id}</div>
                    </td>
                    <td className="py-2">{r.title}</td>
                    <td className="py-2">{r.student}</td>
                    <td className="py-2">{r.dept}</td>
                    <td className="py-2">{r.year}</td>
                    <td className="py-2">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
