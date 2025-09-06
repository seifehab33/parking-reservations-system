"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  url: string;
  title: string;
  icon: React.ElementType;
}

interface SidebarProps {
  item: SidebarItem;
  isCollapsed: boolean;
}

export default function SidebarLink({ item, isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const isActive = pathname === item.url;

  return (
    <Link
      href={item.url}
      className={`flex items-center gap-3 p-2 rounded-xl ${
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
      }`}
    >
      <item.icon className="h-4 w-4" />
      {!isCollapsed && <span>{item.title}</span>}
    </Link>
  );
}
