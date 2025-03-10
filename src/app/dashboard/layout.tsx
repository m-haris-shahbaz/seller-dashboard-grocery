import Link from "next/link";
import { DashboardNav } from "@/components/ui/dashboard-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
        <div className="flex-1 px-3 py-2">
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
        <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-4 md:px-6">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="p-6">
                <Link href="/dashboard" className="text-xl font-bold text-slate-900">
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
            <Avatar className="h-8 w-8 md:hidden">
              <AvatarImage src="/avatar.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
