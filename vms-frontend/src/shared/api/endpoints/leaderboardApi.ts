// shared/api/endpoints/leaderboardApi.ts
import { axiosClient } from "../axiosClient";
import type { LeaderboardEntry } from "@/shared/types/event.types";

export const leaderboardApi = {
  getTop: (take: number = 50) =>
    axiosClient.get<LeaderboardEntry[]>("/leaderboard", { params: { take } }).then(r => r.data),

  getMyRank: () =>
    axiosClient.get<LeaderboardEntry>("/leaderboard/me").then(r => r.data)
};