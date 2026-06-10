"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/", label: "Overview" },
  { href: "/patients", label: "Patients" },
  { href: "/workflows", label: "Workflows" },
  { href: "/traces", label: "Traces" },
  { href: "/agents", label: "Agents" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071119]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:px-8 lg:px-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-cyan-200/80">CareFlow Nexus</p>
          <p className="mt-1 text-sm text-slate-300">Multi-agent healthcare intelligence platform</p>
        </div>

        <nav className="flex flex-wrap gap-2">
          {navigationItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-cyan-400/15 text-cyan-100 ring-1 ring-inset ring-cyan-400/30"
                    : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}