import { ZoneData } from "./Zone";

export interface CheckInTicketData {
  gateId: string;
  zoneId: string;
  type: string;
  subscriptionId?: string;
}
export interface TicketResponse {
  id: string;
  type: "visitor" | "subscriber";
  zoneId: string;
  gateId: string;
  checkinAt: string;
  checkoutAt: string | null;
}

// export interface ZoneState {
//   [key: string]: any;
// }

export interface CheckInResponse {
  ticket: TicketResponse;
  //   zoneState: ZoneState;
}
interface BreakdownItem {
  from: string;
  to: string;
  hours: number;
  rateMode: "normal" | "special";
  rate: number;
  amount: number;
}
export interface CheckOutTicketData {
  ticketId: string;
  forceConvertToVisitor?: boolean;
}
export interface CheckOutResponse {
  ticketId: string;
  checkinAt: string;
  checkoutAt: string;
  durationHours: number;
  breakdown: BreakdownItem[];
  amount: number;
  zoneState: ZoneData; // adjust if you have Zone type
}
