import { useParams, useNavigate } from "react-router-dom";
import { mockMesses, mockSubscribers, monthlyEarningsData } from "@/data/mockData";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EarningsCard } from "@/components/admin/EarningsCard";
import { SubscriberList } from "@/components/admin/SubscriberList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Phone,
  FileText,
  Users,
  IndianRupee,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function MessDashboardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);

  const mess = mockMesses.find((m) => m.id === id);

  if (!mess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">Mess not found</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/messes")}>
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Messes
        </Button>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    }
    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K`;
    }
    return `₹${value}`;
  };

  const activeSubscribers = mockSubscribers.filter((s) => s.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => navigate("/messes")}
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to All Messes
        </Button>

        {/* Mess Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-foreground">{mess.name}</h1>
              <StatusBadge status={mess.status} />
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{mess.address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="h-4 w-4" />
                <span>{mess.contact}</span>
              </div>
            </div>
          </div>

          {/* FSSAI Badge */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                mess.fssaiVerified
                  ? "bg-success/10 border-success/20 text-success"
                  : "bg-warning/10 border-warning/20 text-warning"
              }`}
            >
              {mess.fssaiVerified ? (
                <ShieldCheck className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <div>
                <p className="text-xs font-medium">FSSAI License</p>
                <p className="text-sm font-semibold">{mess.fssaiVerified ? "Verified" : "Pending"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <EarningsCard
          title="Total Subscribers"
          amount={mess.totalSubscribers}
          subtitle="All time"
          variant="default"
        />
        <EarningsCard
          title="Active Subscriptions"
          amount={activeSubscribers}
          subtitle="Currently active"
          variant="success"
        />
        <EarningsCard
          title="Monthly Subscription"
          amount={mess.subscriptionPrice}
          subtitle="Per user"
        />
        <EarningsCard
          title="Total Earnings"
          amount={mess.monthlyRevenue}
          subtitle="This month"
          trend={{ value: 12.5, isPositive: true }}
          variant="primary"
        />
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="subscribers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="details">Mess Details</TabsTrigger>
          <TabsTrigger value="actions">Admin Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="subscribers" className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground">Subscriber Breakdown</h3>
                <p className="text-sm text-muted-foreground">
                  {mockSubscribers.length} total subscriptions
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-success" />
                  <span className="text-muted-foreground">Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-muted" />
                  <span className="text-muted-foreground">Expired</span>
                </div>
              </div>
            </div>
            <SubscriberList subscribers={mockSubscribers} />
          </div>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-lg border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-6">Monthly Earnings Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyEarningsData}>
                    <defs>
                      <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => `₹${value / 1000}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Earnings']}
                    />
                    <Area
                      type="monotone"
                      dataKey="earnings"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      fill="url(#earningsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-5">
                <p className="text-sm font-medium text-muted-foreground mb-2">Monthly Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(mess.monthlyRevenue)}</p>
                <p className="text-xs text-muted-foreground mt-1">Subscription-based only</p>
              </div>
              <div className="rounded-lg border bg-card p-5">
                <p className="text-sm font-medium text-muted-foreground mb-2">Platform Commission</p>
                <p className="text-2xl font-bold">{formatCurrency(mess.platformCommission)}</p>
                <p className="text-xs text-muted-foreground mt-1">10% of revenue</p>
              </div>
              <div className="rounded-lg border bg-card p-5">
                <p className="text-sm font-medium text-muted-foreground mb-2">Net Earnings</p>
                <p className="text-2xl font-bold text-success">
                  {formatCurrency(mess.monthlyRevenue - mess.platformCommission)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">After commission</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-4">Business Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Owner Name</span>
                  <span className="font-medium">{mess.ownerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider Type</span>
                  <span className="font-medium capitalize">{mess.providerType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Food Category</span>
                  <span className="font-medium">{mess.foodCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">City</span>
                  <span className="font-medium">{mess.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registered On</span>
                  <span className="font-medium">{mess.createdAt}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-4">Verification Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">FSSAI License</span>
                  </div>
                  <StatusBadge status={mess.fssaiVerified ? "verified" : "unverified"} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Location</span>
                  </div>
                  <StatusBadge status={mess.locationVerified ? "verified" : "unverified"} />
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground mb-1">FSSAI Number</p>
                  <p className="font-mono font-medium">{mess.fssaiLicense}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Admin Actions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <p className="font-medium">Suspend Mess</p>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable this mess from the platform
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => setSuspendModalOpen(true)}
                >
                  <XCircle className="h-4 w-4 mr-1.5" />
                  Suspend
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <p className="font-medium">Mark Inactive</p>
                  <p className="text-sm text-muted-foreground">
                    Mark this mess as inactive (owner requested)
                  </p>
                </div>
                <Button variant="outline">Mark Inactive</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <p className="font-medium">View Documents</p>
                  <p className="text-sm text-muted-foreground">
                    Review all verification documents
                  </p>
                </div>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-1.5" />
                  View
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Suspend Modal */}
      <ConfirmationModal
        open={suspendModalOpen}
        onOpenChange={setSuspendModalOpen}
        title="Suspend Mess"
        description={`Are you sure you want to suspend "${mess.name}"? This will hide the mess from users and pause all subscriptions.`}
        confirmLabel="Suspend Mess"
        variant="destructive"
        onConfirm={() => {
          setSuspendModalOpen(false);
          // Handle suspension logic
        }}
      />
    </div>
  );
}
