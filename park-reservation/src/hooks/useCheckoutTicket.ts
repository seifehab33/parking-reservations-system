import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { checkOutTicket } from "@/services/getPublicAccess";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/ErrorReponse";
import { CheckOutResponse, CheckOutTicketData } from "@/types/Ticket";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

export const useCheckOutTicket = () => {
  return useMutation<
    CheckOutResponse,
    AxiosError<ErrorResponse>,
    CheckOutTicketData
  >({
    mutationFn: (payload: CheckOutTicketData) => checkOutTicket(payload),
    onSuccess: (data) => {
      toast.success(
        `Checked out. Ticket ${data.ticketId}, Amount: $${data.amount}`
      );
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Checkout failed"));
    },
  });
};
