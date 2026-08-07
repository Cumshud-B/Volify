// shared/types/admin.types.ts
export interface PendingVolunteer {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  skillsCsv: string;
  createdAtUtc: string;
}

export interface AnalyticsSummary {
  totalVolunteers: number;
  pendingApprovals: number;
  activeEvents: number;
  totalHoursLogged: number;
}