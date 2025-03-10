import Link from "next/link";
import { DashboardNav } from "@/components/ui/dashboard-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Menu,
  DollarSign,
  Package,
  Star,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import SellerStats from "@/components/layout/nav-stats";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <div className="p-6">
          <Link href="/dashboard" className="text-xl font-bold text-slate-900">
            GrocerySeller
          </Link>
        </div>
        <div className="flex-1 w-full py-10">
          <DashboardNav />
        </div>
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/avatar.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-slate-500">john@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="border-b border-slate-200 bg-white">
          {/* Mobile header */}
          <div className="h-14 flex items-center justify-between px-4 md:px-6 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="p-6">
                  <Link
                    href="/dashboard"
                    className="text-xl font-bold text-slate-900"
                  >
                    GrocerySeller
                  </Link>
                </div>
                <div className="px-2">
                  <DashboardNav />
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Desktop header with stats */}
          <div className="hidden md:flex items-center justify-between px-6 py-6">
            <SellerStats />

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="sr-only">Notifications</span>
              </Button>

              <Separator orientation="vertical" className="h-10" />

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">Fresh Grocers</p>
                  <p className="text-xs text-slate-500">Premium Seller</p>
                </div>
                <Avatar>
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback>FG</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
