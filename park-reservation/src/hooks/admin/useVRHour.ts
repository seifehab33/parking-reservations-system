"use client";

import { createRushHour, createVacation } from "@/services/adminAccess";
import { ErrorResponse } from "@/types/ErrorReponse";
import {
  RushHourData,
  RushHourResponse,
  VacationData,
  VacationHourReponse,
} from "@/types/VRHours";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useCreateRushHour() {
  return useMutation<RushHourResponse, AxiosError<ErrorResponse>, RushHourData>(
    {
      mutationFn: createRushHour,
      onSuccess: (data) => {
        toast.success(
          `Rush hour added for ${data.weekDay} ${data.from}–${data.to}`
        );
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to add rush hour");
      },
    }
  );
}
export function useCreateVacation() {
  return useMutation<
    VacationHourReponse,
    AxiosError<ErrorResponse>,
    VacationData
  >({
    mutationFn: createVacation,
    onSuccess: (data) => {
      toast.success(`Vacation added: ${data.name} / ${data.from}–${data.to}`);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to add vacation");
    },
  });
}
