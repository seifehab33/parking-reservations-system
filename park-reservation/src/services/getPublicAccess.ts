import api from "@/lib/axios";
import { CategoriesData } from "@/types/Categories";
import { GatesData } from "@/types/Gates";
import { ZoneData } from "@/types/Zone";

export async function getCategories(): Promise<CategoriesData[]> {
  const res = await api.get("/master/categories");
  return res.data;
}
export async function getZones(): Promise<ZoneData[]> {
  const res = await api.get("/master/zones");
  return res.data;
}
export async function getGates(): Promise<GatesData[]> {
  const res = await api.get("/master/gates");
  return res.data;
}
