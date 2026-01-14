import { MapPin, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MapPreviewProps {
  address: string;
  coords: { lat: number; lng: number };
  isVerified?: boolean;
  onVerify?: (verified: boolean) => void;
  className?: string;
}

export function MapPreview({
  address,
  coords,
  isVerified,
  onVerify,
  className,
}: MapPreviewProps) {
  const [addressMatch, setAddressMatch] = useState(false);

  return (
    <div className={cn("rounded-lg border bg-card p-5", className)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-foreground">Location Verification</h4>
          <p className="text-sm text-muted-foreground mt-1">{address}</p>
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

      {/* Map Preview Area */}
      <div className="relative h-48 bg-muted/50 rounded-lg border border-border mb-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50">
          {/* Mock map grid pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="absolute w-full border-t border-foreground" style={{ top: `${i * 10}%` }} />
            ))}
            {[...Array(10)].map((_, i) => (
              <div key={i} className="absolute h-full border-l border-foreground" style={{ left: `${i * 10}%` }} />
            ))}
          </div>
          
          {/* Pin marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
            <div className="relative">
              <MapPin className="h-8 w-8 text-destructive fill-destructive" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-destructive/30" />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-muted-foreground">
          {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
        </div>
      </div>

      {/* Verification Controls */}
      {onVerify && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Checkbox
              id="address-match"
              checked={addressMatch}
              onCheckedChange={(checked) => setAddressMatch(checked as boolean)}
            />
            <label
              htmlFor="address-match"
              className="text-sm font-medium cursor-pointer"
            >
              Address matches pin location
            </label>
          </div>
          
          <Button
            onClick={() => onVerify(addressMatch)}
            disabled={!addressMatch}
            className="w-full bg-success hover:bg-success/90 text-success-foreground"
          >
            <CheckCircle className="h-4 w-4 mr-1.5" />
            Approve Location
          </Button>
        </div>
      )}
    </div>
  );
}
