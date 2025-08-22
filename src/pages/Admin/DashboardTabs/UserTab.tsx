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
import { PlusCircle } from "lucide-react";

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

const UserTab: React.FC = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default UserTab;
