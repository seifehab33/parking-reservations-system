import { getSubscriptions } from "@/services/adminAccess";
import { ErrorResponse } from "@/types/ErrorReponse";
import { SubscriptionData } from "@/types/Subscriptions";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useGetSubscriptions = () => {
  return useQuery<SubscriptionData[], AxiosError<ErrorResponse>>({
    queryKey: ["subscriptions"],
    queryFn: getSubscriptions,
  });
};
export default useGetSubscriptions;
