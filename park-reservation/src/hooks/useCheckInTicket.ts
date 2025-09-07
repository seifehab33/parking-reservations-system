import { checkInTicket } from "@/services/getPublicAccess";
import { ErrorResponse } from "@/types/ErrorReponse";
import { CheckInResponse, CheckInTicketData } from "@/types/Ticket";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCheckInTicket = () => {
  return useMutation<
    CheckInResponse,
    AxiosError<ErrorResponse>,
    CheckInTicketData
  >({
    mutationFn: (payload: CheckInTicketData) => checkInTicket(payload),
    onSuccess: (data) => {
      toast.success(`Checked in successfully. Ticket ID: ${data.ticket.id}`);
    },
    onError: (error) => {
      toast.error(error?.message || "Check-in failed");
    },
  });
};
