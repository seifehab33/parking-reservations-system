"use client";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Search,
  Car,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";
import useZone from "@/hooks/useZone";
import useCategories from "@/hooks/useCategories";
import { ZoneData } from "@/types/Zone";
import { LoadingWrapper } from "@/components/loading/LoadingWrapper";

const Zones = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { Zones, ZonesLoading } = useZone();

  const { Cats } = useCategories();

  const getCategoryName = (categoryId: string) => {
    return Cats?.find((cat) => cat.id === categoryId)?.name || categoryId;
  };

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case "cat_vip":
        return "bg-primary text-primary-foreground";
      case "cat_premium":
        return "bg-warning text-warning-foreground";
      case "cat_regular":
        return "bg-secondary text-secondary-foreground";
      case "cat_economy":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getZoneStatusIcon = (zone: ZoneData) => {
    if (!zone.open) {
      return <XCircle className="h-4 w-4 text-danger" />;
    }
    return <CheckCircle className="h-4 w-4 text-success" />;
  };

  const getOccupancyColor = (occupied: number, total: number) => {
    const rate = occupied / total;
    if (rate >= 0.9) return "text-danger";
    if (rate >= 0.7) return "text-warning";
    return "text-success";
  };

  const getOccupancyProgress = (occupied: number, total: number) => {
    return Math.round((occupied / total) * 100);
  };

  const filteredZones = useMemo(() => {
    return Zones?.filter((zone) => {
      const matchesSearch =
        zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        zone.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || zone.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, Zones]);

  const uniqueCategories = useMemo(() => {
    return [...new Set(Zones?.map((zone) => zone.categoryId))];
  }, [Zones]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parking Zones</h1>
          <p className="text-muted-foreground">
            Manage and monitor all parking zones
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {filteredZones?.length} zones
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search zones..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map((categoryId) => (
              <option key={categoryId} value={categoryId}>
                {getCategoryName(categoryId)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ZonesLoading ? (
          <LoadingWrapper />
        ) : (
          filteredZones?.map((zone) => (
            <Card
              key={zone.id}
              className="bg-gradient-card shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {zone.name}
                  </CardTitle>
                  {getZoneStatusIcon(zone)}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`text-xs ${getCategoryColor(zone.categoryId)}`}
                  >
                    {getCategoryName(zone.categoryId)}
                  </Badge>
                  <StatusBadge
                    variant={zone.open ? "available" : "maintenance"}
                    className="text-xs"
                  >
                    {zone.open ? "Open" : "Closed"}
                  </StatusBadge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Occupancy
                    </span>
                    <span
                      className={`text-sm font-medium ${getOccupancyColor(
                        zone.occupied,
                        zone.totalSlots
                      )}`}
                    >
                      {zone.occupied}/{zone.totalSlots}
                    </span>
                  </div>
                  <Progress
                    value={getOccupancyProgress(zone.occupied, zone.totalSlots)}
                    className="h-2"
                  />
                </div>

                {/* Space Details */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-success" />
                    <span className="text-muted-foreground">Free:</span>
                    <span className="font-medium text-success">
                      {zone.free}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-danger" />
                    <span className="text-muted-foreground">Occupied:</span>
                    <span className="font-medium text-danger">
                      {zone.occupied}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <span className="text-muted-foreground">Reserved:</span>
                    <span className="font-medium text-warning">
                      {zone.reserved}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Gates:</span>
                    <span className="font-medium">{zone.gateIds.length}</span>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      Rates (per hour)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Normal:</span>
                      <span className="font-medium ml-1">
                        ${zone.rateNormal}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Special:</span>
                      <span className="font-medium ml-1">
                        ${zone.rateSpecial}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Visitors:</span>
                      <span className="font-medium">
                        {zone.availableForVisitors} available
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Subscribers:
                      </span>
                      <span className="font-medium">
                        {zone.availableForSubscribers} available
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {filteredZones?.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No zones found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Zones;
