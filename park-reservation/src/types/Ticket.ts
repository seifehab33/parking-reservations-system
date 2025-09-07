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
