"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import ConsoleShell from "../_components/ConsoleShell";
import { Badge, Card, Input, Select } from "../_components/ui";
import { useConsole } from "../_components/ConsoleContext";

const now = Date.now();
const days = (n: number) => new Date(now - n * 24 * 60 * 60 * 1000).toISOString();

import allBooksData from "../../all_library_books.json";

const ALL_BOOKS = allBooksData.books.map((b: any) => {
  let title = (b.title || "").trim();
  let author = (b.author || "").trim();
  let publisher = (b.publisher || "").trim();
  let year = b.year || "N/A";

  // If title is missing but raw is present, try to use raw
  if (!title && b.raw) {
    title = (b.raw || "").trim();
  }

  // Handle cases where title and author might be split/weirdly formatted
  // e.g., author: "Palepu, Healy", title: "and Bernard Business Analysis..."
  if (title.toLowerCase().startsWith("and ") && author) {
    const words = title.split(/\s+/);
    // Usually: and [SecondAuthor] [ActualTitle...]
    // Check if words[1] looks like a capitalized name or if author ends with a comma
    if (words.length >= 2 && (/^[A-Z]/.test(words[1]) || author.endsWith(","))) {
      author = `${author} ${words[0]} ${words[1]}`;
      title = words.slice(2).join(" ");
    } else {
      title = `${author} ${title}`;
    }
  }

  return {
    isbn: b.accession_no || "N/A",
    title: title || "Untitled",
    author: author || "Unknown",
    category: b.department || "Others",
    copies: b.copies || 1,
    available: b.copies || 1,
    publisher: publisher || "Unknown Publisher",
    year: year,
    dateAdded: b.date || new Date().toISOString(),
  };
});

export default function Page() {
  return (
    <ConsoleShell
      title="Inventory"
      subtitle="Browse catalog, availability, and shelf locations."
      rightActions={
        <>
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
      <InventoryContent />
    </ConsoleShell>
  );
}

function InventoryContent() {
  const { search: q, setSearch, category, setCategory, availability, range } = useConsole();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const now = Date.now();
  const days = (n: number) => n * 24 * 60 * 60 * 1000;
  const threshold = range === "Last 30 days" ? days(30) : days(180);

  const filtered = ALL_BOOKS.filter((b) => {
    const matchesCategory = category === "All" || b.category === category;
    const matchesQ =
      !q ||
      [b.isbn, b.title, b.author, b.shelf].join(" ").toLowerCase().includes(q.toLowerCase());

    // Simple date check if dateAdded is in DD/MM/YYYY or ISO
    const dateAddedTime = b.dateAdded.includes("/")
      ? new Date(b.dateAdded.split("/").reverse().join("-")).getTime()
      : new Date(b.dateAdded).getTime();

    const matchesRange = !b.dateAdded || dateAddedTime >= now - threshold;
    const matchesAvailability =
      availability === "All" || (availability === "Available" ? b.available > 0 : b.available === 0);

    return matchesCategory && matchesQ && matchesRange && matchesAvailability;
  });

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [q, category, availability, range]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Card
      title={<span className="text-black font-bold">Catalog</span>}
      right={<Badge text={`${filtered.length} items`} className="bg-slate-900 text-white" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Input
            value={q}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, author, keyword..."
            className="pl-4 pr-10 py-2.5 rounded-xl border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          />
        </div>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border-slate-200 py-2.5 focus:ring-2 focus:ring-slate-900 transition-all text-black font-medium"
        >
          <option>All Departments</option>
          <option>BBA</option>
          <option>BSIT</option>
          <option>Fiction</option>
          <option>Non-Fiction</option>
          <option>Children</option>
          <option>History</option>
          <option>Science</option>
          <option>Others</option>
        </Select>
        <div className="flex items-center px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-100 text-sm font-bold text-black shadow-sm transition-all hover:bg-slate-100">
          Showing {Math.min(filtered.length, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(filtered.length, currentPage * itemsPerPage)} of {filtered.length} entries
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-100 shadow-sm">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="text-left font-bold py-4 px-4 text-black uppercase tracking-wider text-[10px]">Book Information</th>
              <th className="text-left font-bold py-4 px-4 text-black uppercase tracking-wider text-[10px]">Department</th>
              <th className="text-left font-bold py-4 px-4 text-black uppercase tracking-wider text-[10px]">Inventory Status</th>
              <th className="text-right font-bold py-4 px-4 text-black" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 bg-white">
            {paginated.map((b, idx) => (
              <tr
                key={`${b.isbn}-${idx}`}
                className="group transition-colors hover:bg-slate-50/80"
              >
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-black text-base leading-tight group-hover:text-slate-900 mb-1">{b.title}</span>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 items-center">
                      <span className="text-xs text-slate-700 font-bold">
                        {b.author}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">|</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                        {b.publisher} • {b.year}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">|</span>
                      <span className="text-[10px] text-slate-500 font-mono font-bold">
                        ID: {b.isbn}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge
                    text={b.category}
                    className="bg-slate-100 text-black font-bold border-none px-2.5 py-1 text-[10px]"
                  />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Total</span>
                      <span className="text-sm font-bold text-black">{b.copies}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Live</span>
                      <span className={`text-sm font-bold ${b.available > 0 ? "text-emerald-700" : "text-rose-700"}`}>
                        {b.available}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white shadow-md hover:bg-black hover:scale-110 transition-all active:scale-95 group/btn"
                  >
                    <ArrowUpRight className="h-4 w-4 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between bg-slate-50/50 p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-sm font-bold text-black bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
            Page <span className="text-slate-500 font-medium">{currentPage}</span> of <span className="text-slate-500 font-medium">{totalPages}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="group flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-2 text-sm font-bold text-black hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-slate-200 transition-all shadow-sm active:scale-95"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="group flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-2 text-sm font-bold text-black hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black disabled:hover:border-slate-200 transition-all shadow-sm active:scale-95"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
