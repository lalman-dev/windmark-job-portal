"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="container mx-auto flex max-w-7xl items-center justify-between py-6 px-4">
        <h1 className="text-xl font-semibold tracking-tight">
          Windmark Job Portal
        </h1>
        <ThemeToggle />
      </header>

      {/* Hero */}
      <section className="container mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Discover Opportunities That Match Your Skills
        </h2>

        <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
          Filter, sort, and explore job listings with powerful tools designed
          for efficiency and clarity.
        </p>

        <div className="mt-8">
          <Link href="/jobs">
            <Button size="lg">Browse Jobs</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        Built with Next.js, TypeScript, and Tailwind CSS
      </footer>
    </main>
  );
}
