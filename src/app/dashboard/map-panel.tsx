export default function MapPanel(){
  return (
    <div className="rounded-lg border border-border p-6 text-sm">
      <p className="text-muted-foreground">
        Policy Map placeholder — show tariff/export-control overlays by region.
      </p>
      <ul className="mt-3 list-disc pl-5">
        <li>Tariffs: highlight lanes (CN→US, CN→EU)</li>
        <li>Export controls: license-required markers</li>
        <li>Basis: show EU CIF vs CN FOB spread</li>
      </ul>
    </div>
  );
}
