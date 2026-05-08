"use client";

import React from "react";
import Link from "next/link";
import { Plus, Trash2, UserCheck, UserX } from "lucide-react";
import ConsoleShell from "../_components/ConsoleShell";
import { Badge, Card } from "../_components/ui";
import { useConsole } from "../_components/ConsoleContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

type Member = {
  id: string;
  studentId: string;
  name: string;
  type: string;
  department: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  createdAt?: { seconds: number };
};

export default function Page() {
  return (
    <ConsoleShell
      title="Members"
      subtitle="Manage member profiles, status, and circulation."
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
      <MembersContent />
    </ConsoleShell>
  );
}

function MembersContent() {
  const { search } = useConsole();
  const [members, setMembers] = React.useState<Member[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const [deleting, setDeleting] = React.useState<string | null>(null);
  const [toggling, setToggling] = React.useState<string | null>(null);

  React.useEffect(() => {
    const q = query(collection(db, "students"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMembers(
        snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Member, "id">) }))
      );
      setLoadingData(false);
    });
    return unsubscribe;
  }, []);

  const filtered = members.filter((m) =>
    !search ||
    [m.name, m.studentId, m.type, m.department, m.email]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Remove "${name}" from the library? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteDoc(doc(db, "students", id));
    } finally {
      setDeleting(null);
    }
  }

  async function handleToggleStatus(id: string, currentStatus: string) {
    const next = currentStatus === "active" ? "inactive" : "active";
    setToggling(id);
    try {
      await updateDoc(doc(db, "students", id), { status: next });
    } finally {
      setToggling(null);
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.7fr] gap-4">
      <Card
        title="Member Directory"
        right={
          <Badge
            text={`${filtered.length} member${filtered.length !== 1 ? "s" : ""}`}
            className="bg-slate-900 text-white"
          />
        }
      >
        {loadingData ? (
          <div className="py-8 text-center text-sm text-slate-400">Loading members…</div>
        ) : filtered.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-slate-500 mb-2">
              {search ? "No members match your search." : "No members added yet."}
            </p>
            {!search && (
              <Link href="/members/new" className="text-sm text-sky-700 font-semibold hover:underline">
                Add your first member →
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-xs text-slate-500 border-b">
                  <th className="text-left font-medium py-2 pb-3">Member</th>
                  <th className="text-left font-medium py-2 pb-3">Type</th>
                  <th className="text-left font-medium py-2 pb-3">Department</th>
                  <th className="text-left font-medium py-2 pb-3">Contact</th>
                  <th className="text-left font-medium py-2 pb-3">Status</th>
                  <th className="text-left font-medium py-2 pb-3" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((m) => (
                  <tr key={m.id} className="text-slate-700 hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 pr-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-sky-100 text-sky-700 grid place-items-center text-xs font-bold flex-shrink-0">
                          {m.name[0]?.toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 leading-tight">{m.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{m.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-2 text-xs text-slate-600">{m.type}</td>
                    <td className="py-3 pr-2 text-xs text-slate-600">{m.department || "—"}</td>
                    <td className="py-3 pr-2">
                      <div className="text-xs text-slate-600">{m.email || "—"}</div>
                      <div className="text-[11px] text-slate-400">{m.phone || ""}</div>
                    </td>
                    <td className="py-3 pr-2">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          m.status === "active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-800",
                        ].join(" ")}
                      >
                        {m.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleToggleStatus(m.id, m.status)}
                          disabled={toggling === m.id}
                          title={m.status === "active" ? "Put on Hold" : "Activate"}
                          className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all disabled:opacity-50"
                        >
                          {m.status === "active"
                            ? <UserX className="h-3.5 w-3.5" />
                            : <UserCheck className="h-3.5 w-3.5" />}
                        </button>
                        <button
                          onClick={() => handleDelete(m.id, m.name)}
                          disabled={deleting === m.id}
                          title="Delete member"
                          className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all disabled:opacity-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title="Quick Stats">
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-slate-600">Total Members</span>
            <span className="text-sm font-bold text-slate-900">{members.length}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-slate-600">Active</span>
            <span className="text-sm font-bold text-emerald-700">
              {members.filter((m) => m.status === "active").length}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-slate-600">Inactive / Hold</span>
            <span className="text-sm font-bold text-amber-700">
              {members.filter((m) => m.status !== "active").length}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-slate-600">Students</span>
            <span className="text-sm font-bold text-slate-900">
              {members.filter((m) => m.type === "Student").length}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-slate-600">Faculty / Staff</span>
            <span className="text-sm font-bold text-slate-900">
              {members.filter((m) => m.type !== "Student" && m.type !== "Visitor").length}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <Link
            href="/members/new"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-black transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add New Member
          </Link>
        </div>
      </Card>
    </div>
  );
}
