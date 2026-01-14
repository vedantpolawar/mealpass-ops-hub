import { ProviderApplication } from "@/data/mockData";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { MapPin, FileText, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationCardProps {
  application: ProviderApplication;
  onReview: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function VerificationCard({ application, onReview, className, style }: VerificationCardProps) {
  const hasIssues = application.status === 'pending';
  
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-5 animate-fade-in",
        hasIssues && "border-l-4 border-l-warning",
        className
      )}
      style={style}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{application.businessName}</h3>
            <StatusBadge status={application.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">{application.ownerName}</p>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{application.submittedAt}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{application.city}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>{application.fssaiLicense}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t">
        <div className="flex-1 flex gap-2">
          <span
            className={cn(
              "inline-flex items-center px-2 py-1 rounded text-xs font-medium",
              "bg-muted text-muted-foreground"
            )}
          >
            {application.providerType === 'mess' ? 'Mess' : 'Tiffin'}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground">
            ₹{application.pricing}/month
          </span>
        </div>
        <Button size="sm" onClick={() => onReview(application.id)} className="gap-1.5">
          Review
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
