import { switchZone } from "@/services/adminAccess";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useZonesStore } from "@/store/zonesStore";

interface TogglePayload {
  zoneId: string;
  zoneName: string;
  currentOpen: boolean;
}

const useOpenZone = () => {
  const { updateZone } = useZonesStore();

  return useMutation({
    mutationFn: ({ zoneId }: TogglePayload) => switchZone(zoneId),
    onSuccess: (_, variables: TogglePayload) => {
      updateZone({
        id: variables.zoneId,
        open: !variables.currentOpen,
      });

      toast.success(
        `Zone ${variables.zoneName} is now ${
          variables.currentOpen ? "Closed" : "Open"
        }`
      );
    },
    onError: () => {
      toast.error("Failed to update zone");
    },
  });
};

export default useOpenZone;
