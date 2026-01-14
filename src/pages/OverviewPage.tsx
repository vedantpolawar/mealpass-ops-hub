import { Users, Store, ShieldCheck, IndianRupee, TrendingUp, UtensilsCrossed } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { overviewStats, userGrowthData, monthlyEarningsData } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function OverviewPage() {
  const formatCurrency = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor platform performance and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          title="Total Users"
          value={overviewStats.totalUsers.toLocaleString()}
          icon={Users}
          trend={{ value: 7.2, isPositive: true }}
        />
        <StatCard
          title="Total Messes"
          value={overviewStats.totalMesses}
          icon={UtensilsCrossed}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Live Messes"
          value={overviewStats.liveMesses}
          icon={Store}
        />
        <StatCard
          title="Pending Verifications"
          value={overviewStats.pendingVerifications}
          icon={ShieldCheck}
        />
        <StatCard
          title="Platform Revenue"
          value={formatCurrency(overviewStats.platformRevenue)}
          icon={IndianRupee}
          trend={{ value: overviewStats.monthlyGrowth, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth Chart */}
        <div className="rounded-lg border bg-card p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">User Growth</h3>
              <p className="text-sm text-muted-foreground">Monthly registered users</p>
            </div>
            <div className="flex items-center gap-1 text-success text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              <span>+7.7%</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#userGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="rounded-lg border bg-card p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Monthly Revenue</h3>
              <p className="text-sm text-muted-foreground">Platform earnings by month</p>
            </div>
            <div className="flex items-center gap-1 text-success text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              <span>+7.3%</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyEarningsData}>
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
                <Bar
                  dataKey="earnings"
                  fill="hsl(var(--accent))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border bg-card p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="/applications"
            className="flex items-center gap-3 rounded-lg border bg-background p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <ShieldCheck className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="font-medium text-foreground">Review Applications</p>
              <p className="text-sm text-muted-foreground">{overviewStats.pendingVerifications} pending</p>
            </div>
          </a>
          <a
            href="/messes"
            className="flex items-center gap-3 rounded-lg border bg-background p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <UtensilsCrossed className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">View All Messes</p>
              <p className="text-sm text-muted-foreground">{overviewStats.totalMesses} registered</p>
            </div>
          </a>
          <a
            href="/users"
            className="flex items-center gap-3 rounded-lg border bg-background p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <Users className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="font-medium text-foreground">Manage Users</p>
              <p className="text-sm text-muted-foreground">{overviewStats.totalUsers} users</p>
            </div>
          </a>
          <a
            href="/providers"
            className="flex items-center gap-3 rounded-lg border bg-background p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Store className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-medium text-foreground">Live Providers</p>
              <p className="text-sm text-muted-foreground">{overviewStats.liveMesses} active</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
