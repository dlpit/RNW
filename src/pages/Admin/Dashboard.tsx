import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { logout } from "@/redux/auth/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import authorizedAxiosInstance from "@/utils/authorizeAxios";
import { Download, LogOut, Search } from "lucide-react";
import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import tab components
import {
  AnalyticsTab,
  ImportHistoryTab,
  OverviewTab,
  SettingsTab,
  UserTab,
} from "./DashboardTabs";

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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 10,
  });
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [selectedSheets, setSelectedSheets] = useState<{
    fileName: string;
    sheets: string[];
  } | null>(null);
  const [showSheetsModal, setShowSheetsModal] = useState(false);

  // New state for Lords and Members data
  const [lordsData, setLordsData] = useState<any[]>([]);
  const [lordsLoading, setLordsLoading] = useState(false);
  const [lordsPagination, setLordsPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 50,
    hasNext: false,
    hasPrev: false,
  });
  const [lordsStatistics, setLordsStatistics] = useState<any>({});

  // Ref to track initial data loading
  const initialDataLoaded = useRef(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  // Extract members data from lords data
  const membersData = useMemo(() => {
    if (!lordsData || !Array.isArray(lordsData)) return [];

    // Filter lords that have alliance and extract member info
    return lordsData
      .filter(
        (lord: any) =>
          lord.member && lord.allianceTag && lord.allianceTag !== "Independent"
      )
      .map((lord: any) => ({
        id: lord.member?.id || lord.id,
        name: lord.member?.name || lord.name,
        alliance: lord.allianceTag,
        power: lord.currentPower || lord.power,
        role: lord.member?.role || "Member",
        kingdom: lord.faction || "Unknown",
        killPoint: lord.member?.killPoint || lord.unitsKilled || 0,
      }));
  }, [lordsData]);

  // API functions

  // Add state to preserve current filters
  const [currentFilters, setCurrentFilters] = useState({
    search: '',
    sortBy: 'currentPower',
    sortOrder: 'DESC'
  });

  const loadLordsData = useCallback(
    async (filters = {}) => {
      if (lordsLoading) {
        console.log("⏭️ Lords data already loading, skipping...");
        return; // Prevent duplicate calls
      }

      try {
        setLordsLoading(true);
        
        // Merge current filters with new filters
        const mergedFilters = {
          ...currentFilters,
          ...filters
        };
        
        // Update current filters state
        setCurrentFilters(mergedFilters);
        
        const defaultFilters = {
          page: 1,
          limit: 50,
          sortBy: "currentPower",
          sortOrder: "DESC",
          ...mergedFilters,
        };

        // Convert all values to strings for URLSearchParams
        const stringParams = Object.entries(defaultFilters).reduce(
          (acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          },
          {} as Record<string, string>
        );

        const params = new URLSearchParams(stringParams);
        const response = await authorizedAxiosInstance.get(
          `/api/lords/?${params}`
        );
        const result = response.data;

        console.log("🔍 Lords API response:", result);

        // Fix: Handle the new enhanced backend response structure
        if (result.status === "success" && result.data) {
          const data = result.data;

          // Backend now returns enhanced structure with pagination info
          setLordsData(data.data || []);
          
          // Use the enhanced pagination info from backend
          setLordsPagination({
            currentPage: data.currentPage || 1,
            totalPages: data.totalPages || 1,
            totalRecords: data.total || 0,
            limit: data.limit || 50,
            hasNext: data.hasNext || false,
            hasPrev: data.hasPrev || false
          });

          // Calculate statistics from actual data
          const lords = data.data || [];
          const statistics = {
            totalLords: data.total || 0, // Use total from backend, not current page count
            totalPower: lords.reduce(
              (sum: number, lord: any) => sum + (lord.currentPower || 0),
              0
            ),
            averagePower:
              lords.length > 0
                ? lords.reduce(
                    (sum: number, lord: any) => sum + (lord.currentPower || 0),
                    0
                  ) / lords.length
                : 0,
            currentPageRecords: data.pagination?.recordsOnPage || lords.length
          };
          setLordsStatistics(statistics);

          console.log("✅ Lords data loaded successfully:", {
            lordsCount: lords.length,
            totalRecords: data.total,
            pagination: {
              currentPage: data.currentPage,
              totalPages: data.totalPages,
              total: data.total,
              hasNext: data.hasNext,
              hasPrev: data.hasPrev,
              recordsOnPage: data.pagination?.recordsOnPage
            },
            statistics,
          });
        } else {
          throw new Error(result.message || "Failed to load lords data");
        }
      } catch (error: any) {
        console.error("❌ Failed to load lords data:", error);

        let errorMessage = "Không thể tải dữ liệu Lords";

        if (error.response?.status === 401) {
          errorMessage = "Không có quyền truy cập dữ liệu Lords";
        } else if (error.response?.status === 404) {
          errorMessage = "API Lords không tìm thấy";
        } else if (error.message && error.message !== "Success") {
          errorMessage = error.message;
        }

        toast({
          variant: "destructive",
          title: "Lỗi tải dữ liệu",
          description: errorMessage,
        });
      } finally {
        setLordsLoading(false);
      }
    },
    [lordsLoading]
  );

  const loadImportHistory = useCallback(async () => {
    if (isLoadingHistory) {
      console.log("⏭️ Import history already loading, skipping...");
      return; // Prevent duplicate calls
    }

    try {
      setIsLoadingHistory(true);
      const response = await authorizedAxiosInstance.get("/api/file-imports", {
        params: { page: 1, limit: 10 },
      });

      console.log("🔍 Import History API response:", response.data);

      // Handle the backend response structure based on your example
      if (response.data?.status === "success" && response.data?.data) {
        setImportHistory(response.data.data.imports || []);

        // Extract pagination from response if available
        const data = response.data.data;
        setPagination({
          currentPage: data.currentPage || 1,
          totalPages: data.totalPages || 1,
          totalRecords: data.total || data.imports?.length || 0,
          limit: 10,
        });

        console.log("✅ Import history loaded successfully:", {
          importsCount: (response.data.data.imports || []).length,
        });
      } else {
        // Fallback for different response structure
        setImportHistory(response.data?.imports || []);
        console.log("⚠️ Using fallback import history structure");
      }
    } catch (error) {
      console.error("❌ Error loading import history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [isLoadingHistory]);

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

        try {
          // Simple file validation
          const maxSize = 50 * 1024 * 1024; // 50MB
          if (file.size > maxSize) {
            throw new Error("File quá lớn. Tối đa 50MB");
          }

          const allowedExtensions = [".csv", ".xlsx", ".xls"];
          const extension = file.name
            .toLowerCase()
            .substring(file.name.lastIndexOf("."));
          if (!allowedExtensions.includes(extension)) {
            throw new Error(
              `File không được hỗ trợ. Chỉ chấp nhận: ${allowedExtensions.join(
                ", "
              )}`
            );
          }

          toast({
            title: "Đang upload file",
            description: "Đang gửi file lên server để xử lý...",
          });

          // Upload file to backend
          const formData = new FormData();
          formData.append("excelFile", file); // Correct field name matching backend

          // Call the backend import endpoint with extended timeout and progress
          const response = await authorizedAxiosInstance.post(
            "/api/lords/import-file",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              timeout: 600000, // 10 minutes timeout
              onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                  const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  console.log(`Upload progress: ${percentCompleted}%`);

                  // Update toast with upload progress
                  if (percentCompleted < 100) {
                    toast({
                      title: "Đang upload file",
                      description: `Tiến độ upload: ${percentCompleted}%`,
                    });
                  } else {
                    toast({
                      title: "Đang xử lý file",
                      description: "File đã upload xong, đang xử lý dữ liệu...",
                    });
                  }
                }
              },
            }
          );

          const result = response.data;

          // Debug logging to validate response format
          console.log("Import response:", result);

          // Check response format according to guide
          if (result.status === "success" && result.data) {
            const summary = result.data.summary;
            const details = result.data.details || [];

            console.log("Import summary:", summary);
            console.log("Import details count:", details.length);

            // Validate required fields according to guide
            if (!summary || typeof summary.totalRows !== "number") {
              throw new Error(
                "Response thiếu thông tin summary hoặc format không đúng"
              );
            }

            // Set import info for display
            setImportInfo({
              fileName: summary.fileName,
              sheetName: "Server processed", // Backend handles sheet selection
            });

            // Transform backend response to match current UI expectations
            // Filter successful records and extract their data if available
            const transformedData = details
              .filter((detail) => detail.status === "success")
              .map((detail) => {
                // Some successful records might not have data object
                if (detail.data) {
                  return detail.data;
                }
                // Fallback: create basic record from detail info
                return {
                  lord_id: detail.lordId || "",
                  name: detail.memberName || "",
                  action: detail.action || "processed",
                  row: detail.row || 0,
                };
              })
              .filter(Boolean);

            console.log("Transformed data count:", transformedData.length);
            setImportedData(transformedData);

            toast({
              title: "Import thành công",
              description: `Đã xử lý ${summary.totalRows} dòng. Thành công: ${summary.successful}, Thất bại: ${summary.failed}`,
            });

            // Switch to analytics tab to show imported data
            setActiveTab("analytics");

            // Refresh import history and lords data
            await loadImportHistory();
            await loadLordsData(); // Refresh lords data after import
          } else {
            // Handle import failure - result.status !== "success"
            const errorMessage =
              result.message ||
              "Import thất bại - định dạng response không đúng";
            toast({
              variant: "destructive",
              title: "Import thất bại",
              description: errorMessage,
            });
          }
        } catch (error: any) {
          console.error("Import error:", error);

          let errorMessage = "Lỗi không xác định";

          // Handle timeout error specifically
          if (
            error.code === "ECONNABORTED" &&
            error.message.includes("timeout")
          ) {
            errorMessage =
              "Xử lý file quá lâu (hơn 10 phút). Vui lòng thử lại với file nhỏ hơn hoặc liên hệ admin để tăng thời gian xử lý.";
          } else if (error.response?.data) {
            const errorData = error.response.data;

            // Check if backend returns error in guide format
            if (errorData.status === "error" && errorData.message) {
              errorMessage = errorData.message;
            } else if (errorData.message) {
              errorMessage = errorData.message;
            } else if (typeof errorData === "string") {
              errorMessage = errorData;
            }
          } else if (error.message) {
            errorMessage = error.message;
          }

          // Handle network errors
          if (error.code === "NETWORK_ERROR" || !error.response) {
            errorMessage =
              "Không thể kết nối tới server. Vui lòng kiểm tra backend đang chạy.";
          }

          // Handle auth errors
          if (error.response?.status === 401) {
            errorMessage =
              "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";
          }

          // Handle file size or format errors
          if (error.response?.status === 413) {
            errorMessage = "File quá lớn. Vui lòng chọn file nhỏ hơn 50MB.";
          }

          toast({
            variant: "destructive",
            title: "Lỗi import",
            description: errorMessage,
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    input.click();
  };

  const handleDownloadTemplate = () => {
    // Template download functionality removed as per user request
    toast({
      title: "Thông báo",
      description: "Chức năng download template đã được gỡ bỏ",
    });
  };

  const handleShowSheets = (fileName: string, sheets: string[]) => {
    setSelectedSheets({ fileName, sheets });
    setShowSheetsModal(true);
  };

  const handleCloseSheetsModal = () => {
    setShowSheetsModal(false);
    setSelectedSheets(null);
  };

  // Load import history and lords data when component mounts
  useEffect(() => {
    const loadData = async () => {
      // Prevent duplicate loading
      if (initialDataLoaded.current) {
        console.log("⏭️ Data already loaded, skipping...");
        return;
      }

      console.log("🚀 Loading initial data...");
      initialDataLoaded.current = true;

      try {
        // Load import history first
        if (!isLoadingHistory) {
          console.log("📋 Loading import history...");
          await loadImportHistory();
        }

        // Then load lords data
        if (!lordsLoading) {
          console.log("⚔️ Loading lords data...");
          await loadLordsData();
        }

        console.log("✅ Initial data loading completed");
      } catch (error) {
        console.error("❌ Error loading initial data:", error);
        // Reset flag on error so it can be retried
        initialDataLoaded.current = false;
      }
    };

    loadData();
  }, []); // Empty dependency array - load once when component mounts

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
          <OverviewTab isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <UserTab
            membersData={membersData}
            membersLoading={lordsLoading}
            onRefreshMembers={() => loadLordsData()}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsTab
            importedData={importedData}
            importInfo={importInfo}
            lordsData={lordsData}
            lordsLoading={lordsLoading}
            lordsPagination={lordsPagination}
            lordsStatistics={lordsStatistics}
            onRefreshLords={() => loadLordsData()}
            onFilterLords={(filters) => loadLordsData(filters)}
          />
        </TabsContent>

        <TabsContent value="import-history" className="space-y-4">
          <ImportHistoryTab
            importHistory={importHistory}
            isLoadingHistory={isLoadingHistory}
            pagination={pagination}
            onShowSheets={handleShowSheets}
          />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <SettingsTab />
        </TabsContent>
      </Tabs>

      {/* Sheets Modal */}
      <Dialog open={showSheetsModal} onOpenChange={setShowSheetsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Danh sách Sheets</DialogTitle>
            <DialogDescription>
              Tất cả sheets trong file:{" "}
              <span className="font-medium">{selectedSheets?.fileName}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedSheets?.sheets && selectedSheets.sheets.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {selectedSheets.sheets.map((sheet, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{sheet}</p>
                        <p className="text-xs text-muted-foreground">
                          Sheet {index + 1} của {selectedSheets.sheets.length}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={index === 0 ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {index === 0 ? "Đã import" : "Có sẵn"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Không có sheet nào được tìm thấy
              </div>
            )}
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Tổng số sheets: {selectedSheets?.sheets?.length || 0}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCloseSheetsModal}
                >
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
