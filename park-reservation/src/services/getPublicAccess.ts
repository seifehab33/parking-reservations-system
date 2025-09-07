import api from "@/lib/axios";
import { CategoriesData } from "@/types/Categories";
import { GatesData } from "@/types/Gates";
import { CheckInTicketData, TicketResponse } from "@/types/Ticket";
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
export async function checkInTicket(payload: CheckInTicketData) {
  const response = await api.post("/tickets/checkin", payload);
  return response.data;
}
export async function getTicketById(
  id: string | null
): Promise<TicketResponse> {
  const response = await api.get(`/tickets/${id}`);
  return response.data;
}
