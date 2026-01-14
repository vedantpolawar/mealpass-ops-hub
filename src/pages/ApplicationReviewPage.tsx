import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockApplications } from "@/data/mockData";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { DocumentPreview } from "@/components/admin/DocumentPreview";
import { MapPreview } from "@/components/admin/MapPreview";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  IndianRupee,
  CheckCircle,
  XCircle,
  Rocket,
} from "lucide-react";

export default function ApplicationReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [fssaiVerified, setFssaiVerified] = useState(false);
  const [locationVerified, setLocationVerified] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const application = mockApplications.find((a) => a.id === id);

  if (!application) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">Application not found</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/applications")}>
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Applications
        </Button>
      </div>
    );
  }

  const canApprove = fssaiVerified && locationVerified;

  const handleApprove = () => {
    toast({
      title: "Provider Approved",
      description: `${application.businessName} is now LIVE on the platform.`,
    });
    setApproveModalOpen(false);
    navigate("/providers");
  };

  const handleReject = () => {
    toast({
      title: "Application Rejected",
      description: `${application.businessName} has been rejected.`,
      variant: "destructive",
    });
    setRejectModalOpen(false);
    navigate("/applications");
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/applications")}
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" />
        Back to Applications
      </Button>

      {/* Split Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Panel - Provider Details */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-foreground">
                    {application.businessName}
                  </h2>
                  <StatusBadge status={application.status} />
                </div>
                <p className="text-muted-foreground">{application.ownerName}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded bg-muted text-muted-foreground capitalize">
                {application.providerType}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{application.contact}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{application.email}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>{application.address}, {application.city}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                <span>₹{application.pricing}/month subscription</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-2">Food Category</p>
              <p className="font-medium">{application.foodCategory}</p>
            </div>
          </div>

          {/* Admin Notes */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Admin Notes</h3>
            <Textarea
              placeholder="Add notes about this application..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        {/* Right Panel - Verification Tabs */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Verification</h3>
          
          <Tabs defaultValue="document" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="document">Documents</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="decision">Decision</TabsTrigger>
            </TabsList>

            <TabsContent value="document" className="space-y-4">
              <DocumentPreview
                title="FSSAI License"
                documentUrl={application.fssaiDocumentUrl}
                licenseNumber={application.fssaiLicense}
                isVerified={fssaiVerified}
                onVerify={() => setFssaiVerified(true)}
                onReject={() => setFssaiVerified(false)}
              />
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <MapPreview
                address={`${application.address}, ${application.city}`}
                coords={application.locationCoords}
                isVerified={locationVerified}
                onVerify={(verified) => setLocationVerified(verified)}
              />
            </TabsContent>

            <TabsContent value="decision" className="space-y-6">
              {/* Verification Checklist */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Verification Checklist</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Checkbox
                      id="fssai-check"
                      checked={fssaiVerified}
                      onCheckedChange={(checked) => setFssaiVerified(checked as boolean)}
                    />
                    <label
                      htmlFor="fssai-check"
                      className="flex-1 text-sm font-medium cursor-pointer"
                    >
                      FSSAI License Verified
                    </label>
                    {fssaiVerified ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Checkbox
                      id="location-check"
                      checked={locationVerified}
                      onCheckedChange={(checked) => setLocationVerified(checked as boolean)}
                    />
                    <label
                      htmlFor="location-check"
                      className="flex-1 text-sm font-medium cursor-pointer"
                    >
                      Location Verified
                    </label>
                    {locationVerified ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t">
                <Button
                  className="w-full bg-success hover:bg-success/90 text-success-foreground"
                  disabled={!canApprove}
                  onClick={() => setApproveModalOpen(true)}
                >
                  <Rocket className="h-4 w-4 mr-1.5" />
                  Approve & Make Live
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => setRejectModalOpen(true)}
                >
                  <XCircle className="h-4 w-4 mr-1.5" />
                  Reject Application
                </Button>
                {!canApprove && (
                  <p className="text-xs text-center text-muted-foreground">
                    Complete all verifications to approve
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Approval Modal */}
      <ConfirmationModal
        open={approveModalOpen}
        onOpenChange={setApproveModalOpen}
        title="Approve & Make Live"
        description={`Are you sure you want to approve "${application.businessName}"? This will make the provider visible to all users on the platform.`}
        confirmLabel="Approve & Go Live"
        variant="success"
        onConfirm={handleApprove}
      />

      {/* Rejection Modal */}
      <ConfirmationModal
        open={rejectModalOpen}
        onOpenChange={setRejectModalOpen}
        title="Reject Application"
        description={`Are you sure you want to reject "${application.businessName}"? The provider will be notified of this decision.`}
        confirmLabel="Reject Application"
        variant="destructive"
        onConfirm={handleReject}
      />
    </div>
  );
}
