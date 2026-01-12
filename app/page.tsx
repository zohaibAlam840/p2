import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 grid place-items-center p-6">
      <div className="w-full max-w-lg rounded-2xl border bg-white shadow-sm p-6">
        <div className="text-xl font-semibold text-slate-900">LSIT LIBRARY App</div>
        <div className="mt-1 text-sm text-slate-600">
          Welcome. Open the operations console to manage circulation and theses.
        </div>

        <div className="mt-5 flex gap-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/help"
            className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Help
          </Link>
        </div>
      </div>
    </div>
  );
}
