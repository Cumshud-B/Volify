// src/app/providers/AppProviders.tsx
import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { I18nProvider } from "./I18nProvider";
import { AuthProvider } from "./AuthProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>{children}</AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}