import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import HeaderNav from "@/components/header-nav";

export const metadata: Metadata = {
  title: "REE Portal",
  description: "Rare-earth prices, policy overlays, and a path to buy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen bg-background text-foreground">
          <header className="border-b border-border">
            <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={32}
                  height={32}
                  priority
                />
                <span className="text-sm text-muted-foreground">β</span>
              </div>
              <HeaderNav />
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4">{children}</main>
          <footer className="mt-16 border-t border-border">
            <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground">
              © {new Date().getFullYear()} — All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
