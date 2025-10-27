import QuoteHome from "@/components/quote/quote-home";
import WaitlistForm from "@/components/waitlist-form";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="py-10">
      <QuoteHome />
      <div className="mt-16 grid md:grid-cols-2 gap-8" id="contact">
        <div>
          <h2 className="text-2xl font-semibold">What you’ll get</h2>
          <ul className="mt-3 list-disc pl-5 text-muted-foreground">
            <li>Tariff-aware price routes by destination</li>
            <li>Regional price curves and spreads</li>
            <li>Compliance overlays (export controls, tariffs)</li>
          </ul>
          <div className="mt-5">
            <Button asChild variant="outline"><a href="/dashboard">Open dashboard</a></Button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Join the waitlist</h2>
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
