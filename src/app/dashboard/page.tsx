"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PricePanel from "./price-panel";
import CompliancePanel from "./compliance-panel";
import MapPanel from "./map-panel";

export default function Dashboard() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <Tabs defaultValue="prices" className="space-y-6">
        <TabsList>
          <TabsTrigger value="prices">Prices</TabsTrigger>
          <TabsTrigger value="map">Policy Map</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="prices"><PricePanel/></TabsContent>
        <TabsContent value="map"><MapPanel/></TabsContent>
        <TabsContent value="compliance"><CompliancePanel/></TabsContent>
      </Tabs>
    </section>
  );
}
