import { create } from "zustand";
import { ZoneData } from "@/types/Zone";

interface ZonesStore {
  zones: ZoneData[];
  setZones: (zones: ZoneData[]) => void;
  updateZone: (zoneUpdate: Partial<ZoneData> & { id: string }) => void;
}

export const useZonesStore = create<ZonesStore>((set) => ({
  zones: [],
  setZones: (zones) => set({ zones }),
  updateZone: (zoneUpdate) =>
    set((state) => ({
      zones: state.zones.map((z) =>
        z.id === zoneUpdate.id ? { ...z, ...zoneUpdate } : z
      ),
    })),
}));
