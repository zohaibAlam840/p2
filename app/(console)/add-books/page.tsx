"use client";

import React from "react";
import { Plus, Upload } from "lucide-react";
import ConsoleShell from "../_components/ConsoleShell";
import { Card, Input, PrimaryButton, SecondaryButton, Select, TextArea } from "../_components/ui";
import { ArrowUpRight, Download} from "lucide-react";


export default function Page() {
  const [form, setForm] = React.useState({
    isbn: "",
    title: "",
    author: "",
    category: "Fiction",
    copies: "1",
    shelf: "",
    notes: "",
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Book added (mock): ${JSON.stringify(form, null, 2)}`);
  }

  return (
    <ConsoleShell
      title="Add Books"
      subtitle="Add individual books or import a batch (mock)."
      rightActions={
        <SecondaryButton type="button">
          <Upload className="h-4 w-4" />
          Batch Import
        </SecondaryButton>
        
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-4">
        <Card title="Add Book Form">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="ISBN" value={form.isbn} onChange={(e) => set("isbn", e.target.value)} placeholder="978..." />
              <Input label="Copies" value={form.copies} onChange={(e) => set("copies", e.target.value)} placeholder="1" />
              <Input label="Title" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Book title" />
              <Input label="Author" value={form.author} onChange={(e) => set("author", e.target.value)} placeholder="Author name" />

              <Select label="Category" value={form.category} onChange={(e) => set("category", e.target.value)}>
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Children</option>
                <option>History</option>
                <option>Science</option>
                <option>Others</option>
              </Select>

              <Input label="Shelf / Rack" value={form.shelf} onChange={(e) => set("shelf", e.target.value)} placeholder="A-12" />
            </div>

            <TextArea label="Notes" rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Optional" />

            <div className="flex flex-wrap items-center gap-2">
              <PrimaryButton type="submit">
                <Plus className="h-4 w-4" />
                Add Book
              </PrimaryButton>

              <SecondaryButton
                type="button"
                onClick={() =>
                  setForm({ isbn: "", title: "", author: "", category: "Fiction", copies: "1", shelf: "", notes: "" })
                }
              >
                Reset
              </SecondaryButton>
            </div>
          </form>
        </Card>

        <Card title="Hints (mock)">
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
            <li>Keep ISBN unique (for your API later).</li>
            <li>Use shelf codes so inventory can be located quickly.</li>
            <li>Batch import can accept CSV later.</li>
            <button className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
            <Download className="h-4 w-4 text-slate-500" />
            Export
          </button>
          </ul>
        </Card>
      </div>
    </ConsoleShell>
  );
}
