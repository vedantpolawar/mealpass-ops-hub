import { IndianRupee, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface EarningsCardProps {
  title: string;
  amount: number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success';
  className?: string;
}

export function EarningsCard({
  title,
  amount,
  subtitle,
  trend,
  variant = 'default',
  className,
}: EarningsCardProps) {
  const formatCurrency = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K`;
    }
    return `₹${value}`;
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-5 animate-fade-in",
        variant === 'primary' && "bg-primary text-primary-foreground border-primary",
        variant === 'success' && "bg-success/10 border-success/20",
        variant === 'default' && "bg-card",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              variant === 'primary' ? "text-primary-foreground/80" : "text-muted-foreground"
            )}
          >
            {title}
          </p>
          <div className="mt-2 flex items-center gap-1">
            <IndianRupee
              className={cn(
                "h-5 w-5",
                variant === 'primary' ? "text-primary-foreground" : "text-foreground"
              )}
            />
            <span
              className={cn(
                "text-2xl font-bold",
                variant === 'primary' ? "text-primary-foreground" : "text-foreground"
              )}
            >
              {formatCurrency(amount)}
            </span>
          </div>
          {subtitle && (
            <p
              className={cn(
                "mt-1 text-xs",
                variant === 'primary' ? "text-primary-foreground/70" : "text-muted-foreground"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend.isPositive ? "text-success" : "text-destructive",
              variant === 'primary' && (trend.isPositive ? "text-success" : "text-destructive")
            )}
          >
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
