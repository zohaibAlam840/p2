"use client";

import React from "react";
import { CheckCircle2, ClipboardCheck, RotateCcw, Search } from "lucide-react";
import ConsoleShell from "../_components/ConsoleShell";
import { Badge, Card, Input, PrimaryButton, SecondaryButton, Select } from "../_components/ui";

const RECENT_TXNS = [
  { id: "#48964", isbn: "3234", title: "Magnolia Palace", member: "Ali", issued: "2025-12-27", returned: "—", method: "Desk" },
  { id: "#84011", isbn: "8842", title: "Alice’s Adventures in Wonder...", member: "Cristofer Bator", issued: "2025-12-26", returned: "2025-12-27", method: "Desk" },
  { id: "#51002", isbn: "9012", title: "Treasure Island", member: "Tatiana Arcand", issued: "2025-12-25", returned: "2025-12-26", method: "Kiosk" },
];

export default function Page() {
  const [mode, setMode] = React.useState<"Issue" | "Return">("Issue");
  const [form, setForm] = React.useState({
    memberId: "",
    isbn: "",
    method: "Desk",
    dueDays: "14",
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    alert(`${mode} done (mock): ${JSON.stringify(form, null, 2)}`);
  }

  return (
    <ConsoleShell
      title="Check-out Books"
      subtitle="Issue and return books quickly (mock)."
      rightActions={
        <div className="inline-flex rounded-2xl border bg-slate-50 p-1">
          <button
            className={mode === "Issue" ? "px-3 py-1 text-xs rounded-2xl bg-white shadow-sm text-slate-900" : "px-3 py-1 text-xs rounded-2xl text-slate-600"}
            onClick={() => setMode("Issue")}
          >
            Issue
          </button>
          <button
            className={mode === "Return" ? "px-3 py-1 text-xs rounded-2xl bg-white shadow-sm text-slate-900" : "px-3 py-1 text-xs rounded-2xl text-slate-600"}
            onClick={() => setMode("Return")}
          >
            Return
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-4">
        <Card title={`${mode} Form`} right={<Badge text="Mock mode" />}>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Member ID" value={form.memberId} onChange={(e) => set("memberId", e.target.value)} placeholder="#12903" />
              <Input label="Book ISBN" value={form.isbn} onChange={(e) => set("isbn", e.target.value)} placeholder="1188" />
              <Select label="Method" value={form.method} onChange={(e) => set("method", e.target.value)}>
                <option>Desk</option>
                <option>Kiosk</option>
              </Select>

              {mode === "Issue" ? (
                <Input label="Due (days)" value={form.dueDays} onChange={(e) => set("dueDays", e.target.value)} placeholder="14" />
              ) : (
                <Input label="Condition (optional)" placeholder="Good / Damaged" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <PrimaryButton type="submit">
                <ClipboardCheck className="h-4 w-4" />
                {mode === "Issue" ? "Issue Book" : "Return Book"}
              </PrimaryButton>

              <SecondaryButton type="button" onClick={() => setForm({ memberId: "", isbn: "", method: "Desk", dueDays: "14" })}>
                <RotateCcw className="h-4 w-4 text-slate-500" />
                Reset
              </SecondaryButton>

              <SecondaryButton type="button">
                <Search className="h-4 w-4 text-slate-500" />
                Quick Find
              </SecondaryButton>
            </div>

            <div className="rounded-2xl border bg-emerald-50 p-3 text-sm text-emerald-800 inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Tip: your API can validate Member + ISBN, then create a transaction record.
            </div>
          </form>
        </Card>

        <Card title="Recent Transactions" right={<Badge text={`${RECENT_TXNS.length}`} />}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500">
                  <th className="text-left font-medium py-2">Txn</th>
                  <th className="text-left font-medium py-2">Title</th>
                  <th className="text-left font-medium py-2">Member</th>
                  <th className="text-left font-medium py-2">Issued</th>
                  <th className="text-left font-medium py-2">Returned</th>
                  <th className="text-left font-medium py-2">Method</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {RECENT_TXNS.map((r, idx) => (
                  <tr key={idx} className="text-slate-700">
                    <td className="py-2">
                      <div className="font-medium text-slate-900">{r.id}</div>
                      <div className="text-xs text-slate-500">ISBN {r.isbn}</div>
                    </td>
                    <td className="py-2">{r.title}</td>
                    <td className="py-2">{r.member}</td>
                    <td className="py-2">{r.issued}</td>
                    <td className="py-2">{r.returned}</td>
                    <td className="py-2">
                      <Badge text={r.method} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </ConsoleShell>
  );
}
