import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  TrendingUp,
  Package,
  BarChart3,
  Clock,
} from "lucide-react";

export default function SellerDashboard() {
  return (
    <main className="min-h-screen p-2 mx-auto">
      {/* Key Metrics Section - Single row of important metrics */}
      <Card className="mb-6 shadow-none border-2 border-dashed border-gray-300">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-theme rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-theme-text" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold">$24,580</p>
                <p className="text-xs text-green-600">+8.5% from last month</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-theme rounded-full flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-theme-text" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Orders</p>
                <p className="text-2xl font-bold">312</p>
                <p className="text-xs text-green-600">+12.3% from last week</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-theme rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-theme-text" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Products</p>
                <p className="text-2xl font-bold">4,376</p>
                <p className="text-xs text-muted-foreground">in stock</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two column layout for main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - 2/3 width */}
        <div className="md:col-span-2 space-y-6">
          {/* Analytics Chart */}
          <Card className="shadow-none border-2 border-dashed border-gray-300">
            <CardHeader className="pb-2">
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Daily revenue overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <BarChart3 className="w-8 h-8 mb-2 text-color-theme" />
                  <span>Sales analytics chart</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders - Clean, streamlined list */}
          <Card className="shadow-none border-2 border-dashed border-gray-300">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer purchases</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    customer: "Emma Wilson",
                    id: "#ORD-7291",
                    time: "Just now",
                    total: "$124.00",
                    status: "Processing",
                  },
                  {
                    customer: "Michael Chen",
                    id: "#ORD-7290",
                    time: "2 hours ago",
                    total: "$62.50",
                    status: "Delivered",
                  },
                  {
                    customer: "Sarah Johnson",
                    id: "#ORD-7289",
                    time: "3 hours ago",
                    total: "$93.25",
                    status: "Processing",
                  },
                ].map((order, i) => (
                  <div
                    key={i}
                    className="flex items-center border-b border-dashed border-gray-200 pb-3"
                  >
                    <div className="w-8 h-8 bg-theme rounded-full flex items-center justify-center mr-3">
                      <Clock className="w-4 h-4 text-theme-text" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">{order.customer}</p>
                        <p className="font-medium">{order.total}</p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-muted-foreground">
                          {order.id} • {order.time}
                        </p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - 1/3 width */}
        <div className="space-y-6">
          {/* Best Selling Products */}
          <Card className="shadow-none border-2 border-dashed border-gray-300">
            <CardHeader className="pb-2">
              <CardTitle>Best Sellers</CardTitle>
              <CardDescription>Top products by sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Organic Bananas", sales: 920, percent: 92 },
                  { name: "Fresh Milk 1L", sales: 847, percent: 84 },
                  { name: "Whole Wheat Bread", sales: 639, percent: 63 },
                ].map((product, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {product.name}
                      </span>
                      <span className="text-sm">{product.sales} sold</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-theme"
                        style={{ width: `${product.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stock Overview - Simplified */}
          <Card className="shadow-none border-2 border-dashed border-gray-300">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Inventory Status</CardTitle>
                  <CardDescription>Product stock levels</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    name: "Organic Apples",
                    qty: 924,
                    status: "In Stock",
                  },
                  {
                    name: "Fresh Milk 1L",
                    qty: 72,
                    status: "Low Stock",
                  },
                  {
                    name: "Avocados",
                    qty: 0,
                    status: "Out of Stock",
                  },
                  {
                    name: "Whole Wheat Bread",
                    qty: 483,
                    status: "In Stock",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 last:border-0"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-2 h-2 rounded-full mr-2
                        ${item.status === 'In Stock' ? 'bg-green-500' : 
                          item.status === 'Low Stock' ? 'bg-yellow-500' : 'bg-red-500'}"
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{item.qty}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          item.status === "In Stock"
                            ? "bg-green-100 text-green-600"
                            : item.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
