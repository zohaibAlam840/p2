"use client";

import React from "react";
import { Plus, Upload } from "lucide-react";
import ConsoleShell from "../_components/ConsoleShell";
import { Card, Input, PrimaryButton, SecondaryButton, Select, TextArea } from "../_components/ui";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../lib/authContext";

export default function Page() {
  const { user } = useAuth();
  const [form, setForm] = React.useState({
    isbn: "",
    title: "",
    author: "",
    publisher: "",
    year: "",
    category: "Fiction",
    copies: "1",
    shelf: "",
    notes: "",
  });
  const [saving, setSaving] = React.useState(false);
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await addDoc(collection(db, "books"), {
        isbn: form.isbn.trim(),
        title: form.title.trim(),
        author: form.author.trim(),
        publisher: form.publisher.trim(),
        year: form.year.trim(),
        category: form.category,
        copies: parseInt(form.copies) || 1,
        available: parseInt(form.copies) || 1,
        shelf: form.shelf.trim(),
        notes: form.notes.trim(),
        addedAt: serverTimestamp(),
        addedBy: user?.role === "admin" ? user.email : "admin",
      });
      setSuccess(`"${form.title}" has been added to the library.`);
      setForm({ isbn: "", title: "", author: "", publisher: "", year: "", category: "Fiction", copies: "1", shelf: "", notes: "" });
    } catch (err) {
      setError("Failed to save book. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <ConsoleShell
      title="Add Books"
      subtitle="Add books to the library database."
      rightActions={
        <SecondaryButton type="button">
          <Upload className="h-4 w-4" />
          Batch Import
        </SecondaryButton>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-4">
        <Card title="Add Book Form">
          {success && (
            <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="ISBN / Accession No."
                value={form.isbn}
                onChange={(e) => set("isbn", e.target.value)}
                placeholder="978... or ACC-001"
              />
              <Input
                label="Copies"
                value={form.copies}
                onChange={(e) => set("copies", e.target.value)}
                placeholder="1"
                type="number"
              />
              <Input
                label="Title *"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Book title"
              />
              <Input
                label="Author"
                value={form.author}
                onChange={(e) => set("author", e.target.value)}
                placeholder="Author name"
              />
              <Input
                label="Publisher"
                value={form.publisher}
                onChange={(e) => set("publisher", e.target.value)}
                placeholder="Publisher name"
              />
              <Input
                label="Year"
                value={form.year}
                onChange={(e) => set("year", e.target.value)}
                placeholder="2024"
              />
              <Select label="Category / Department" value={form.category} onChange={(e) => set("category", e.target.value)}>
                <option>BBA</option>
                <option>BSIT</option>
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Children</option>
                <option>History</option>
                <option>Science</option>
                <option>Others</option>
              </Select>
              <Input
                label="Shelf / Rack"
                value={form.shelf}
                onChange={(e) => set("shelf", e.target.value)}
                placeholder="A-12"
              />
            </div>

            <TextArea
              label="Notes"
              rows={3}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Optional notes"
            />

            <div className="flex flex-wrap items-center gap-2">
              <PrimaryButton type="submit" disabled={saving}>
                <Plus className="h-4 w-4" />
                {saving ? "Saving…" : "Add Book"}
              </PrimaryButton>

              <SecondaryButton
                type="button"
                onClick={() =>
                  setForm({ isbn: "", title: "", author: "", publisher: "", year: "", category: "Fiction", copies: "1", shelf: "", notes: "" })
                }
              >
                Reset
              </SecondaryButton>
            </div>
          </form>
        </Card>

        <Card title="Tips">
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
            <li>Books saved here appear instantly in Inventory.</li>
            <li>Use shelf codes so books can be located quickly.</li>
            <li>ISBN is optional but helps identify books uniquely.</li>
            <li>Copies count sets the initial available count.</li>
          </ul>
        </Card>
      </div>
    </ConsoleShell>
  );
}
