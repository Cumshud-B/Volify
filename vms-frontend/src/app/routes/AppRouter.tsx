// src/app/routes/AppRouter.tsx
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PublicLayout } from "./PublicLayout";
import { AdminLayout } from "./AdminLayout";
import { ProtectedRoute } from "./ProtectedRoute";

const LandingPage = lazy(() => import("@/features/public/landing/LandingPage").then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import("@/features/public/auth/LoginPage"));
const PersonalCabinetPage = lazy(() => import("@/features/public/dashboard/PersonalCabinetPage"));
const LeaderboardPage = lazy(() => import("@/features/public/leaderboard/LeaderboardPage"));

const AdminOverviewPage = lazy(() => import("@/features/admin/overview/AdminOverviewPage"));
const VolunteerApprovalsPage = lazy(() => import("@/features/admin/volunteers/VolunteerApprovalsPage"));
const EventManagementPage = lazy(() => import("@/features/admin/events/EventManagementPage"));
const QrAttendancePage = lazy(() => import("@/features/admin/attendance/QrAttendancePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "dashboard",
        element: <ProtectedRoute requiredRole="Volunteer"><PersonalCabinetPage /></ProtectedRoute>
      },
      { path: "leaderboard", element: <LeaderboardPage /> }
    ]
  },
  {
    path: "/admin",
    element: <ProtectedRoute requiredRole="Admin"><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <AdminOverviewPage /> },
      { path: "volunteers", element: <VolunteerApprovalsPage /> },
      { path: "events", element: <EventManagementPage /> },
      { path: "attendance", element: <QrAttendancePage /> }
    ]
  }
]);

export function AppRouter() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}