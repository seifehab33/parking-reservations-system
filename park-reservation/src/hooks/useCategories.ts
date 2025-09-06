import { getCategories } from "@/services/getPublicAccess";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return {
    Cats: data,
    CatsLoading: isLoading,
    isCatsError: isError,
    CatsError: error,
    CatsAgain: refetch,
  };
};
export default useCategories;
