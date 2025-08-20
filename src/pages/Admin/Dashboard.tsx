import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Area,
  AreaChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  BarChart3,
  CreditCard,
  DollarSign,
  Download,
  ShoppingBag,
  Users,
  Search,
  PlusCircle,
  UserRoundPlus,
  LogOut,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/auth/authSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { toast } from "@/hooks/use-toast";
import {
  importFile,
  validateAndExtractColumns,
  downloadSampleExcel,
  getExcelSheetNames,
} from "@/utils/fileImport";
import authorizedAxiosInstance from "@/utils/authorizeAxios";

// Sample data for the dashboard
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [importedData, setImportedData] = useState<any[]>([]);
  const [importInfo, setImportInfo] = useState<{
    sheetName?: string;
    availableSheets?: string[];
    fileName?: string;
  }>({});
  const [importHistory, setImportHistory] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  // API functions
  const saveImportMetadata = async (
    file: File,
    sheetNames: string[],
    status: "success" | "failed",
    errorMessage?: string
  ) => {
    try {
      const metadata = {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.name.split(".").pop()?.toLowerCase() || "",
        sheetNames: sheetNames,
        importedBy: user?.email || user?.name || "Unknown",
        status: status,
        errorMessage: errorMessage || null,
      };

      const response = await authorizedAxiosInstance.post(
        "/api/file-imports",
        metadata
      );

      // Reload import history
      await loadImportHistory();

      return response.data;
    } catch (error) {
      console.error("Error saving import metadata:", error);
      // Không throw error để không làm gián đoạn quá trình import chính
    }
  };

  const loadImportHistory = async () => {
    try {
      const response = await authorizedAxiosInstance.get("/api/file-imports", {
        params: { page: 1, limit: 10 },
      });

      setImportHistory(response.data?.imports || []);
    } catch (error) {
      console.error("Error loading import history:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Đăng xuất thành công",
      description: "Bạn đã đăng xuất khỏi hệ thống",
    });
    navigate("/", { replace: true });
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx,.xls";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsLoading(true);
        let availableSheets: string[] = [];
        let result: any = null;

        try {
          // Get sheet names for Excel files
          if (
            file.name.toLowerCase().endsWith(".xlsx") ||
            file.name.toLowerCase().endsWith(".xls")
          ) {
            availableSheets = await getExcelSheetNames(file);
          }

          result = await importFile(file, {
            maxFileSize: 10,
            skipEmptyRows: true,
          });

          // Set import info
          const currentImportInfo = {
            fileName: file.name,
            availableSheets: availableSheets,
            sheetName: availableSheets.includes("RNW Combat Stats Dashboard")
              ? "RNW Combat Stats Dashboard"
              : availableSheets[0],
          };
          setImportInfo(currentImportInfo);

          // Validate and extract specific columns
          const requiredColumns = [
            "lord_id",
            "name",
            "Merits (new)",
            "highest_power (new)",
          ];
          const validation = validateAndExtractColumns(result, requiredColumns);

          if (validation.success) {
            setImportedData(validation.data);

            // Save metadata to backend - SUCCESS
            try {
              await saveImportMetadata(file, availableSheets, "success");
            } catch (metadataError) {
              console.error(
                "Failed to save metadata, but import succeeded:",
                metadataError
              );
            }

            const sheetInfo = currentImportInfo.sheetName
              ? ` từ sheet "${currentImportInfo.sheetName}"`
              : "";

            toast({
              title: "Import thành công",
              description: `Đã import ${validation.data.length} bản ghi${sheetInfo}`,
            });

            // Switch to analytics tab to show imported data
            setActiveTab("analytics");
          } else {
            // Save metadata to backend - FAILED
            try {
              await saveImportMetadata(
                file,
                availableSheets,
                "failed",
                validation.errors.join("; ")
              );
            } catch (metadataError) {
              console.error(
                "Failed to save metadata for failed import:",
                metadataError
              );
            }

            toast({
              variant: "destructive",
              title: "Lỗi validation",
              description: validation.errors.join("; "),
            });
          }
        } catch (error) {
          console.error("Import error:", error);

          // Save metadata to backend - FAILED
          try {
            await saveImportMetadata(
              file,
              availableSheets,
              "failed",
              error instanceof Error ? error.message : "Unknown error"
            );
          } catch (metadataError) {
            console.error(
              "Failed to save metadata for error case:",
              metadataError
            );
          }

          toast({
            variant: "destructive",
            title: "Lỗi import",
            description: "Có lỗi xảy ra khi import file",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    input.click();
  };

  const handleDownloadTemplate = () => {
    const headers = ["lord_id", "name", "Merits (new)", "highest_power (new)"];
    downloadSampleExcel(headers, "lord_data_template.xlsx");
  };

  // Load import history when component mounts
  useEffect(() => {
    loadImportHistory();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to your admin dashboard
              {user?.name ? `, ${user.name}` : ""}. View and manage your
              platform's performance.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="import-history">Import History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8 md:w-[250px]"
              />
            </div>
            <Button
              variant="outline"
              onClick={handleDownloadTemplate}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Template
            </Button>
            <Button onClick={handleImport} disabled={isLoading}>
              <Download className="mr-2 h-4 w-4" />
              {isLoading ? "Đang import..." : "Import"}
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
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
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
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
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
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
                      <linearGradient
                        id="revenueColor"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
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
                      <div className="text-sm font-medium">
                        Design revisions
                      </div>
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
                <CardDescription>
                  Monthly user acquisition trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={usersData}>
                    <defs>
                      <linearGradient
                        id="usersColor"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
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
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage your platform users and their roles
                  </CardDescription>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Avatar className="mr-2 h-6 w-6">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
                        {new Date(user.joinedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Imported Lord Data</CardTitle>
                  <CardDescription>
                    {importedData.length > 0 ? (
                      <div className="space-y-1">
                        <div>
                          Hiển thị {importedData.length} bản ghi đã import
                        </div>
                        {importInfo.fileName && (
                          <div className="text-xs text-muted-foreground">
                            File:{" "}
                            <span className="font-medium">
                              {importInfo.fileName}
                            </span>
                            {importInfo.sheetName && (
                              <span>
                                {" "}
                                • Sheet:{" "}
                                <span className="font-medium">
                                  {importInfo.sheetName}
                                </span>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      "Import file Excel/CSV để xem dữ liệu Lord"
                    )}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {importedData.length > 0 && (
                    <Badge variant="outline">
                      {importedData.length} records
                    </Badge>
                  )}
                  {importInfo.availableSheets &&
                    importInfo.availableSheets.length > 1 && (
                      <Badge variant="secondary" className="text-xs">
                        {importInfo.availableSheets.length} sheets
                      </Badge>
                    )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {importedData.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Lord ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Merits (new)</TableHead>
                        <TableHead>Highest Power (new)</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {importedData.slice(0, 10).map((lord, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {lord.lord_id}
                          </TableCell>
                          <TableCell>{lord.name}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {typeof lord["Merits (new)"] === "number"
                                ? lord["Merits (new)"].toLocaleString()
                                : lord["Merits (new)"]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {typeof lord["highest_power (new)"] === "number"
                                ? lord["highest_power (new)"].toLocaleString()
                                : lord["highest_power (new)"]}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {importedData.length > 10 && (
                    <div className="flex items-center justify-center p-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Hiển thị 10/{importedData.length} bản ghi đầu tiên
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Chưa có dữ liệu</h3>
                  <p className="text-muted-foreground">
                    Sử dụng nút Import ở phía trên để import file Excel hoặc CSV
                    và xem dữ liệu Lord tại đây
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import History</CardTitle>
              <CardDescription>
                Lịch sử import file và thông tin chi tiết
              </CardDescription>
            </CardHeader>
            <CardContent>
              {importHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead>Sheets</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Imported By</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {importHistory.map((log: any) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">
                          <div>
                            <p>{log.fileName}</p>
                            <p className="text-xs text-muted-foreground">
                              {(log.fileSize / 1024).toFixed(1)} KB •{" "}
                              {log.fileType?.toUpperCase()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            {log.sheetNames && log.sheetNames.length > 0 ? (
                              <>
                                <p className="font-medium text-xs">
                                  {log.sheetNames[0]}
                                </p>
                                {log.sheetNames.length > 1 && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs mt-1"
                                  >
                                    +{log.sheetNames.length - 1} more
                                  </Badge>
                                )}
                              </>
                            ) : (
                              <span className="text-muted-foreground">N/A</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              log.status === "success"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {log.importedBy}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">
                              {new Date(
                                log.createdAt || log.importedAt
                              ).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(
                                log.createdAt || log.importedAt
                              ).toLocaleTimeString()}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Chưa có lịch sử import
                  </h3>
                  <p className="text-muted-foreground">
                    Import file đầu tiên để xem lịch sử tại đây
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Configure your admin dashboard settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-muted-foreground">
                Settings tab content is under development
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
