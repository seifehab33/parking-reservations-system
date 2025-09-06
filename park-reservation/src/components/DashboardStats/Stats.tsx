import React from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Clock, TrendingUp, Users } from "lucide-react";
import { ParkingStats } from "@/types/DashboardStats";
interface StatsProps {
  stats: ParkingStats;
}
function Stats({ stats }: StatsProps) {
  const occupancyRate = Math.round(
    (stats.occupiedSpaces / stats.totalSpaces) * 100
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-card shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Available Spaces
          </CardTitle>
          <Car className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">
            {stats.availableSpaces}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <StatusBadge variant="available" className="text-xs">
              Available
            </StatusBadge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupied Spaces</CardTitle>
          <Users className="h-4 w-4 text-danger" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-danger">
            {stats.occupiedSpaces}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <StatusBadge variant="occupied" className="text-xs">
              Occupied
            </StatusBadge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reserved Spaces</CardTitle>
          <Clock className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">
            {stats.reservedSpaces}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <StatusBadge variant="reserved" className="text-xs">
              Reserved
            </StatusBadge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{occupancyRate || 0}%</div>
          <Progress value={occupancyRate} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  );
}

export default Stats;
