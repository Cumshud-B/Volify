// src/features/public/auth/RegisterPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { axiosClient } from "@/shared/api/axiosClient";

const SKILL_OPTIONS = ["Logistics", "First Aid", "Photography", "Translation", "Public Speaking", "IT Support"];
const INTEREST_OPTIONS = ["Environment", "Health", "Education", "Community", "Sports", "Arts"];

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", phoneNumber: ""
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await axiosClient.post("/auth/register", { ...form, skills, interests });
      navigate("/login", { state: { message: t("register.success") } });
    } catch (err: any) {
      setError(err.response?.data?.error ?? t("register.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-neutral-900 dark:text-white mb-8"
      >
        {t("register.title")}
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            required
            placeholder={t("register.firstName")}
            value={form.firstName}
            onChange={e => setForm({ ...form, firstName: e.target.value })}
            className="px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700
                       bg-transparent text-sm text-neutral-900 dark:text-white"
          />
          <input
            required
            placeholder={t("register.lastName")}
            value={form.lastName}
            onChange={e => setForm({ ...form, lastName: e.target.value })}
            className="px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700
                       bg-transparent text-sm text-neutral-900 dark:text-white"
          />
        </div>

        <input
          required
          type="email"
          placeholder={t("register.email")}
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700
                     bg-transparent text-sm text-neutral-900 dark:text-white"
        />

        <input
          required
          type="password"
          minLength={8}
          placeholder={t("register.password")}
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700
                     bg-transparent text-sm text-neutral-900 dark:text-white"
        />

        <input
          placeholder={t("register.phone")}
          value={form.phoneNumber}
          onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700
                     bg-transparent text-sm text-neutral-900 dark:text-white"
        />

        <div>
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {t("register.skills")}
          </p>
          <div className="flex flex-wrap gap-2">
            {SKILL_OPTIONS.map(skill => (
              <button
                type="button"
                key={skill}
                onClick={() => toggle(skills, setSkills, skill)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  skills.includes(skill)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {t("register.interests")}
          </p>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map(interest => (
              <button
                type="button"
                key={interest}
                onClick={() => toggle(interests, setInterests, interest)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  interests.includes(interest)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
          type="submit"
          className="w-full py-3 rounded-full bg-indigo-600 text-white font-medium disabled:opacity-50"
        >
          {isSubmitting ? t("register.submitting") : t("register.submit")}
        </motion.button>
      </form>
    </div>
  );
}