"use client";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import useZone from "@/hooks/useZone";
import useCategories from "@/hooks/useCategories";
import Stats from "@/components/dashboardStats/Stats";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingWrapper } from "@/components/loading/LoadingWrapper";
import { ErrorWrapper } from "@/components/error/ErrorWrapper";
import { ParkingStats } from "@/types/DashboardStats";
import { ZoneData } from "@/types/Zone";
import useGates from "@/hooks/useGates";
import GatesCard from "@/components/ui/GatesCard";
import { AxiosError } from "axios";

const Dashboard = () => {
  const { Zones, ZonesError, ZonesLoading, ZonesAgain, isZonesError } =
    useZone();
  const { Cats, CatsLoading, CatsError, isCatsError, CatsAgain } =
    useCategories();
  const { Gates, GatesError, GatesLoading, GatesAgain, isGatesError } =
    useGates();
  const onRetryGates = () => {
    GatesAgain();
  };
  const onRetryZones = () => {
    ZonesAgain();
  };
  const onRetryCats = () => {
    CatsAgain();
  };
  // Calculate stats from real data
  const stats: ParkingStats = useMemo(() => {
    if (!Zones)
      return {
        totalSpaces: 0,
        occupiedSpaces: 0,
        availableSpaces: 0,
        reservedSpaces: 0,
        maintenanceSpaces: 0,
      };

    return {
      totalSpaces: Zones.reduce((sum, z) => sum + z.totalSlots, 0),
      occupiedSpaces: Zones.reduce((sum, z) => sum + z.occupied, 0),
      availableSpaces: Zones.reduce((sum, z) => sum + z.free, 0),
      reservedSpaces: Zones.reduce((sum, z) => sum + z.reserved, 0),
      maintenanceSpaces: Zones.filter((z) => !z.open).reduce(
        (sum, z) => sum + z.totalSlots,
        0
      ),
    };
  }, [Zones]);
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  const getZoneStatusIcon = (zone: ZoneData) => {
    if (!zone.open) {
      return <XCircle className="h-4 w-4 text-danger" />;
    }
    return <CheckCircle className="h-4 w-4 text-success" />;
  };

  const getZoneOccupancyColor = (occupied: number, total: number) => {
    const rate = occupied / total;
    if (rate >= 0.9) return "text-danger";
    if (rate >= 0.7) return "text-warning";
    return "text-success";
  };

  const getCategoryName = (categoryId: string) => {
    return Cats?.find((cat) => cat.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time parking system overview
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Last updated: {time}
        </div>
      </div>
      {isZonesError && (
        <ErrorWrapper error={ZonesError} onRetry={onRetryZones} />
      )}
      {ZonesLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-gradient-card shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-20 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Stats stats={stats} />
      {/* Zone Overview */}
      {isCatsError && <ErrorWrapper error={CatsError} onRetry={onRetryCats} />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Zone Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ZonesLoading ? (
                <LoadingWrapper />
              ) : (
                Zones?.map((zone) => (
                  <div
                    key={zone.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getZoneStatusIcon(zone)}
                      <div>
                        <div className="font-medium">{zone.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {CatsLoading && <LoadingWrapper />}
                          {getCategoryName(zone.categoryId)} •{" "}
                          {zone.open ? "Open" : "Closed"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-semibold ${getZoneOccupancyColor(
                          zone.occupied,
                          zone.totalSlots
                        )}`}
                      >
                        {zone.occupied}/{zone.totalSlots}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        spaces
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <GatesCard
          Gates={Gates || []}
          GatesError={GatesError instanceof AxiosError ? GatesError : null}
          GatesLoading={GatesLoading}
          Zones={Zones || []}
          isGatesError={isGatesError}
          onRetryGates={onRetryGates}
        />
      </div>
    </div>
  );
};

export default Dashboard;
