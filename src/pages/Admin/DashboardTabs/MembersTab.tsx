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

interface MembersTabProps {
  membersData: any[];
  loading: boolean;
  onRefresh: () => void;
}

const MembersTab: React.FC<MembersTabProps> = ({
  membersData,
  loading,
  onRefresh,
}) => {
  const formatPower = (power: number) => {
    return power.toLocaleString();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Alliance Members</CardTitle>
              <CardDescription>
                {membersData.length > 0 ? (
                  <div className="space-y-1">
                    <div>Hiển thị {membersData.length} thành viên alliance</div>
                    <div className="text-xs text-muted-foreground">
                      Dữ liệu từ Lords database
                    </div>
                  </div>
                ) : (
                  "Dữ liệu thành viên alliance từ Lords records"
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              {membersData.length > 0 && (
                <Badge variant="outline">{membersData.length} members</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2">Đang tải dữ liệu Members...</span>
            </div>
          ) : membersData.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Lord ID</TableHead>
                    <TableHead>Current Power</TableHead>
                    <TableHead>Merit Ranking</TableHead>
                    <TableHead>Faction</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {membersData.map((member, index) => (
                    <TableRow key={member.id || index}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="" alt={member.name} />
                            <AvatarFallback className="text-xs">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium truncate">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.allianceTag}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {member.lordId}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {formatPower(member.currentPower)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={member.meritRanking <= 100 ? "default" : "outline"}>
                          #{member.meritRanking}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.faction}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={member.currentPower > 0 ? "default" : "secondary"}
                        >
                          {member.currentPower > 0 ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Chưa có dữ liệu Members</h3>
              <p className="text-muted-foreground">
                Import dữ liệu Lords để xem thông tin thành viên alliance
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MembersTab;
