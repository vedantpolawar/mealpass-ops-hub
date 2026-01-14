import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockMesses, Mess } from "@/data/mockData";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye, MapPin, ShieldCheck } from "lucide-react";

export default function ProvidersPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Only show live and suspended providers (not pending)
  const providers = mockMesses.filter((m) => m.status !== 'pending');
  const cities = [...new Set(providers.map((m) => m.city))];

  const filteredProviders = providers.filter((mess) => {
    const matchesSearch = mess.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = cityFilter === "all" || mess.city === cityFilter;
    const matchesType = typeFilter === "all" || mess.providerType === typeFilter;
    return matchesSearch && matchesCity && matchesType;
  });

  const liveCount = providers.filter((p) => p.status === 'live').length;

  const columns = [
    {
      key: "name",
      header: "Provider Name",
      render: (mess: Mess) => (
        <div>
          <p className="font-medium">{mess.name}</p>
          <p className="text-sm text-muted-foreground">{mess.ownerName}</p>
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
      render: (mess: Mess) => (
        <div className="flex items-center gap-1.5 text-sm">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{mess.city}</span>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (mess: Mess) => (
        <span className="capitalize text-sm">{mess.providerType}</span>
      ),
    },
    {
      key: "verification",
      header: "Verification",
      render: (mess: Mess) => (
        <div className="flex items-center gap-1.5">
          <ShieldCheck
            className={`h-4 w-4 ${mess.fssaiVerified ? "text-success" : "text-muted-foreground"}`}
          />
          <span className="text-sm">
            {mess.fssaiVerified ? "Verified" : "Pending"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (mess: Mess) => <StatusBadge status={mess.status} />,
    },
    {
      key: "subscribers",
      header: "Subscribers",
      render: (mess: Mess) => (
        <span className="font-medium">{mess.totalSubscribers}</span>
      ),
      className: "text-center",
    },
    {
      key: "actions",
      header: "",
      render: (mess: Mess) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/mess/${mess.id}`);
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Live Providers</h1>
          <p className="text-muted-foreground mt-1">
            {liveCount} active providers on the platform
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="mess">Mess</SelectItem>
              <SelectItem value="tiffin">Tiffin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Providers Table */}
      <DataTable
        data={filteredProviders}
        columns={columns}
        onRowClick={(mess) => navigate(`/mess/${mess.id}`)}
        emptyMessage="No providers found matching your filters"
      />
    </div>
  );
}
