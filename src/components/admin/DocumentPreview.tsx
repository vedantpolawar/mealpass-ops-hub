import { FileText, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DocumentPreviewProps {
  title: string;
  documentUrl: string;
  licenseNumber: string;
  isVerified?: boolean;
  onVerify?: () => void;
  onReject?: () => void;
  className?: string;
}

export function DocumentPreview({
  title,
  documentUrl,
  licenseNumber,
  isVerified,
  onVerify,
  onReject,
  className,
}: DocumentPreviewProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-5", className)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">License: {licenseNumber}</p>
        </div>
        {isVerified !== undefined && (
          <div className={cn(
            "flex items-center gap-1.5 text-sm font-medium",
            isVerified ? "text-success" : "text-warning"
          )}>
            {isVerified ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Verified</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                <span>Pending</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Document Preview Area */}
      <div className="flex items-center justify-center h-40 bg-muted/50 rounded-lg border border-dashed border-border mb-4">
        <div className="text-center">
          <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">FSSAI License Document</p>
          <Button variant="link" size="sm" className="mt-2 gap-1">
            <ExternalLink className="h-3.5 w-3.5" />
            View Full Document
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      {onVerify && onReject && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onReject}
            className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <XCircle className="h-4 w-4 mr-1.5" />
            Reject
          </Button>
          <Button
            size="sm"
            onClick={onVerify}
            className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
          >
            <CheckCircle className="h-4 w-4 mr-1.5" />
            Verify
          </Button>
        </div>
      )}
    </div>
  );
}
