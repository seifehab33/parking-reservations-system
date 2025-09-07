import { useQuery } from "@tanstack/react-query";
import { getParkingStateReport } from "@/services/adminAccess";
import { ParkingReport } from "@/types/AdminReports";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/ErrorReponse";

export function useParkingReport() {
  return useQuery<ParkingReport[], AxiosError<ErrorResponse>>({
    queryKey: ["parking-report"],
    queryFn: getParkingStateReport,
  });
}
