import api from "@/lib/axios";
import { ParkingReport } from "@/types/AdminReports";
import { CategoriesData } from "@/types/Categories";
import { SubscriptionData } from "@/types/Subscriptions";
import { openZoneResponse, ZoneData } from "@/types/Zone";

export async function updateCategory({
  id,
  name,
  rateNormal,
  rateSpecial,
}: CategoriesData): Promise<CategoriesData> {
  const response = await api.put<CategoriesData>(`/admin/categories/${id}`, {
    name,
    rateNormal,
    rateSpecial,
  });
  return response.data;
}
export async function getZonesById(gateId: string | null): Promise<ZoneData[]> {
  const res = await api.get<ZoneData[]>(`/master/zones?gateId=${gateId}`);
  return res.data;
}
export async function switchZone(
  zoneId: string,
  open: boolean
): Promise<openZoneResponse> {
  const res = await api.put<openZoneResponse>(`/admin/zones/${zoneId}/open`, {
    open,
  });
  return res.data;
}
export async function getSubscriptions(): Promise<SubscriptionData[]> {
  const res = await api.get<SubscriptionData[]>("/admin/subscriptions");
  return res.data;
}

export async function getParkingStateReport(): Promise<ParkingReport[]> {
  const res = await api.get<ParkingReport[]>("/admin/reports/parking-state");
  return res.data;
}
