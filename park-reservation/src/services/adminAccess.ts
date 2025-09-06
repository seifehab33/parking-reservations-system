import api from "@/lib/axios";
import { CategoriesData } from "@/types/Categories";
import { ZoneData } from "@/types/Zone";

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
