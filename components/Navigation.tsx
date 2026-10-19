import Link from "next/link";

export function Navigation() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold text-slate-900">
          HelpDesk.Miami Portal
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link href="/">Home</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/dashboard">Member Dashboard</Link>
        </div>
      </nav>
    </header>
  );
}
