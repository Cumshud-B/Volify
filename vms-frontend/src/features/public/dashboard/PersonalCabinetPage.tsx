// src/features/public/dashboard/PersonalCabinetPage.tsx
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { axiosClient } from "@/shared/api/axiosClient";
import { useAuth } from "@/shared/hooks/useAuth";
import { ActivityTimeline } from "./components/ActivityTimeline";
import { CertificateCard } from "./components/CertificateCard";

interface MyActivity {
  id: string;
  eventTitle: string;
  eventDate: string;
  registrationStatus: string;
  attendanceConfirmed: boolean;
  hoursLogged: number;
  certificateUrl: string | null;
}

export default function PersonalCabinetPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: activities, isLoading } = useQuery({
    queryKey: ["me", "activities"],
    queryFn: async () => (await axiosClient.get<MyActivity[]>("/users/me/activities")).data
  });

  const completedWithCertificate = activities?.filter(a => a.certificateUrl) ?? [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center
                        justify-center text-xl font-semibold">
          {user?.firstName?.[0]}{user?.lastName?.[0]}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-sm text-neutral-500">{user?.email}</p>
        </div>
      </motion.div>

      <section>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          {t("cabinet.activityLog")}
        </h2>
        {isLoading ? (
          <p className="text-sm text-neutral-400">{t("common.loading")}</p>
        ) : (
          <ActivityTimeline activities={activities ?? []} />
        )}
      </section>

      {completedWithCertificate.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            {t("cabinet.certificates")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {completedWithCertificate.map(a => (
              <CertificateCard key={a.id} eventTitle={a.eventTitle} certificateUrl={a.certificateUrl!} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}