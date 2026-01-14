import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { UserCircle, Mail, Phone, Shield, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your admin account settings
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <UserCircle className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Admin User</h2>
            <p className="text-sm text-muted-foreground">Platform Administrator</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Admin User" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Super Admin" disabled />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" defaultValue="admin@mealpass.in" className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="phone" defaultValue="+91 98765 00000" className="pl-9" />
              </div>
            </div>
          </div>
          <Button className="mt-2">Save Changes</Button>
        </div>
      </div>

      {/* Security Section */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Security</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" placeholder="••••••••" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" />
            </div>
          </div>
          <Button variant="outline">Update Password</Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
        <h3 className="font-semibold text-foreground mb-2">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Log out of your admin session. You will need to log in again to access the dashboard.
        </p>
        <Button
          variant="outline"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-1.5" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
