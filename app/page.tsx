import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 grid place-items-center p-6">
      <div className="w-full max-w-lg rounded-2xl border bg-white shadow-sm p-6">
        <div className="text-xl font-semibold text-slate-900">LSIT LIBRARY</div>
        <div className="mt-1 text-sm text-slate-600">
          Welcome. Open the operations console to manage circulation and theses.
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95"
          >
            Librarian Console
          </Link>
          <Link
            href="/student"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 border border-indigo-500"
          >
            Student Portal
          </Link>
          <Link
            href="/help"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
          >
            Help & Support
          </Link>
        </div>
      </div>
    </div>
  );
}
