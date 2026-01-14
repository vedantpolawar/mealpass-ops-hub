import { Subscriber } from "@/data/mockData";
import { StatusBadge } from "./StatusBadge";
import { Progress } from "@/components/ui/progress";

interface SubscriberListProps {
  subscribers: Subscriber[];
}

export function SubscriberList({ subscribers }: SubscriberListProps) {
  if (subscribers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">No subscribers yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {subscribers.map((subscriber, index) => {
        const progress = (subscriber.mealsUsed / subscriber.totalMeals) * 100;
        
        return (
          <div
            key={subscriber.id}
            className="flex items-center justify-between rounded-lg border bg-card p-4 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {subscriber.userName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{subscriber.userName}</p>
                  <p className="text-sm text-muted-foreground">
                    {subscriber.startDate} → {subscriber.endDate}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-4">
              <div className="w-32 hidden sm:block">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Meals used</span>
                  <span>{subscriber.mealsUsed}/{subscriber.totalMeals}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <StatusBadge status={subscriber.status} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
