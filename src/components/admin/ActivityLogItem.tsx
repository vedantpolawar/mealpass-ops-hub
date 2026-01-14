import { ActivityLog } from "@/data/mockData";
import { User, Store, FileText, Settings, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityLogItemProps {
  log: ActivityLog;
  isLast?: boolean;
}

const entityIcons = {
  user: User,
  mess: Store,
  provider: FileText,
  system: Settings,
};

const entityColors = {
  user: "bg-blue-100 text-blue-600",
  mess: "bg-amber-100 text-amber-600",
  provider: "bg-green-100 text-green-600",
  system: "bg-purple-100 text-purple-600",
};

export function ActivityLogItem({ log, isLast }: ActivityLogItemProps) {
  const Icon = entityIcons[log.entityType];
  const colorClass = entityColors[log.entityType];

  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", colorClass)}>
          <Icon className="h-5 w-5" />
        </div>
        {!isLast && <div className="w-px flex-1 bg-border mt-2" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <p className="font-medium text-foreground">{log.action}</p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">{log.entityName}</span>
              {" • "}
              {log.adminName}
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{log.timestamp}</span>
          </div>
        </div>
        {log.details && (
          <p className="mt-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
            {log.details}
          </p>
        )}
      </div>
    </div>
  );
}
