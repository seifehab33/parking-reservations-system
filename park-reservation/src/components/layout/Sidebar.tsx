"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Settings,
  Users,
  BarChart3,
  Truck,
  LogOut,
  MapPin,
  Timer,
  LibraryBig,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SidebarLink from "./SidebarLink";
import { useEffect, useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Parking Zones",
    url: "/zones",
    icon: MapPin,
  },
  {
    title: "Check In/Out",
    url: "/checkin-out",
    icon: Timer,
  },
];

const adminItems = [
  {
    title: "Zone Management",
    url: "/admin/zone-management",
    icon: Settings,
  },
  {
    title: "Subscriptions",
    url: "/admin/subscriptions",
    icon: Users,
  },
  {
    title: "System Settings",
    url: "/admin/system-settings",
    icon: Settings,
  },
  {
    title: "Reports",
    url: "/admin/reports/parking-state",
    icon: BarChart3,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: LibraryBig,
  },
  {
    title: "VR Hours",
    url: "/admin/vr-hours",
    icon: Timer,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setIsAdmin(role === "admin");
  }, []);
  const isCollapsed = state === "collapsed";

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    toast("Successfully logged out");
    router.push("/");
  };

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <Truck className="h-5 w-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-sm font-semibold text-sidebar-foreground">
                WeLink Cargo
              </h2>
              <p className="text-xs text-sidebar-foreground/70">
                Parking System
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton asChild>
                    <SidebarLink item={item} isCollapsed={isCollapsed} />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <SidebarLink item={item} isCollapsed={isCollapsed} />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
