// src/features/public/dashboard/components/ActivityTimeline.tsx
import { motion } from "framer-motion";

interface ActivityItem {
  id: string;
  eventTitle: string;
  eventDate: string;
  registrationStatus: string;
  attendanceConfirmed: boolean;
  hoursLogged: number;
}

const statusColor: Record<string, string> = {
  Approved: "bg-emerald-500",
  Pending: "bg-amber-500",
  Rejected: "bg-rose-500"
};

export function ActivityTimeline({ activities }: { activities: ActivityItem[] }) {
  if (activities.length === 0) {
    return <p className="text-sm text-neutral-400">No activity yet — browse events to get started.</p>;
  }

  return (
    <ol className="relative border-l border-neutral-200 dark:border-neutral-800 ml-2 space-y-6">
      {activities.map((a, i) => (
        <motion.li
          key={a.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="ml-6"
        >
          <span
            className={`absolute -left-1.5 w-3 h-3 rounded-full ${statusColor[a.registrationStatus] ?? "bg-neutral-400"}`}
          />
          <p className="font-medium text-neutral-900 dark:text-white">{a.eventTitle}</p>
          <p className="text-sm text-neutral-500">
            {new Date(a.eventDate).toLocaleDateString()} · {a.registrationStatus}
            {a.attendanceConfirmed && ` · ${a.hoursLogged}h logged`}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}