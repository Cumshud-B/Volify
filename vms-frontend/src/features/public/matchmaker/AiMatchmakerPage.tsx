// src/features/public/matchmaker/AiMatchmakerPage.tsx
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { axiosClient } from "@/shared/api/axiosClient";
import { Sparkles, MapPin, Calendar } from "lucide-react";

interface EventMatch {
  eventId: string;
  matchScore: number;
  reason: string;
  title: string;
  location: string;
  startDateUtc: string;
}

export default function AiMatchmakerPage() {
  const { t } = useTranslation();

  const { data: matches, isLoading } = useQuery({
    queryKey: ["ai", "matchmaker"],
    queryFn: async () => (await axiosClient.get<EventMatch[]>("/ai/matchmaker")).data
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <Sparkles className="mx-auto text-indigo-500 mb-3" size={28} />
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{t("matchmaker.title")}</h1>
        <p className="text-neutral-500 mt-2">{t("matchmaker.subtitle")}</p>
      </motion.div>

      {isLoading && <p className="text-center text-neutral-400">{t("common.loading")}</p>}

      <div className="space-y-4">
        {matches?.map((m, i) => (
          <motion.div
            key={m.eventId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800
                       bg-white dark:bg-neutral-950 flex items-start justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-neutral-900 dark:text-white">{m.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600
                                  dark:bg-indigo-500/10 dark:text-indigo-400">
                  {Math.round(m.matchScore * 100)}% match
                </span>
              </div>
              <p className="text-sm text-neutral-500 mt-1">{m.reason}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-neutral-400">
                <span className="flex items-center gap-1"><MapPin size={12} /> {m.location}</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {new Date(m.startDateUtc).toLocaleDateString()}
                </span>
              </div>
            </div>
            <a
              href={`/events/${m.eventId}`}
              className="shrink-0 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium"
            >
              {t("matchmaker.viewEvent")}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}