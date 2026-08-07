// shared/types/event.types.ts
export interface EventSummary {
  id: string;
  title: string;
  location: string;
  startDateUtc: string;
  capacity: number;
  registeredCount: number;
  categoryTags: string[];
  status: string;
}

export interface EventDetail extends EventSummary {
  description: string;
  endDateUtc: string;
  xpReward: number;
  registrations: VolunteerRegistration[];
}

export interface VolunteerRegistration {
  userId: string;
  fullName: string;
  registrationStatus: string;
  attendanceConfirmed: boolean;
  hoursLogged: number;
}

export interface CreateEventPayload {
  title: string;
  description: string;
  location: string;
  startDateUtc: string;
  endDateUtc: string;
  capacity: number;
  xpReward: number;
  categoryTags: string[];
}

export interface LeaderboardEntry {
  userId: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string | null;
  xp: number;
  rank: number;
  eventsCompleted: number;
  totalHours: number;
}