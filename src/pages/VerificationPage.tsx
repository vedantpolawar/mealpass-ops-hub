import { useNavigate } from "react-router-dom";
import { mockApplications } from "@/data/mockData";
import { VerificationCard } from "@/components/admin/VerificationCard";
import { AlertTriangle, FileText, MapPin, ShieldAlert } from "lucide-react";

export default function VerificationPage() {
  const navigate = useNavigate();

  // Filter pending applications
  const pendingApplications = mockApplications.filter((a) => a.status === 'pending');

  // Categorize by verification needs
  const missingFssai = pendingApplications.filter((a) => !a.fssaiLicense.startsWith('FSSAI'));
  const pendingLocation = pendingApplications.filter((a) => a.locationCoords.lat === 0);
  const readyForReview = pendingApplications.filter(
    (a) => a.fssaiLicense.startsWith('FSSAI') && a.locationCoords.lat !== 0
  );

  const handleReview = (id: string) => {
    navigate(`/application/${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Verification Queue</h1>
        <p className="text-muted-foreground mt-1">
          {pendingApplications.length} applications pending verification
        </p>
      </div>

      {/* Priority Indicators */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
            <ShieldAlert className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="text-2xl font-bold">{missingFssai.length}</p>
            <p className="text-sm text-muted-foreground">Missing FSSAI</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
            <MapPin className="h-6 w-6 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold">{pendingLocation.length}</p>
            <p className="text-sm text-muted-foreground">Pending Location</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
            <FileText className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold">{readyForReview.length}</p>
            <p className="text-sm text-muted-foreground">Ready for Review</p>
          </div>
        </div>
      </div>

      {/* Pending Applications */}
      {pendingApplications.length > 0 ? (
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Pending Verifications
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingApplications.map((application, index) => (
              <VerificationCard
                key={application.id}
                application={application}
                onReview={handleReview}
                className={`animate-fade-in`}
                style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center rounded-lg border bg-card">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mb-4">
            <FileText className="h-8 w-8 text-success" />
          </div>
          <p className="text-lg font-medium text-foreground">All caught up!</p>
          <p className="text-muted-foreground mt-1">
            No pending verifications at the moment
          </p>
        </div>
      )}
    </div>
  );
}
