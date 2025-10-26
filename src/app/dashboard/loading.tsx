export default function Loading() {
  return (
    <section className="py-10">
      <div className="animate-pulse space-y-4">
        <div className="h-7 w-48 rounded-md bg-muted" />
        <div className="h-10 w-72 rounded-md bg-muted" />
        <div className="h-64 w-full rounded-md bg-muted" />
      </div>
    </section>
  );
}
