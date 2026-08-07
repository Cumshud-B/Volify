// shared/api/endpoints/adminApi.ts
import { axiosClient } from "../axiosClient";
import type { PendingVolunteer, AnalyticsSummary } from "@/shared/types/admin.types";

export const adminApi = {
  getPendingVolunteers: () =>
    axiosClient.get<PendingVolunteer[]>("/admin/volunteers/pending").then(r => r.data),

  approveVolunteer: (userId: string) =>
    axiosClient.post(`/admin/volunteers/${userId}/approve`).then(r => r.data),

  rejectVolunteer: (userId: string, reason: string) =>
    axiosClient.post(`/admin/volunteers/${userId}/reject`, { reason }).then(r => r.data),

  getAnalyticsSummary: () =>
    axiosClient.get<AnalyticsSummary>("/admin/analytics/summary").then(r => r.data),

  getAuditLogs: () =>
    axiosClient.get("/admin/audit-logs").then(r => r.data)
};