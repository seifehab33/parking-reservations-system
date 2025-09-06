import { updateCategory } from "@/services/adminAccess";
import { CategoriesData } from "@/types/Categories";
import { ErrorResponse } from "@/types/ErrorReponse";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useUpdateCategory() {
  return useMutation<CategoriesData, AxiosError<ErrorResponse>, CategoriesData>(
    {
      mutationFn: updateCategory,
      onSuccess: () => {
        toast.success("Category updated successfully!");
      },
      onError: (error) => {
        const message =
          error.response?.data?.error ?? "Login failed. Try again.";
        toast.error(message);
      },
    }
  );
}
