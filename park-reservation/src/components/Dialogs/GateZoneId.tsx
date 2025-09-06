"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingWrapper } from "@/components/loading/LoadingWrapper";
import { CheckCircle, XCircle } from "lucide-react";
import { useZoneGateById } from "@/hooks/admin/useGetGateZone";

interface Props {
  gateId: string;
  open: boolean;
  onClose: () => void;
}

export default function ZoneDialog({ gateId, open, onClose }: Props) {
  const { data: zones, isLoading, isError } = useZoneGateById(gateId);

  if (!gateId) return null; // prevent rendering if null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Gate <span className="font-semibold">{gateId.toUpperCase()}</span> -{" "}
            {zones ? zones.length : 0} Zone
            {zones && zones.length > 1 ? "s" : ""}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {isLoading && <LoadingWrapper />}
          {isError && <div className="text-red-500">Error loading zones.</div>}

          {zones?.map((zone) => (
            <div
              key={zone.id}
              className="p-4 border rounded-lg bg-muted/10 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {zone.open ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <XCircle className="h-5 w-5 text-danger" />
                  )}
                  <div className="text-lg font-semibold">{zone.name}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {zone.categoryId}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-sm">
                <span>Total Slots: {zone.totalSlots}</span>
                <span>Occupied: {zone.occupied}</span>
                <span>Free: {zone.free}</span>
                <span>Reserved: {zone.reserved}</span>
              </div>

              <div className="flex flex-wrap gap-3 text-sm">
                <span>Visitors: {zone.availableForVisitors}</span>
                <span>Subscribers: {zone.availableForSubscribers}</span>
              </div>

              <div className="flex flex-wrap gap-3 text-sm">
                <span>Normal Rate: ${zone.rateNormal}</span>
                <span>Special Rate: ${zone.rateSpecial}</span>
              </div>

              <Button size="sm" className="mt-2 self-start" variant="outline">
                Edit Zone
              </Button>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-4 flex justify-end">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
