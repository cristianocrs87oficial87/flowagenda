import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";

  size?: "sm" | "md" | "lg";

  fullWidth?: boolean;

  loading?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;
}