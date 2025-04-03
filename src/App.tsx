import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/404/NotFound";

// You'll need to create these components
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminSettings from "./pages/Admin/Settings";

const queryClient = new QueryClient();

// Replace this with your actual auth logic when needed
const useAuth = () => {
  // This is a placeholder - implement your actual auth logic here
  return {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  };
};

/* 
// Protected route component for authenticated users only
const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};
*/

// Temporary: Admin route component without permission checks (for testing only)
const AdminRoute = () => {
  // Bypassing admin check for testing purposes
  return <Outlet />;

  // Original code (commented out for testing)
  /*
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/" replace />;
  return <Outlet />;
  */
};

/*
// Unauthorized route component for non-authenticated users
const UnauthorizedRoute = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return <Outlet />;
};
*/

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public route */}
            <Route path="/" element={<Index />} />

            {/* 
            // Unauthorized routes (only for non-authenticated users)
            <Route element={<UnauthorizedRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            
            // Protected routes (only for authenticated users)
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Index />} />
            </Route>
            */}

            {/* Admin routes (only for admin users) */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* 404 catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
