export default function CompliancePanel(){
  return (
    <div className="rounded-lg border border-border p-6 text-sm">
      <p className="text-muted-foreground">
        Compliance checklist placeholder — automate KYC/sanctions/end-use attestations.
      </p>
      <ol className="mt-3 list-decimal pl-5">
        <li>Counterparty verification</li>
        <li>Export license screening</li>
        <li>Sanctions & end-use statements</li>
        <li>Audit pack export (PDF)</li>
      </ol>
    </div>
  );
}
