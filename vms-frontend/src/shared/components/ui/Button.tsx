// shared/components/ui/Button.tsx

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  isLoading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary:
    "border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
  ghost:
    "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
};

export function Button({
  variant = "primary",
  isLoading = false,
  children,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      disabled={disabled || isLoading}
      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {isLoading ? "..." : children}
    </motion.button>
  );
}