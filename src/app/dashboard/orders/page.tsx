"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Package,
  Search,
  ShoppingBag,
  Clock,
  ChevronDown,
  Check,
  Filter,
  X,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for orders
const orders = [
  {
    id: "ORD-7291",
    customer: "Emma Wilson",
    date: "Today, 10:23 AM",
    total: "$124.00",
    items: [
      { name: "Organic Bananas", qty: 1, price: "$4.99" },
      { name: "Fresh Milk 1L", qty: 2, price: "$7.98" },
      { name: "Whole Wheat Bread", qty: 1, price: "$3.99" },
      { name: "Avocados", qty: 3, price: "$12.99" },
    ],
    status: "Processing",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    phone: "+1 (555) 123-4567",
    email: "emma@example.com",
    payment: {
      method: "Credit Card",
      cardLast4: "4242",
      status: "Paid",
    },
    shipping: {
      method: "Standard Delivery",
      status: "Preparing",
      estimated: "May 28, 2023",
    },
  },
  {
    id: "ORD-7290",
    customer: "Michael Chen",
    date: "Today, 09:14 AM",
    total: "$62.50",
    items: [
      { name: "Fresh Vegetables Combo", qty: 1, price: "$24.99" },
      { name: "Organic Eggs (12-pack)", qty: 1, price: "$6.99" },
      { name: "Sourdough Bread", qty: 1, price: "$5.49" },
    ],
    status: "Delivered",
    address: {
      street: "456 Oak Avenue",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "United States",
    },
    phone: "+1 (555) 987-6543",
    email: "michael@example.com",
    payment: {
      method: "PayPal",
      status: "Paid",
    },
    shipping: {
      method: "Express Delivery",
      status: "Delivered",
      tracking: "USP12345678",
      delivered: "May 24, 2023",
    },
  },
  {
    id: "ORD-7289",
    customer: "Sarah Johnson",
    date: "Yesterday, 3:45 PM",
    total: "$93.25",
    items: [
      { name: "Organic Apple Juice", qty: 2, price: "$13.98" },
      { name: "Grass-fed Ground Beef", qty: 1, price: "$15.99" },
      { name: "Pasta Variety Pack", qty: 1, price: "$12.49" },
    ],
    status: "Processing",
    address: {
      street: "789 Pine Street",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "United States",
    },
    phone: "+1 (555) 234-5678",
    email: "sarah@example.com",
    payment: {
      method: "Credit Card",
      cardLast4: "1234",
      status: "Paid",
    },
    shipping: {
      method: "Standard Delivery",
      status: "Preparing",
      estimated: "May 29, 2023",
    },
  },
  {
    id: "ORD-7288",
    customer: "James Brown",
    date: "Yesterday, 1:22 PM",
    total: "$157.30",
    items: [
      { name: "Organic Produce Box", qty: 1, price: "$34.99" },
      { name: "Free-Range Chicken Breasts", qty: 2, price: "$24.98" },
      { name: "Assorted Cheese Pack", qty: 1, price: "$18.99" },
    ],
    status: "Processing",
    address: {
      street: "321 Cedar Road",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "United States",
    },
    phone: "+1 (555) 876-5432",
    email: "james@example.com",
    payment: {
      method: "Credit Card",
      cardLast4: "5678",
      status: "Paid",
    },
    shipping: {
      method: "Express Delivery",
      status: "Preparing",
      estimated: "May 27, 2023",
    },
  },
  {
    id: "ORD-7287",
    customer: "Olivia Davis",
    date: "May 23, 2023",
    total: "$42.75",
    items: [
      { name: "Assorted Fresh Fruits", qty: 1, price: "$19.99" },
      { name: "Artisan Bread", qty: 1, price: "$6.49" },
      { name: "Organic Honey", qty: 1, price: "$8.99" },
    ],
    status: "Delivered",
    address: {
      street: "567 Maple Drive",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "United States",
    },
    phone: "+1 (555) 345-6789",
    email: "olivia@example.com",
    payment: {
      method: "Apple Pay",
      status: "Paid",
    },
    shipping: {
      method: "Standard Delivery",
      status: "Delivered",
      tracking: "USP98765432",
      delivered: "May 23, 2023",
    },
  },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);

  // Function to filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen p-2 mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left side - Orders list */}
        <Card className="shadow-none border-2 border-dashed border-gray-300 md:w-3/5">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Orders</CardTitle>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Orders</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-230px)]">
              <div className="space-y-2">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedOrder?.id === order.id
                        ? "bg-theme/10 border border-theme"
                        : "hover:bg-gray-50 border border-transparent"
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-theme rounded-full flex items-center justify-center">
                          <ShoppingBag className="w-5 h-5 text-theme-text" />
                        </div>
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{order.id}</span>
                            <span className="mx-1">•</span>
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{order.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.total}</p>
                        <Badge
                          className={`text-xs ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-600 hover:bg-green-100"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-600 hover:bg-blue-100"
                              : "bg-red-100 text-red-600 hover:bg-red-100"
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredOrders.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No orders found</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right side - Order details */}
        <Card className="shadow-none border-2 border-dashed border-gray-300 md:w-2/5">
          {selectedOrder ? (
            <>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Order Details</CardTitle>
                    <CardDescription>
                      {selectedOrder.id} • {selectedOrder.date}
                    </CardDescription>
                  </div>
                  <Badge
                    className={`${
                      selectedOrder.status === "Delivered"
                        ? "bg-green-100 text-green-600 hover:bg-green-100"
                        : selectedOrder.status === "Processing"
                        ? "bg-blue-100 text-blue-600 hover:bg-blue-100"
                        : "bg-red-100 text-red-600 hover:bg-red-100"
                    }`}
                  >
                    {selectedOrder.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-230px)]">
                  <div className="space-y-6">
                    {/* Customer information */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Customer</h3>
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        <p className="font-medium">{selectedOrder.customer}</p>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center">
                            <Mail className="h-3.5 w-3.5 mr-2" />
                            {selectedOrder.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-3.5 w-3.5 mr-2" />
                            {selectedOrder.phone}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order items */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Items ({selectedOrder.items.length})
                      </h3>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        {selectedOrder.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between py-2 border-b last:border-0 border-dashed border-gray-200"
                          >
                            <div>
                              <p className="text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.qty}
                              </p>
                            </div>
                            <p className="text-sm font-medium">{item.price}</p>
                          </div>
                        ))}
                        <Separator className="my-2" />
                        <div className="flex justify-between pt-2">
                          <p className="font-medium">Total</p>
                          <p className="font-medium">{selectedOrder.total}</p>
                        </div>
                      </div>
                    </div>

                    {/* Shipping information */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Shipping Details
                      </h3>
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm">
                              {selectedOrder.address.street}
                            </p>
                            <p className="text-sm">
                              {selectedOrder.address.city},{" "}
                              {selectedOrder.address.state}{" "}
                              {selectedOrder.address.zip}
                            </p>
                            <p className="text-sm">
                              {selectedOrder.address.country}
                            </p>
                          </div>
                        </div>
                        <Separator className="my-2" />
                        <div>
                          <div className="flex justify-between">
                            <p className="text-sm">Shipping Method</p>
                            <p className="text-sm">
                              {selectedOrder.shipping.method}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm">Status</p>
                            <Badge
                              className={`text-xs ${
                                selectedOrder.shipping.status === "Delivered"
                                  ? "bg-green-100 text-green-600 hover:bg-green-100"
                                  : "bg-blue-100 text-blue-600 hover:bg-blue-100"
                              }`}
                            >
                              {selectedOrder.shipping.status}
                            </Badge>
                          </div>
                          {selectedOrder.shipping.tracking && (
                            <div className="flex justify-between">
                              <p className="text-sm">Tracking</p>
                              <p className="text-sm font-medium">
                                {selectedOrder.shipping.tracking}
                              </p>
                            </div>
                          )}
                          {selectedOrder.shipping.estimated && (
                            <div className="flex justify-between">
                              <p className="text-sm">Estimated Delivery</p>
                              <div className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <p className="text-sm">
                                  {selectedOrder.shipping.estimated}
                                </p>
                              </div>
                            </div>
                          )}
                          {selectedOrder.shipping.delivered && (
                            <div className="flex justify-between">
                              <p className="text-sm">Delivered On</p>
                              <div className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <p className="text-sm">
                                  {selectedOrder.shipping.delivered}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Payment information */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Payment Details
                      </h3>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            <p className="text-sm">
                              {selectedOrder.payment.method}
                              {selectedOrder.payment.cardLast4 &&
                                ` (**** ${selectedOrder.payment.cardLast4})`}
                            </p>
                          </div>
                          <Badge
                            className={`text-xs bg-green-100 text-green-600 hover:bg-green-100`}
                          >
                            {selectedOrder.payment.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border-theme text-theme hover:bg-theme hover:text-theme-text"
                      >
                        <Truck className="h-4 w-4 mr-2" />
                        Update Status
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="flex-1">
                            Actions <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                          <DropdownMenuItem>Email Customer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-[calc(100vh-200px)]">
              <div className="text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No Order Selected</h3>
                <p className="text-muted-foreground">
                  Select an order to view its details
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </main>
  );
}
