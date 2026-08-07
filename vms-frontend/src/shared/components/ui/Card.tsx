// shared/components/ui/Card.tsx
import type { ReactNode } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-neutral-200 dark:border-neutral-800
                  bg-white dark:bg-neutral-950 p-5 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}