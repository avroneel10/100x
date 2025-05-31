
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  Building, 
  Target, 
  DollarSign, 
  Shield, 
  Search,
  MoreHorizontal,
  TrendingUp,
  AlertTriangle,
  Settings
} from "lucide-react";

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock admin data
  const systemStats = [
    { label: "Total Users", value: "12,847", icon: Users, change: "+12%", color: "text-blue-600" },
    { label: "Active Brands", value: "1,234", icon: Building, change: "+8%", color: "text-green-600" },
    { label: "Active Creators", value: "10,247", icon: Target, change: "+15%", color: "text-purple-600" },
    { label: "Monthly Revenue", value: "$547K", icon: DollarSign, change: "+23%", color: "text-orange-600" }
  ];

  const recentUsers = [
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com", role: "Creator", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "TechCorp Inc.", email: "marketing@techcorp.com", role: "Brand", status: "Active", joinDate: "2024-01-14" },
    { id: 3, name: "Mike Chen", email: "mike@example.com", role: "Creator", status: "Pending", joinDate: "2024-01-13" },
    { id: 4, name: "Fashion Forward", email: "team@fashionforward.com", role: "Brand", status: "Active", joinDate: "2024-01-12" }
  ];

  const systemAlerts = [
    { id: 1, type: "warning", message: "High API usage detected for YouTube integration", time: "2 hours ago" },
    { id: 2, type: "info", message: "Scheduled maintenance window: Jan 20, 2024 2:00 AM UTC", time: "1 day ago" },
    { id: 3, type: "error", message: "Payment processing error for invoice #INV-1234", time: "3 hours ago" }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active": return <Badge className="bg-green-500">Active</Badge>;
      case "Pending": return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>;
      case "Suspended": return <Badge variant="destructive">Suspended</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredUsers = recentUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage platform users, campaigns, and system health</p>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          System Settings
        </Button>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Oversight</TabsTrigger>
          <TabsTrigger value="analytics">Platform Analytics</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">User Management</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button>Add User</Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <h2 className="text-2xl font-bold">Campaign Oversight</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">47</div>
                <p className="text-sm text-gray-600">Currently running</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-sm text-gray-600">Awaiting review</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Flagged Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">3</div>
                <p className="text-sm text-gray-600">Needs attention</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <h2 className="text-2xl font-bold">Platform Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Growth Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>New Users (30d)</span>
                    <span className="font-bold text-green-600">+1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue Growth</span>
                    <span className="font-bold text-green-600">+23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Campaign Success Rate</span>
                    <span className="font-bold">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>System Uptime</span>
                    <span className="font-bold text-green-600">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>API Response Time</span>
                    <span className="font-bold">124ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Sessions</span>
                    <span className="font-bold">2,847</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <h2 className="text-2xl font-bold">System Health</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
