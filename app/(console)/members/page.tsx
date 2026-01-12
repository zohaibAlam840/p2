"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, UserCheck, UserX } from "lucide-react";
import ConsoleShell from "../_components/ConsoleShell";
import { Badge, Card } from "../_components/ui";

const MEMBERS = [
  { id: "#12903", name: "mishii", type: "Student", status: "Active", joined: "2025-09-12", openLoans: 2, overdue: 1 },
  { id: "#22391", name: "Fatima", type: "Faculty", status: "Active", joined: "2025-07-03", openLoans: 1, overdue: 0 },
  { id: "#48964", name: "Ali", type: "Student", status: "Hold", joined: "2025-10-21", openLoans: 3, overdue: 2 },
  { id: "#77102", name: "Muhammad", type: "Visitor", status: "Active", joined: "2025-12-01", openLoans: 1, overdue: 0 },
];

export default function Page() {
  return (
    <ConsoleShell
      title="Members"
      subtitle="Manage member profiles, status, and circulation risk."
      rightActions={
        <Link
          href="/members/new"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          Add Member
        </Link>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.7fr] gap-4">
        <Card title="Member Directory" right={<Badge text={`${MEMBERS.length} records`} />}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500">
                  <th className="text-left font-medium py-2">Member</th>
                  <th className="text-left font-medium py-2">Type</th>
                  <th className="text-left font-medium py-2">Joined</th>
                  <th className="text-left font-medium py-2">Open Loans</th>
                  <th className="text-left font-medium py-2">Overdue</th>
                  <th className="text-left font-medium py-2">Status</th>
                  <th className="text-left font-medium py-2" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {MEMBERS.map((m) => (
                  <tr key={m.id} className="text-slate-700">
                    <td className="py-2">
                      <div className="font-medium text-slate-900">{m.name}</div>
                      <div className="text-xs text-slate-500">{m.id}</div>
                    </td>
                    <td className="py-2">{m.type}</td>
                    <td className="py-2">{m.joined}</td>
                    <td className="py-2">{m.openLoans}</td>
                    <td className="py-2">{m.overdue}</td>
                    <td className="py-2">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          m.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800",
                        ].join(" ")}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="py-2">
                      <Link
                        href="#"
                        className="text-xs text-slate-600 hover:text-slate-800 inline-flex items-center gap-1"
                      >
                        View <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Quick Actions">
          <div className="grid grid-cols-1 gap-2">
            <button className="rounded-xl border bg-white px-3 py-2 text-sm hover:bg-slate-50 inline-flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-slate-500" />
              Activate Member
            </button>
            <button className="rounded-xl border bg-white px-3 py-2 text-sm hover:bg-slate-50 inline-flex items-center gap-2">
              <UserX className="h-4 w-4 text-slate-500" />
              Put Member on Hold
            </button>
          </div>

          <div className="mt-4 text-xs text-slate-500">
            This is mock UI only. Wire actions to your API later.
          </div>
        </Card>
      </div>
    </ConsoleShell>
  );
}
