// src/features/public/dashboard/components/CertificateCard.tsx
import { motion } from "framer-motion";
import { Download, Award } from "lucide-react";

export function CertificateCard({ eventTitle, certificateUrl }: { eventTitle: string; certificateUrl: string }) {
  return (
    <motion.a
      href={certificateUrl}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -3 }}
      className="flex items-center justify-between p-5 rounded-xl border border-neutral-200
                 dark:border-neutral-800 bg-gradient-to-br from-indigo-50 to-white
                 dark:from-indigo-500/10 dark:to-neutral-950"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-indigo-500 text-white flex items-center justify-center">
          <Award size={18} />
        </div>
        <div>
          <p className="font-medium text-sm text-neutral-900 dark:text-white">{eventTitle}</p>
          <p className="text-xs text-neutral-500">Certificate of Appreciation</p>
        </div>
      </div>
      <Download size={16} className="text-neutral-400" />
    </motion.a>
  );
}