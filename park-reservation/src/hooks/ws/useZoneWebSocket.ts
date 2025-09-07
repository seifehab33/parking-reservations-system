"use client";

import { useEffect } from "react";
import { useZonesStore } from "@/store/zonesStore";
import { useNotificationsStore } from "@/store/notificationStore";

export function useZoneWebSocket() {
  const { updateZone } = useZonesStore();
  const { addNotification } = useNotificationsStore();

  useEffect(() => {
    const ws = new WebSocket(
      process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000"
    );

    ws.onopen = () => {
      addNotification({ type: "info", message: "Connected to live updates" });
      ws.send(
        JSON.stringify({ type: "subscribe", payload: { gateId: "123" } })
      );
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "zone-update" && data.payload) {
          updateZone(data.payload);

          addNotification({
            type: "success",
            message: `Zone ${data.payload.name} updated`,
          });
        }

        if (data.type === "admin-update") {
          addNotification({
            type: "info",
            message: `${data.payload.action} on ${data.payload.targetId}`,
          });
        }
      } catch {
        addNotification({
          type: "error",
          message: "Error parsing WebSocket data",
        });
      }
    };

    ws.onclose = () =>
      addNotification({
        type: "warning",
        message: "Disconnected from live updates",
      });

    return () => ws.close();
  }, [updateZone, addNotification]);
}
