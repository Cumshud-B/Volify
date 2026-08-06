// src/app/routes/ProtectedRoute.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";

interface Props {
  children: ReactNode;
  requiredRole?: "Admin" | "Volunteer" | "EventCoordinator";
}

export function ProtectedRoute({ children, requiredRole }: Props) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null; // or a splash/spinner

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (requiredRole && !user?.roles.includes(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}