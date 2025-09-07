"use client";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Car, Users, Clock } from "lucide-react";
import useOpenZone from "@/hooks/admin/useOpenZone";
import useZone from "@/hooks/useZone";
import { LoadingWrapper } from "@/components/loading/LoadingWrapper";
import { useZonesStore } from "@/store/zonesStore";
import { ZoneData } from "@/types/Zone";
import { ErrorWrapper } from "@/components/error/ErrorWrapper";

const ZoneManagement = () => {
  const { Zones, ZonesLoading, ZonesError, ZonesAgain } = useZone();
  const { zones, setZones } = useZonesStore();
  const toggleMutation = useOpenZone();

  // Initialize store once data is loaded
  useEffect(() => {
    if (Zones) setZones(Zones);
  }, [Zones, setZones]);

  // Handler to toggle zone open/close
  const handleToggleZone = (zone: ZoneData) => {
    toggleMutation.mutate({
      zoneId: zone.id,
      zoneName: zone.name,
      newOpen: !zone.open,
    });
  };

  // Helper to get occupancy color
  const getOccupancyColor = (occupied: number, total: number) => {
    const rate = occupied / total;
    if (rate >= 0.9) return "text-danger";
    if (rate >= 0.7) return "text-warning";
    return "text-success";
  };

  // Render a single zone card
  const renderZoneCard = (zone: ZoneData) => {
    const occupancyPercent = (zone.occupied / zone.totalSlots) * 100;

    return (
      <Card
        key={zone.id}
        className="bg-gradient-card shadow-md hover:shadow-lg transition-shadow"
      >
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{zone.name}</CardTitle>
          {zone.open ? (
            <CheckCircle className="h-5 w-5 text-success" />
          ) : (
            <XCircle className="h-5 w-5 text-danger" />
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Occupancy */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Occupied / Total</span>
              <span
                className={`font-medium ${getOccupancyColor(
                  zone.occupied,
                  zone.totalSlots
                )}`}
              >
                {zone.occupied}/{zone.totalSlots}
              </span>
            </div>
            <Progress value={occupancyPercent} className="h-2" />
          </div>

          {/* Spaces */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Car className="h-4 w-4 text-success" />
              Free:{" "}
              <span className="font-medium text-success">{zone.free}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-danger" />
              Occupied:{" "}
              <span className="font-medium text-danger">{zone.occupied}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-warning" />
              Reserved:{" "}
              <span className="font-medium text-warning">{zone.reserved}</span>
            </div>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium">Open / Close Management</span>
            <Switch
              checked={zone.open}
              onCheckedChange={() => handleToggleZone(zone)}
              disabled={toggleMutation.isPending}
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  if (ZonesLoading) return <LoadingWrapper />;
  if (ZonesError)
    return <ErrorWrapper onRetry={ZonesAgain} error={ZonesError} />;

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold text-center">Zone Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map(renderZoneCard)}
      </div>
    </div>
  );
};

export default ZoneManagement;
