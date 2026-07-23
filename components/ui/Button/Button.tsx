"use client";

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

import { ButtonProps } from "./types";
import { buttonVariants } from "./buttonVariants";
import { cn } from "@/lib/cn";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      fullWidth,
      loading,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
          }),
          `
          inline-flex
          h-12
          items-center
          justify-center
          gap-2
          rounded-2xl
          px-5
          font-semibold
          tracking-tight
          shadow-sm
          transition-all
          duration-300
          active:scale-[0.98]
          hover:shadow-lg
          disabled:cursor-not-allowed
          disabled:opacity-60
          `,
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          leftIcon
        )}

        <span>{children}</span>

        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";