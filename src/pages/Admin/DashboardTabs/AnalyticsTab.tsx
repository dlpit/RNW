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
import { BarChart3 } from "lucide-react";

interface AnalyticsTabProps {
  importedData: any[];
  importInfo: {
    sheetName?: string;
    availableSheets?: string[];
    fileName?: string;
  };
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  importedData,
  importInfo,
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Imported Lord Data</CardTitle>
              <CardDescription>
                {importedData.length > 0 ? (
                  <div className="space-y-1">
                    <div>Hiển thị {importedData.length} bản ghi đã import</div>
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
                <Badge variant="outline">{importedData.length} records</Badge>
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
                Sử dụng nút Import ở phía trên để import file Excel hoặc CSV và
                xem dữ liệu Lord tại đây
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
