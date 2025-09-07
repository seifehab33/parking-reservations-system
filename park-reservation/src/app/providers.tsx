"use client";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { getQueryClient } from "@/lib/query-client";
import { useRouter } from "next/navigation";
import { useZoneWebSocket } from "@/hooks/ws/useZoneWebSocket";
export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  const router = useRouter();
  useZoneWebSocket();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/");
      return;
    }
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
