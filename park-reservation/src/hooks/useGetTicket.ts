import { getTicketById } from "@/services/getPublicAccess";
import { ErrorResponse } from "@/types/ErrorReponse";
import { TicketResponse } from "@/types/Ticket";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useGetTicket = (id: string | null) => {
  return useQuery<TicketResponse, AxiosError<ErrorResponse>>({
    queryKey: ["ticket", id],
    queryFn: () => getTicketById(id),
  });
};
export default useGetTicket;
