import api from "@/lib/axios";
import { LoginPayload, LoginResponse } from "@/types/Login";

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  return res.data;
}
export async function adminRegisterUser(
  payload: LoginPayload
): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/admin/users", payload);
  return res.data;
}
export async function getAllUsers(): Promise<LoginResponse[]> {
  const res = await api.get("/admin/users");
  return res.data;
}
