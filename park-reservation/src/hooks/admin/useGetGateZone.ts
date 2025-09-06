// hooks/useZoneGateById.ts
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ZoneData } from "@/types/Zone";
import { ErrorResponse } from "@/types/ErrorReponse";
import { getZonesById } from "@/services/adminAccess";

export const useZoneGateById = (gateId: string | null) => {
  return useQuery<ZoneData[], AxiosError<ErrorResponse>>({
    queryKey: ["gatezone-id", gateId],
    queryFn: () => getZonesById(gateId), // wrap in arrow function
    enabled: !!gateId, // only fetch if gateId is not null
  });
};
