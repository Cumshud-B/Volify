// shared/components/ui/Badge.tsx
export function Badge({ children, color = "indigo" }: { children: React.ReactNode; color?: "indigo" | "emerald" | "rose" | "amber" }) {
  const colorClasses = {
    indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      {children}
    </span>
  );
}