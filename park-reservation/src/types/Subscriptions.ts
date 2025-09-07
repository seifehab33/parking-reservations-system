type Car = {
  plate: string;
  brand: string;
  model: string;
  color: string;
};

type Checkin = {
  ticketId: string;
  zoneId: string;
  checkinAt: string;
};

export interface SubscriptionData {
  id: string;
  userName: string;
  active: boolean;
  category: string;
  cars: Car[];
  startsAt: string;
  expiresAt: string;
  currentCheckins: Checkin[];
}
