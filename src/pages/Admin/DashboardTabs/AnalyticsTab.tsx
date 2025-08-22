import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart3, ChevronLeft, ChevronRight, MoreHorizontal, Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AnalyticsTabProps {
  importedData: any[];
  importInfo: {
    sheetName?: string;
    availableSheets?: string[];
    fileName?: string;
  };
  // New props for Lords data from API
  lordsData?: any[];
  lordsLoading?: boolean;
  lordsPagination?: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    limit: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
  lordsStatistics?: any;
  onRefreshLords?: () => Promise<void>;
  onFilterLords?: (filters: any) => Promise<void>;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  importedData,
  importInfo,
  lordsData = [],
  lordsLoading = false,
  lordsPagination = {
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 50,
    hasNext: false,
    hasPrev: false,
  },
  lordsStatistics = {},
  onRefreshLords,
  onFilterLords,
}) => {
  // Use Lords data from API if available, otherwise fall back to imported data
  const displayData = lordsData.length > 0 ? lordsData : importedData;
  const isUsingApiData = lordsData.length > 0;
  
  // Local state for search and filters
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortBy, setSortBy] = React.useState("currentPower");
  const [sortOrder, setSortOrder] = React.useState("DESC");
  
  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (onFilterLords && isUsingApiData) {
      onFilterLords({ 
        search: value, 
        page: 1, // Reset to page 1 when searching
        sortBy, 
        sortOrder 
      });
    }
  };
  
  // Handle sort change
  const handleSortChange = (field: string, order: string) => {
    setSortBy(field);
    setSortOrder(order);
    if (onFilterLords && isUsingApiData) {
      onFilterLords({ 
        search: searchTerm,
        page: lordsPagination.currentPage,
        sortBy: field, 
        sortOrder: order 
      });
    }
  };
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {isUsingApiData ? "Lords Database" : "Imported Lord Data"}
              </CardTitle>
              <CardDescription>
                {isUsingApiData ? (
                  <div className="space-y-1">
                    <div>
                      Hiển thị {displayData.length} trong tổng số{" "}
                      {lordsPagination.totalRecords} Lords
                    </div>
                    {lordsStatistics.totalLords && (
                      <div className="text-xs text-muted-foreground">
                        Tổng Power:{" "}
                        {lordsStatistics.totalPower?.toLocaleString()} • TB
                        Power: {Math.round(lordsStatistics.averagePower || 0)?.toLocaleString()}
                        {lordsStatistics.currentPageRecords && (
                          <span className="ml-2">• {lordsStatistics.currentPageRecords} records trên trang này</span>
                        )}
                      </div>
                    )}
                  </div>
                ) : displayData.length > 0 ? (
                  <div className="space-y-1">
                    <div>Hiển thị {displayData.length} bản ghi đã import</div>
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
                  "Import file Excel/CSV hoặc xem dữ liệu Lords từ database"
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {isUsingApiData && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRefreshLords}
                  disabled={lordsLoading}
                >
                  {lordsLoading ? "Đang tải..." : "Refresh"}
                </Button>
              )}
              {displayData.length > 0 && (
                <Badge variant="outline">
                  {displayData.length} {isUsingApiData ? "lords" : "records"}
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
        
        {/* Search and Sort Controls for API data */}
        {isUsingApiData && (
          <div className="px-6 pb-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo tên hoặc ID..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                  disabled={lordsLoading}
                />
              </div>
              
              {/* Sort Controls */}
              <div className="flex gap-2">
                <Select
                  value={sortBy}
                  onValueChange={(value) => handleSortChange(value, sortOrder)}
                  disabled={lordsLoading}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sắp xếp theo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="currentPower">Power</SelectItem>
                    <SelectItem value="name">Tên</SelectItem>
                    <SelectItem value="allianceTag">Alliance</SelectItem>
                    <SelectItem value="faction">Kingdom</SelectItem>
                    <SelectItem value="unitsKilled">Kills</SelectItem>
                    <SelectItem value="merits">Merits</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSortChange(sortBy, sortOrder === "DESC" ? "ASC" : "DESC")}
                  disabled={lordsLoading}
                  className="px-3"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  {sortOrder === "DESC" ? "Giảm dần" : "Tăng dần"}
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <CardContent>
          {displayData.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Power</TableHead>
                    <TableHead>Kill Points</TableHead>
                    <TableHead>Alliance</TableHead>
                    {isUsingApiData && <TableHead>Kingdom</TableHead>}
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData.map((lord: any, index: number) => (
                    <TableRow key={isUsingApiData ? lord.id : index}>
                      <TableCell className="font-medium">
                        {lord.id ||
                          lord.lordId ||
                          lord.lord_id ||
                          lord.ID ||
                          index + 1}
                      </TableCell>
                      <TableCell>{lord.name || lord.Name || "N/A"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {(
                            lord.currentPower ||
                            lord.power ||
                            lord.Power ||
                            lord["highest_power (new)"] ||
                            0
                          ).toLocaleString()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {(
                            lord.unitsKilled ||
                            lord.killPoints ||
                            lord["Kill Points"] ||
                            lord["Merits (new)"] ||
                            0
                          ).toLocaleString()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {lord.allianceTag ||
                          lord.alliance ||
                          lord.Alliance ||
                          "Independent"}
                      </TableCell>
                      {isUsingApiData && (
                        <TableCell>
                          {lord.faction || lord.kingdom || "Unknown"}
                        </TableCell>
                      )}
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {displayData.length > 0 && (
                <div className="flex items-center justify-between p-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {isUsingApiData ? (
                      <>
                        Hiển thị {displayData.length} trong tổng số{" "}
                        <span className="font-medium">{lordsPagination.totalRecords}</span> Lords
                        {lordsPagination.currentPage && lordsPagination.totalPages && (
                          <span className="ml-2">
                            • Trang {lordsPagination.currentPage} / {lordsPagination.totalPages}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        Hiển thị {Math.min(10, displayData.length)} / {displayData.length} bản ghi đã import
                      </>
                    )}
                  </p>
                  
                  {/* Pagination Controls for API data */}
                  {isUsingApiData && lordsPagination.totalPages > 1 && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onFilterLords?.({ page: lordsPagination.currentPage - 1 })}
                        disabled={lordsPagination.currentPage <= 1 || lordsLoading}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Trước
                      </Button>
                      
                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {lordsPagination.currentPage > 2 && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onFilterLords?.({ page: 1 })}
                              disabled={lordsLoading}
                            >
                              1
                            </Button>
                            {lordsPagination.currentPage > 3 && (
                              <span className="px-2 text-muted-foreground">
                                <MoreHorizontal className="h-4 w-4" />
                              </span>
                            )}
                          </>
                        )}
                        
                        {lordsPagination.currentPage > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onFilterLords?.({ page: lordsPagination.currentPage - 1 })}
                            disabled={lordsLoading}
                          >
                            {lordsPagination.currentPage - 1}
                          </Button>
                        )}
                        
                        <Button variant="default" size="sm" disabled>
                          {lordsPagination.currentPage}
                        </Button>
                        
                        {lordsPagination.currentPage < lordsPagination.totalPages && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onFilterLords?.({ page: lordsPagination.currentPage + 1 })}
                            disabled={lordsLoading}
                          >
                            {lordsPagination.currentPage + 1}
                          </Button>
                        )}
                        
                        {lordsPagination.currentPage < lordsPagination.totalPages - 1 && (
                          <>
                            {lordsPagination.currentPage < lordsPagination.totalPages - 2 && (
                              <span className="px-2 text-muted-foreground">
                                <MoreHorizontal className="h-4 w-4" />
                              </span>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onFilterLords?.({ page: lordsPagination.totalPages })}
                              disabled={lordsLoading}
                            >
                              {lordsPagination.totalPages}
                            </Button>
                          </>
                        )}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onFilterLords?.({ page: lordsPagination.currentPage + 1 })}
                        disabled={lordsPagination.currentPage >= lordsPagination.totalPages || lordsLoading}
                      >
                        Tiếp
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
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
                {isUsingApiData
                  ? "Không có dữ liệu Lords trong database"
                  : "Sử dụng nút Import ở phía trên để import file Excel hoặc CSV và xem dữ liệu Lord tại đây"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
