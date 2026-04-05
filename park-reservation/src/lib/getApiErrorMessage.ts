import { AxiosError } from "axios";

type ApiErrorPayload = {
  message?: string;
  error?: string;
};

export function getApiErrorMessage<T extends ApiErrorPayload>(
  error: AxiosError<T>,
  fallback: string
) {
  return error.response?.data?.message ?? error.response?.data?.error ?? fallback;
}
