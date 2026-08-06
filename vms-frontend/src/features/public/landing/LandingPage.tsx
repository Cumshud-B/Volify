import { motion, type Variants, easeOut } from "framer-motion";
import { HeroCanvas } from "./components/HeroCanvas";
import { useTranslation } from "react-i18next";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

export function LandingPage() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroCanvas />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          {t("landing.title")}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg text-neutral-600 dark:text-neutral-300"
        >
          {t("landing.subtitle")}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex justify-center gap-4"
        >
          <motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-full bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-500/30"
          >
            {t("landing.cta_join")}
          </motion.a>

          <motion.a
            href="/events"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium"
          >
            {t("landing.cta_explore")}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}