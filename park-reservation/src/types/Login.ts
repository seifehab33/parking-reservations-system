type role = "admin" | "employee";
export interface LoginPayload {
  username: string;
  password: string;
}
type User = {
  id: string;
  username: string;
  name: string;
  role: role;
  password: string;
};
export interface LoginResponse {
  token: string;
  user: User;
}
