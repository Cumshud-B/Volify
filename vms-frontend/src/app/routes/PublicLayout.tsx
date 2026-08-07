// src/app/routes/PublicLayout.tsx
import { NavLink, Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useAuth } from "@/shared/hooks/useAuth";
import { useTheme } from "@/app/providers/ThemeProvider";
import { changeLanguage } from "@/app/providers/I18nProvider";

const navItems = [
  { to: "/", label: "nav.home", end: true },
  { to: "/events", label: "nav.events" },
  { to: "/leaderboard", label: "nav.leaderboard" },
  { to: "/dashboard", label: "nav.dashboard" }
];

const languages = [
  { code: "en", label: "EN" },
  { code: "az", label: "AZ" },
  { code: "ru", label: "RU" }
] as const;

export function PublicLayout() {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-500">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 backdrop-blur-lg bg-white/70 dark:bg-neutral-950/70
                   border-b border-neutral-200/60 dark:border-neutral-800/60"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg text-neutral-900 dark:text-white">
            Uni<span className="text-indigo-500">Volunteer</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                      : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                  }`
                }
              >
                {t(label)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <select
              defaultValue={localStorage.getItem("vms-lang") ?? "en"}
              onChange={e => changeLanguage(e.target.value as "en" | "az" | "ru")}
              className="text-sm bg-transparent border border-neutral-200 dark:border-neutral-700
                         rounded-full px-3 py-1.5 text-neutral-700 dark:text-neutral-300"
            >
              {languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>

            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-700
                         flex items-center justify-center text-sm"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="w-9 h-9 rounded-full bg-indigo-500 text-white
                                                  flex items-center justify-center text-xs font-semibold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </Link>
                <button onClick={logout} className="text-sm text-neutral-500 hover:text-neutral-800
                                                      dark:hover:text-neutral-200">
                  {t("nav.logout")}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium"
              >
                {t("nav.login")}
              </Link>
            )}
          </div>
        </div>
      </motion.header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-24 py-10">
        <div className="max-w-7xl mx-auto px-6 text-sm text-neutral-500 flex justify-between">
          <span>© {new Date().getFullYear()} UniVolunteer</span>
          <span>{t("footer.tagline")}</span>
        </div>
      </footer>
    </div>
  );
}