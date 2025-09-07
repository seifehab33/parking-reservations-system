import { randomUUID } from "crypto";
import { create } from "zustand";

export interface Notification {
  id: string;
  type: "info" | "success" | "error" | "warning";
  message: string;
  timestamp: string;
}

interface NotificationsStore {
  notifications: Notification[];
  addNotification: (notif: Omit<Notification, "id" | "timestamp">) => void;
  clear: () => void;
}

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: [],
  addNotification: (notif) =>
    set((state) => ({
      notifications: [
        {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          ...notif,
        },
        ...state.notifications,
      ],
    })),
  clear: () => set({ notifications: [] }),
}));
