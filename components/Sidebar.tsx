"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  // { href: "/dashboard/reports", label: "Reports" },
  // { href: "/dashboard/settings", label: "Settings" },
  { href: "/dashboard/integrations", label: "Integrations" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-3 py-2 rounded-lg transition-colors ${
      pathname === path
        ? "bg-[var(--accent)] text-white font-semibold"
        : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
    }`;

  return (
    <div className="w-64 h-screen overflow-y-auto bg-[var(--background)] text-[var(--foreground)] border-r border-[var(--border)] p-6">
      <nav className="space-y-2">
        {navItems.map(({ href, label }) => (
          <Link key={href} href={href} className={linkClass(href)}>
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
