import { getZones } from "@/services/getPublicAccess";
import { useQuery } from "@tanstack/react-query";

const useZone = () => {
  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["zones"],
    queryFn: getZones,
  });
  return {
    Zones: data,
    ZonesLoading: isLoading,
    isZonesError: isError,
    ZonesAgain: refetch,
    ZonesError: error,
  };
};
export default useZone;
