import { switchZone } from "@/services/adminAccess";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useZonesStore } from "@/store/zonesStore";
import { openZoneResponse } from "@/types/Zone";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/ErrorReponse";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

interface TogglePayload {
  zoneId: string;
  zoneName: string;
  newOpen: boolean;
}

const useOpenZone = () => {
  const { updateZone } = useZonesStore();

  return useMutation<
    openZoneResponse,
    AxiosError<ErrorResponse>,
    TogglePayload
  >({
    mutationFn: ({ zoneId, newOpen }) => switchZone(zoneId, newOpen),
    onSuccess: (data, variables) => {
      updateZone({
        id: data.zoneId,
        open: data.open,
      });

      toast.success(
        `Zone ${variables.zoneName} is now ${data.open ? "Open" : "Closed"}`
      );
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to toggle zone"));
    },
  });
};

export default useOpenZone;
