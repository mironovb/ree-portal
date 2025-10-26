import { Button } from "@/components/ui/button";
import WaitlistForm from "@/components/waitlist-form";

export default function HomePage() {
  return (
    <section className="py-20">
      <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
        Rare-earth prices, policy overlays, and a path to buy.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Track regional spreads, export controls, and verified suppliers in one
        place. No payments yet—preview the dashboard below.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <a href="/dashboard">Open dashboard (preview)</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="#contact">Join waitlist</a>
        </Button>
      </div>

      <div id="contact" className="mt-20 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold">What you’ll get</h2>
          <ul className="mt-3 list-disc pl-5 text-muted-foreground">
            <li>Regional price curves (mock data today)</li>
            <li>Tariff & export-control overlays</li>
            <li>RFQ workflow (coming soon)</li>
          </ul>
        </div>
        <WaitlistForm />
      </div>
    </section>
  );
}
