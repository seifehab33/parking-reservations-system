"use client";

import {
  Bell,
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNotificationsStore } from "@/store/notificationStore";

export function NotificationDropdown() {
  const { notifications, clear } = useNotificationsStore();

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 max-h-96 overflow-y-auto"
      >
        <div className="flex justify-between items-center px-2 py-1">
          <span className="text-sm font-medium">Notifications</span>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-red-500 hover:text-red-700"
              onClick={clear}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />

        {notifications.length === 0 && (
          <DropdownMenuItem
            disabled
            className="text-center text-sm text-muted-foreground"
          >
            No notifications
          </DropdownMenuItem>
        )}

        {notifications.map((n) => (
          <DropdownMenuItem key={n.id} className="flex items-start gap-2">
            {getIcon(n.type)}
            <div className="flex flex-col">
              <span className="text-sm">{n.message}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(n.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
