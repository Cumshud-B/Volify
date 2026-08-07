// shared/api/endpoints/authApi.ts
import { axiosClient } from "../axiosClient";
import type { AuthResult, LoginPayload, RegisterPayload } from "@/shared/types/auth.types";

export const authApi = {
  login: (payload: LoginPayload) =>
    axiosClient.post<AuthResult>("/auth/login", payload).then(r => r.data),

  register: (payload: RegisterPayload) =>
    axiosClient.post("/auth/register", payload).then(r => r.data),

  forgotPassword: (email: string) =>
    axiosClient.post("/auth/forgot-password", { email }).then(r => r.data),

  resetPassword: (payload: { email: string; otpCode: string; newPassword: string }) =>
    axiosClient.post("/auth/reset-password", payload).then(r => r.data),

  logout: () => axiosClient.post("/auth/logout")
};