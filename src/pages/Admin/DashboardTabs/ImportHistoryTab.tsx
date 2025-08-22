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
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BarChart3 } from "lucide-react";

interface ImportHistoryTabProps {
  importHistory: any[];
  isLoadingHistory: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    limit: number;
  };
  onShowSheets: (fileName: string, sheets: string[]) => void;
}

const ImportHistoryTab: React.FC<ImportHistoryTabProps> = ({
  importHistory,
  isLoadingHistory,
  pagination,
  onShowSheets,
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Import History</CardTitle>
          <CardDescription>
            Lịch sử import file và thông tin chi tiết
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingHistory ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2">Đang tải lịch sử import...</span>
            </div>
          ) : importHistory.length > 0 ? (
            <>
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
                            {log.fileSize
                              ? log.fileSize > 1024 * 1024
                                ? `${(log.fileSize / (1024 * 1024)).toFixed(
                                    1
                                  )} MB`
                                : `${(log.fileSize / 1024).toFixed(1)} KB`
                              : "N/A"}{" "}
                            • {log.fileType?.toUpperCase() || "N/A"}
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
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs mt-1 h-6 px-2"
                                  onClick={() =>
                                    onShowSheets(log.fileName, log.sheetNames)
                                  }
                                >
                                  +{log.sheetNames.length - 1} more
                                </Button>
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
                            log.status === "success" ? "default" : "destructive"
                          }
                          className="text-xs"
                        >
                          {log.status === "success" ? "Thành công" : "Thất bại"}
                        </Badge>
                        {log.errorMessage && (
                          <div className="mt-1">
                            <TooltipProvider>
                              <UITooltip>
                                <TooltipTrigger asChild>
                                  <Badge
                                    variant="outline"
                                    className="text-xs cursor-help"
                                  >
                                    Error Details
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-sm">{log.errorMessage}</p>
                                </TooltipContent>
                              </UITooltip>
                            </TooltipProvider>
                          </div>
                        )}
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

              {/* Pagination Info */}
              {pagination.totalRecords > 0 && (
                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Hiển thị {importHistory.length} trong tổng số{" "}
                    {pagination.totalRecords} file imports
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Trang {pagination.currentPage} / {pagination.totalPages}
                  </p>
                </div>
              )}
            </>
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
    </div>
  );
};

export default ImportHistoryTab;
