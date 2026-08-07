// shared/api/endpoints/eventsApi.ts
import { axiosClient } from "../axiosClient";
import type { EventSummary, EventDetail, CreateEventPayload } from "@/shared/types/event.types";

export const eventsApi = {
  getAll: (params?: { search?: string; category?: string; page?: number }) =>
    axiosClient.get<EventSummary[]>("/events", { params }).then(r => r.data),

  getById: (id: string) =>
    axiosClient.get<EventDetail>(`/events/${id}`).then(r => r.data),

  create: (payload: CreateEventPayload) =>
    axiosClient.post("/events", payload).then(r => r.data),

  register: (eventId: string) =>
    axiosClient.post(`/events/${eventId}/register`).then(r => r.data),

  checkIn: (eventId: string, token: string) =>
    axiosClient.post(`/events/${eventId}/check-in`, { token }).then(r => r.data)
};