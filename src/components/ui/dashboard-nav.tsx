"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart2,
  Settings,
  LogOut,
  HelpingHand,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "./separator";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const supportItems = [
  { href: "/help", label: "Help", icon: HelpingHand },
  { href: "/contact", label: "Contact", icon: Phone },
];

export function DashboardNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col space-y-1 justify-center", className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-5 py-2 text-sm font-medium transition-all hover:bg-slate-100",
              isActive ? "bg-slate-100 text-black" : "text-slate-500"
            )}
          >
            <div
              className={`p-2 ${
                isActive ? " bg-theme text-black" : ""
              } rounded-lg`}
            >
              <Icon className="h-4 w-4" />
            </div>
            {item.label}
          </Link>
        );
      })}

      <span className="uppercase px-5 py-2 text-xs text-gray-600">Support</span>
      {supportItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-5 py-2 text-sm font-medium transition-all hover:bg-slate-100",
              isActive ? "bg-green-100 text-theme-text" : "text-slate-500"
            )}
          >
            <div
              className={`p-2 ${
                isActive ? "bg-theme" : "bg-gray-100"
              } rounded-lg`}
            >
              <Icon className="h-4 w-4" />
            </div>
            {item.label}
          </Link>
        );
      })}

      {/*   <Button
        variant="ghost"
        className="justify-start text-slate-500 hover:text-slate-900"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign out
      </Button> */}
    </nav>
  );
}
