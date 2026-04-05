"use client";
import { loginUser } from "@/services/auth";
import { ErrorResponse } from "@/types/ErrorReponse";
import { LoginPayload, LoginResponse } from "@/types/Login";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

export function useLogin() {
  const router = useRouter();
  return useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);
      toast.success("Login successful 🎉");
      router.push("/dashboard");
    },
    onError: (error) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      toast.error(getApiErrorMessage(error, "Login failed. Try again."));
    },
  });
}
