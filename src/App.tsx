import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import LoginPage from "@/components/LoginPage";
import CitizenDashboard from "@/pages/CitizenDashboard";
import ChampionDashboard from "@/pages/ChampionDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import WorkerDashboard from "@/pages/WorkerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <LoginPage />;
  }
  
  return <Layout>{children}</Layout>;
};

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const getDashboardComponent = () => {
    switch (user.role) {
      case 'citizen': return <CitizenDashboard />;
      case 'champion': return <ChampionDashboard />;
      case 'admin': return <AdminDashboard />;
      case 'worker': return <WorkerDashboard />;
      default: return <div>Invalid user role</div>;
    }
  };
  
  return getDashboardComponent();
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;