import { useState } from "react";
import { mockUsers, User } from "@/data/mockData";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, ArrowLeft, Mail, Phone, MapPin, Calendar, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: "name",
      header: "User Name",
      render: (user: User) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="font-medium">{user.name}</span>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Email / Phone",
      render: (user: User) => (
        <div className="space-y-0.5">
          <p className="text-sm">{user.email}</p>
          <p className="text-xs text-muted-foreground">{user.phone}</p>
        </div>
      ),
    },
    {
      key: "city",
      header: "City",
    },
    {
      key: "subscription",
      header: "Active Subscription",
      render: (user: User) => (
        <StatusBadge status={user.hasActiveSubscription ? "active" : "expired"} />
      ),
    },
    {
      key: "joinedDate",
      header: "Joined Date",
      render: (user: User) => (
        <span className="text-muted-foreground">{user.joinedDate}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (user: User) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedUser(user);
          }}
        >
          <Eye className="h-4 w-4 mr-1.5" />
          View
        </Button>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Users</h1>
          <p className="text-muted-foreground mt-1">
            {mockUsers.length} registered users
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Users Table */}
      <DataTable
        data={filteredUsers}
        columns={columns}
        onRowClick={(user) => setSelectedUser(user as User)}
        emptyMessage="No users found"
      />

      {/* User Profile Sheet */}
      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedUser && (
            <>
              <SheetHeader className="pb-6 border-b">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <SheetTitle className="text-xl">{selectedUser.name}</SheetTitle>
                    <StatusBadge
                      status={selectedUser.hasActiveSubscription ? "active" : "expired"}
                      className="mt-2"
                    />
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-6 py-6">
                {/* Contact Info */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedUser.city}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {selectedUser.joinedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Active Subscriptions */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Active Subscriptions</h4>
                  {selectedUser.subscriptions.length > 0 ? (
                    <div className="space-y-3">
                      {selectedUser.subscriptions.map((sub) => {
                        const progress = ((sub.totalMeals - sub.mealsRemaining) / sub.totalMeals) * 100;
                        return (
                          <div key={sub.messId} className="rounded-lg border bg-muted/30 p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{sub.messName}</span>
                              <span className="text-xs text-muted-foreground">
                                {sub.startDate} → {sub.endDate}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Meals used</span>
                                <span>{sub.totalMeals - sub.mealsRemaining}/{sub.totalMeals}</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No active subscriptions</p>
                  )}
                </div>

                {/* Order History */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Recent Orders</h4>
                  {selectedUser.orderHistory.length > 0 ? (
                    <div className="space-y-2">
                      {selectedUser.orderHistory.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between rounded-lg border bg-card p-3"
                        >
                          <div>
                            <p className="text-sm font-medium">{order.messName}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.mealType} • {order.date}
                            </p>
                          </div>
                          <StatusBadge status={order.scanned ? "verified" : "pending"} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No order history</p>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
