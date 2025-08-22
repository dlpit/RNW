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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Users, RefreshCw } from "lucide-react";

interface UserTabProps {
  membersData?: any[];
  membersLoading?: boolean;
  onRefreshMembers?: () => void;
}

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

const UserTab: React.FC<UserTabProps> = ({
  membersData = [],
  membersLoading = false,
  onRefreshMembers,
}) => {
  const isUsingMembersData = membersData && membersData.length > 0;
  const displayData = isUsingMembersData ? membersData : recentUsers;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {isUsingMembersData ? "Members Database" : "User Management"}
              </CardTitle>
              <CardDescription>
                {isUsingMembersData ? (
                  <div className="space-y-1">
                    <div>
                      Hiển thị {displayData.length} Members từ Lords Database
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Dữ liệu Members được trích xuất từ Lords API
                    </div>
                  </div>
                ) : (
                  "Manage your platform users and their roles"
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {isUsingMembersData && onRefreshMembers && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRefreshMembers}
                  disabled={membersLoading}
                >
                  <RefreshCw
                    className={`mr-2 h-4 w-4 ${
                      membersLoading ? "animate-spin" : ""
                    }`}
                  />
                  {membersLoading ? "Đang tải..." : "Refresh"}
                </Button>
              )}
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {isUsingMembersData ? "Add Member" : "Add User"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                {isUsingMembersData ? (
                  <>
                    <TableHead>Alliance</TableHead>
                    <TableHead>Power</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Kingdom</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                  </>
                )}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.length > 0 ? (
                displayData.map((item: any, index: number) => (
                  <TableRow key={isUsingMembersData ? item.id : item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Avatar className="mr-2 h-6 w-6">
                          <AvatarFallback>
                            {isUsingMembersData
                              ? (item.name || "M").charAt(0).toUpperCase()
                              : item.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {isUsingMembersData
                          ? item.name || `Member ${index + 1}`
                          : item.name}
                      </div>
                    </TableCell>
                    {isUsingMembersData ? (
                      <>
                        <TableCell>{item.alliance || "Independent"}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {(item.power || 0).toLocaleString()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {item.role || "Member"}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.kingdom || "Unknown"}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.role}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "active"
                                ? "default"
                                : item.status === "pending"
                                ? "outline"
                                : "secondary"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(item.joinedDate).toLocaleDateString()}
                        </TableCell>
                      </>
                    )}
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        {isUsingMembersData ? "View" : "Edit"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={isUsingMembersData ? 6 : 6}
                    className="text-center py-8"
                  >
                    <div className="text-muted-foreground">
                      <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Chưa có dữ liệu</p>
                      <p className="text-sm">
                        {isUsingMembersData
                          ? "Không có dữ liệu Members"
                          : "Chưa có người dùng nào"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserTab;
