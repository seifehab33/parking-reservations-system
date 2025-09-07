"use client";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { getQueryClient } from "@/lib/query-client";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
