"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorWrapperProps {
  error: unknown;
  onRetry: () => void;
}

export function ErrorWrapper({ error, onRetry }: ErrorWrapperProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6 text-center bg-destructive/10 border border-destructive rounded-lg">
      <AlertCircle className="h-6 w-6 text-destructive" />
      <p className="text-sm text-destructive">
        {error instanceof Error ? error.message : "Something went wrong"}
      </p>
      <Button size="sm" onClick={onRetry} variant="destructive">
        Retry
      </Button>
    </div>
  );
}
