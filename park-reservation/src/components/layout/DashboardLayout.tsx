"use client";

import { ReactNode } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { User } from "lucide-react";

import { NotificationDropdown } from "../notifications/NotificationDropdown";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-foreground hover:bg-accent" />
              <div className="h-6 w-px bg-border" />
              <h1 className="text-sm font-semibold md:text-xl ">
                Parking Management System
              </h1>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <NotificationDropdown />

              {/* User info */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="text-sm">
                  {/* <div className="font-medium capitalize">{userRole}</div> */}
                  <div className="text-muted-foreground text-xs">
                    WeLink Cargo
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
