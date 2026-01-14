import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockApplications, ProviderApplication } from "@/data/mockData";
import { VerificationCard } from "@/components/admin/VerificationCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, FileText } from "lucide-react";

export default function ApplicationsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      app.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = mockApplications.filter((a) => a.status === 'pending').length;

  const handleReview = (id: string) => {
    navigate(`/application/${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Provider Applications</h1>
          <p className="text-muted-foreground mt-1">
            {pendingCount} pending applications require review
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Status Summary */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-warning/10 border border-warning/20">
          <div className="h-2 w-2 rounded-full bg-warning" />
          <span className="text-sm font-medium text-warning">
            {mockApplications.filter(a => a.status === 'pending').length} Pending
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success/10 border border-success/20">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span className="text-sm font-medium text-success">
            {mockApplications.filter(a => a.status === 'approved').length} Approved
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20">
          <div className="h-2 w-2 rounded-full bg-destructive" />
          <span className="text-sm font-medium text-destructive">
            {mockApplications.filter(a => a.status === 'rejected').length} Rejected
          </span>
        </div>
      </div>

      {/* Applications List */}
      {filteredApplications.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredApplications.map((application, index) => (
            <VerificationCard
              key={application.id}
              application={application}
              onReview={handleReview}
              className={`animate-fade-in`}
              style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No applications found</p>
        </div>
      )}
    </div>
  );
}
