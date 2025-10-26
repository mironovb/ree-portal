import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page you’re looking for doesn’t exist.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md border border-border px-4 py-2 hover:bg-secondary"
      >
        Go home
      </Link>
    </section>
  );
}
