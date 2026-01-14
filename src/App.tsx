import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout";
import OverviewPage from "./pages/OverviewPage";
import UsersPage from "./pages/UsersPage";
import MessesPage from "./pages/MessesPage";
import MessDashboardPage from "./pages/MessDashboardPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import ApplicationReviewPage from "./pages/ApplicationReviewPage";
import ProvidersPage from "./pages/ProvidersPage";
import VerificationPage from "./pages/VerificationPage";
import ActivityPage from "./pages/ActivityPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/messes" element={<MessesPage />} />
            <Route path="/mess/:id" element={<MessDashboardPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/application/:id" element={<ApplicationReviewPage />} />
            <Route path="/providers" element={<ProvidersPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
