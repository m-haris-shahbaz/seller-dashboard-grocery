"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  Package,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
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
import { Checkbox } from "@/components/ui/checkbox";

const products = [
  {
    id: "PRD001",
    name: "Organic Bananas",
    category: "Fruits",
    price: 1.99,
    stock: 58,
    status: "In Stock",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "PRD002",
    name: "Fresh Milk",
    category: "Dairy",
    price: 3.49,
    stock: 32,
    status: "In Stock",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "PRD003",
    name: "Whole Wheat Bread",
    category: "Bakery",
    price: 4.29,
    stock: 15,
    status: "Low Stock",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "PRD004",
    name: "Avocados",
    category: "Fruits",
    price: 5.99,
    stock: 24,
    status: "In Stock",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "PRD005",
    name: "Organic Eggs",
    category: "Dairy",
    price: 4.99,
    stock: 0,
    status: "Out of Stock",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "PRD006",
    name: "Brown Rice",
    category: "Grains",
    price: 3.29,
    stock: 45,
    status: "In Stock",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "PRD007",
    name: "Greek Yogurt",
    category: "Dairy",
    price: 3.99,
    stock: 18,
    status: "In Stock",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "PRD008",
    name: "Red Apples",
    category: "Fruits",
    price: 2.49,
    stock: 7,
    status: "Low Stock",
    image: "https://via.placeholder.com/40",
  },
];

const categories = ["All", "Fruits", "Dairy", "Bakery", "Grains"];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Function to filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleProductSelection = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(
        selectedProducts.filter((productId) => productId !== id)
      );
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const toggleAllProducts = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id));
    }
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-none border-2 border-dashed border-gray-300">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>
                Manage your product catalog and inventory levels
              </CardDescription>
            </div>
            <Button className="sm:w-auto flex items-center gap-2 bg-theme hover:bg-theme/80 text-theme-text">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="min-w-[140px]">
                  <div className="flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    <span>
                      {categoryFilter === "All"
                        ? "All Categories"
                        : categoryFilter}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent align="end">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="min-w-[130px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>
                      {statusFilter === "All" ? "All Status" : statusFilter}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk actions */}
          {selectedProducts.length > 0 && (
            <div className="bg-muted/40 mb-4 p-2 rounded-md flex items-center justify-between">
              <span className="text-sm">
                {selectedProducts.length}{" "}
                {selectedProducts.length === 1 ? "product" : "products"}{" "}
                selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Update Stock
                </Button>
                <Button variant="outline" size="sm" className="text-red-500">
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                </Button>
              </div>
            </div>
          )}

          {/* Products table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        filteredProducts.length > 0 &&
                        selectedProducts.length === filteredProducts.length
                      }
                      onCheckedChange={toggleAllProducts}
                    />
                  </TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="hidden md:table-cell">
                    <div className="flex items-center cursor-pointer">
                      Category <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <div className="flex items-center cursor-pointer">
                      Price <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer">
                      Stock <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className="group">
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() =>
                            toggleProductSelection(product.id)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-md bg-theme/10 overflow-hidden flex items-center justify-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xs text-muted-foreground md:hidden">
                              {product.category}
                            </div>
                            <div className="text-xs text-muted-foreground md:hidden">
                              ${product.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="bg-primary/5">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-medium">
                        ${product.price.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{product.stock}</div>
                        <div className="text-xs text-muted-foreground">
                          units
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={`
                            ${
                              product.status === "In Stock"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : product.status === "Low Stock"
                                ? "bg-amber-100 text-amber-700 border-amber-200"
                                : "bg-red-100 text-red-700 border-red-200"
                            }
                          `}
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center">
                              <Eye className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <Edit className="h-4 w-4 mr-2" /> Edit Product
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Package className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-muted-foreground">
                          No products found
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredProducts.length}</strong> of{" "}
              <strong>{products.length}</strong> products
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-theme/10">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
