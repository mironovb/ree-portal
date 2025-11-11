"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={
        "hover:underline " +
        (active ? "font-semibold underline underline-offset-4" : "")
      }
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export default function HeaderNav() {
  return (
    <div className="flex items-center gap-4">
      <nav className="flex gap-6 text-sm">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/prices">Price boards</NavLink>
        <NavLink href="/rfq/new">RFQ</NavLink>
      </nav>
      <ThemeToggle />
    </div>
  );
}
