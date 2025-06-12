
import { useState } from "react";
import { Shield, Users, BarChart3, DollarSign, Settings, Bell, Search, Filter, Download, Plus, Edit, Trash2, Eye, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const { toast } = useToast();

  const menuItems = [
    { title: "Overview", icon: BarChart3, active: true },
    { title: "Users", icon: Users },
    { title: "Subscriptions", icon: DollarSign },
    { title: "Analytics", icon: Activity },
    { title: "Coupons", icon: Settings },
    { title: "Support", icon: Bell },
    { title: "Settings", icon: Settings }
  ];

  const stats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Active Sessions",
      value: "3,291",
      change: "+8.2%",
      trend: "up",
      icon: Activity,
      color: "bg-green-500"
    },
    {
      title: "Monthly Revenue",
      value: "$24,892",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "bg-purple-500"
    },
    {
      title: "Trial Conversions",
      value: "68.4%",
      change: "-2.1%",
      trend: "down",
      icon: TrendingUp,
      color: "bg-orange-500"
    }
  ];

  const recentUsers = [
    { id: 1, name: "Sarah Chen", email: "sarah@example.com", plan: "Pro", status: "Active", joinDate: "2024-01-15", lastActive: "2 hours ago" },
    { id: 2, name: "Marcus Johnson", email: "marcus@example.com", plan: "Starter", status: "Active", joinDate: "2024-01-14", lastActive: "1 day ago" },
    { id: 3, name: "Emily Rodriguez", email: "emily@example.com", plan: "Free Trial", status: "Trial", joinDate: "2024-01-13", lastActive: "3 hours ago" },
    { id: 4, name: "David Kim", email: "david@example.com", plan: "Pro", status: "Inactive", joinDate: "2024-01-12", lastActive: "1 week ago" },
    { id: 5, name: "Lisa Wang", email: "lisa@example.com", plan: "Starter", status: "Active", joinDate: "2024-01-11", lastActive: "5 minutes ago" }
  ];

  const coupons = [
    { id: 1, code: "FOCUS50", discount: "50%", type: "Percentage", uses: 245, maxUses: 500, expires: "2024-12-31", status: "Active" },
    { id: 2, code: "WELCOME20", discount: "$20", type: "Fixed", uses: 89, maxUses: 100, expires: "2024-06-30", status: "Active" },
    { id: 3, code: "STUDENT30", discount: "30%", type: "Percentage", uses: 156, maxUses: 200, expires: "2024-08-31", status: "Active" },
    { id: 4, code: "BLACKFRIDAY", discount: "75%", type: "Percentage", uses: 500, maxUses: 500, expires: "2024-11-30", status: "Expired" }
  ];

  const subscriptions = [
    { id: 1, user: "Sarah Chen", plan: "Focus Pro", amount: "$18/month", status: "Active", nextBilling: "2024-02-15", created: "2024-01-15" },
    { id: 2, user: "Marcus Johnson", plan: "Focus Starter", amount: "$10/month", status: "Active", nextBilling: "2024-02-14", created: "2024-01-14" },
    { id: 3, user: "Emily Rodriguez", plan: "Free Trial", amount: "$0", status: "Trial", nextBilling: "2024-01-20", created: "2024-01-13" },
    { id: 4, user: "David Kim", plan: "Focus Pro", amount: "$18/month", status: "Cancelled", nextBilling: "-", created: "2024-01-12" },
    { id: 5, user: "Lisa Wang", plan: "Focus Starter", amount: "$10/month", status: "Active", nextBilling: "2024-02-11", created: "2024-01-11" }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateCoupon = () => {
    toast({
      title: "Coupon created successfully! 🎉",
      description: "The new coupon is now available for users.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100">
        <Sidebar className="bg-white border-r">
          <SidebarHeader className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  focusEdge
                </span>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className={item.active ? "bg-blue-50 text-blue-700" : ""}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your focusEdge platform</p>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24 Hours</SelectItem>
                    <SelectItem value="7d">7 Days</SelectItem>
                    <SelectItem value="30d">30 Days</SelectItem>
                    <SelectItem value="90d">90 Days</SelectItem>
                  </SelectContent>
                </Select>
                <SidebarTrigger />
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="users" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                <TabsTrigger value="coupons">Coupons</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="users">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>User Management</CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <Button variant="outline">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Join Date</TableHead>
                          <TableHead>Last Active</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{user.plan}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(user.status)}>
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.joinDate}</TableCell>
                            <TableCell>{user.lastActive}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="ghost">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-600">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="subscriptions">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Subscription Management</CardTitle>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Revenue Report
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Next Billing</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subscriptions.map((sub) => (
                          <TableRow key={sub.id}>
                            <TableCell className="font-medium">{sub.user}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{sub.plan}</Badge>
                            </TableCell>
                            <TableCell>{sub.amount}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(sub.status)}>
                                {sub.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{sub.nextBilling}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="ghost">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="coupons">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Coupon Management</CardTitle>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Coupon
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create New Coupon</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="code">Coupon Code</Label>
                              <Input id="code" placeholder="SAVE20" />
                            </div>
                            <div>
                              <Label htmlFor="discount">Discount</Label>
                              <Input id="discount" placeholder="20%" />
                            </div>
                            <div>
                              <Label htmlFor="maxUses">Max Uses</Label>
                              <Input id="maxUses" type="number" placeholder="100" />
                            </div>
                            <div>
                              <Label htmlFor="expires">Expires</Label>
                              <Input id="expires" type="date" />
                            </div>
                            <Button onClick={handleCreateCoupon} className="w-full">
                              Create Coupon
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Code</TableHead>
                          <TableHead>Discount</TableHead>
                          <TableHead>Usage</TableHead>
                          <TableHead>Expires</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {coupons.map((coupon) => (
                          <TableRow key={coupon.id}>
                            <TableCell className="font-mono font-medium">{coupon.code}</TableCell>
                            <TableCell>{coupon.discount}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span>{coupon.uses}/{coupon.maxUses}</span>
                                <div className="w-16 bg-gray-200 rounded-full h-1">
                                  <div 
                                    className="bg-blue-600 h-1 rounded-full" 
                                    style={{ width: `${(coupon.uses / coupon.maxUses) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{coupon.expires}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(coupon.status)}>
                                {coupon.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-600">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>Revenue Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-gray-500">
                        📈 Revenue chart would go here
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-gray-500">
                        📊 User growth chart would go here
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>App Usage Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Instagram blocks</span>
                          <span className="font-semibold">2,847</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>YouTube blocks</span>
                          <span className="font-semibold">1,923</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>WhatsApp blocks</span>
                          <span className="font-semibold">1,456</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Twitter blocks</span>
                          <span className="font-semibold">1,234</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>Focus Session Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Total sessions today</span>
                          <span className="font-semibold">1,847</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Average session length</span>
                          <span className="font-semibold">23 min</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Success rate</span>
                          <span className="font-semibold">78%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Strict mode usage</span>
                          <span className="font-semibold">34%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
