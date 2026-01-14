import { cn } from "@/lib/utils";

type StatusType = 'live' | 'pending' | 'suspended' | 'approved' | 'rejected' | 'active' | 'expired' | 'cancelled' | 'verified' | 'unverified';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  live: { label: 'Live', className: 'bg-success/10 text-success border-success/20' },
  active: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
  verified: { label: 'Verified', className: 'bg-success/10 text-success border-success/20' },
  approved: { label: 'Approved', className: 'bg-success/10 text-success border-success/20' },
  pending: { label: 'Pending', className: 'bg-warning/10 text-warning border-warning/20' },
  unverified: { label: 'Unverified', className: 'bg-warning/10 text-warning border-warning/20' },
  suspended: { label: 'Suspended', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  rejected: { label: 'Rejected', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  expired: { label: 'Expired', className: 'bg-muted text-muted-foreground border-border' },
  cancelled: { label: 'Cancelled', className: 'bg-muted text-muted-foreground border-border' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
