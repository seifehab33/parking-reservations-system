"use client";

import GateCheckIn from "@/components/tabs/CheckIn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CheckIn_Out() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab") || "checkin";
  const [tab, setTab] = useState(tabParam);

  useEffect(() => {
    setTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    setTab(value);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-200">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Entry & Exit Dashboard
      </h1>

      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
          <TabsTrigger value="checkin">Check-In</TabsTrigger>
          <TabsTrigger value="checkout">Check-Out</TabsTrigger>
        </TabsList>

        <TabsContent value="checkin" className="mt-4">
          <GateCheckIn />
        </TabsContent>

        <TabsContent value="checkout" className="mt-4">
          <div className="text-gray-500 text-center py-12 border rounded-xl bg-gray-50">
            🚪 Checkout flow coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CheckIn_Out;
