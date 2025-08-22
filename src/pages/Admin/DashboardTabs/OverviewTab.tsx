import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  UserRoundPlus,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

// Sample data for the overview
const revenueData = [
  { date: "Jan", revenue: 1500, projectedRevenue: 1300 },
  { date: "Feb", revenue: 2300, projectedRevenue: 2000 },
  { date: "Mar", revenue: 1800, projectedRevenue: 2200 },
  { date: "Apr", revenue: 2800, projectedRevenue: 2500 },
  { date: "May", revenue: 3200, projectedRevenue: 2800 },
  { date: "Jun", revenue: 3800, projectedRevenue: 3300 },
  { date: "Jul", revenue: 4200, projectedRevenue: 3800 },
  { date: "Aug", revenue: 4800, projectedRevenue: 4200 },
  { date: "Sep", revenue: 5200, projectedRevenue: 4800 },
  { date: "Oct", revenue: 5800, projectedRevenue: 5200 },
  { date: "Nov", revenue: 6200, projectedRevenue: 5800 },
  { date: "Dec", revenue: 7000, projectedRevenue: 6200 },
];

const usersData = [
  { date: "Jan", users: 150 },
  { date: "Feb", users: 230 },
  { date: "Mar", users: 280 },
  { date: "Apr", users: 350 },
  { date: "May", users: 420 },
  { date: "Jun", users: 480 },
  { date: "Jul", users: 550 },
  { date: "Aug", users: 610 },
  { date: "Sep", users: 680 },
  { date: "Oct", users: 750 },
  { date: "Nov", users: 820 },
  { date: "Dec", users: 900 },
];

const recentUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    status: "active",
    role: "User",
    joinedDate: "2023-11-15",
    avatar: "https://avatars.githubusercontent.com/u/12345678",
  },
  {
    id: 2,
    name: "Sarah Lee",
    email: "sarah.lee@example.com",
    status: "pending",
    role: "Admin",
    joinedDate: "2023-12-01",
    avatar: "",
  },
  {
    id: 3,
    name: "Mohamed Ali",
    email: "mohamed.ali@example.com",
    status: "active",
    role: "User",
    joinedDate: "2023-12-10",
    avatar: "https://avatars.githubusercontent.com/u/87654321",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    email: "emma.rod@example.com",
    status: "inactive",
    role: "Editor",
    joinedDate: "2023-10-22",
    avatar: "",
  },
  {
    id: 5,
    name: "Hiroshi Tanaka",
    email: "hiroshi.t@example.com",
    status: "active",
    role: "User",
    joinedDate: "2024-01-05",
    avatar: "https://avatars.githubusercontent.com/u/23456789",
  },
];

const LoadingRecentActivity = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-6 w-16 rounded-md" />
      </div>
    ))}
  </div>
);

interface OverviewTabProps {
  isLoading?: boolean;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ isLoading = false }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">
              +10.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7,842</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3%</div>
            <p className="text-xs text-muted-foreground">
              +1.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue breakdown and projections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueColor" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="hsl(var(--primary))"
                  fillOpacity={0.2}
                  fill="url(#revenueColor)"
                />
                <Line
                  type="monotone"
                  dataKey="projectedRevenue"
                  name="Projected Revenue"
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user registrations</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <LoadingRecentActivity />
            ) : (
              <div className="space-y-4">
                {recentUsers.slice(0, 4).map((user) => (
                  <div key={user.id} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <Badge
                      variant={
                        user.status === "active"
                          ? "default"
                          : user.status === "pending"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {user.status}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <UserRoundPlus className="mr-2 h-4 w-4" />
                  View All Users
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Tasks Progress</CardTitle>
            <CardDescription>Your tasks completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Design revisions</div>
                  <div className="text-sm text-muted-foreground">75%</div>
                </div>
                <Progress value={75} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Content writing</div>
                  <div className="text-sm text-muted-foreground">32%</div>
                </div>
                <Progress value={32} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Development</div>
                  <div className="text-sm text-muted-foreground">86%</div>
                </div>
                <Progress value={86} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Testing</div>
                  <div className="text-sm text-muted-foreground">48%</div>
                </div>
                <Progress value={48} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly user acquisition trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={usersData}>
                <defs>
                  <linearGradient id="usersColor" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  name="Users"
                  stroke="hsl(var(--primary))"
                  fillOpacity={0.2}
                  fill="url(#usersColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
