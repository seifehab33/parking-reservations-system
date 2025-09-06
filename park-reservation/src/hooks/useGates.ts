import { getGates } from "@/services/getPublicAccess";
import { useQuery } from "@tanstack/react-query";

const useGates = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["gates"],
    queryFn: getGates,
  });
  return {
    Gates: data,
    GatesLoading: isLoading,
    isGatesError: isError,
    GatesError: error,
    GatesAgain: refetch,
  };
};
export default useGates;
