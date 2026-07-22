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
          items-center
          justify-center
          gap-2
          rounded-xl
          font-semibold
          transition-all
          duration-200
          active:scale-[0.98]
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