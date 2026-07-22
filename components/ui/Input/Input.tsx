"use client";

import { forwardRef } from "react";
import { InputProps } from "./types";
import { cn } from "@/lib/cn";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium text-zinc-700">
            {label}
          </label>
        )}

        <div className="relative">

          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              "w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition-all",
              "focus:border-violet-600 focus:ring-2 focus:ring-violet-200",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
              {rightIcon}
            </div>
          )}

        </div>

        {error ? (
          <p className="text-sm text-red-500">
            {error}
          </p>
        ) : (
          helperText && (
            <p className="text-sm text-zinc-500">
              {helperText}
            </p>
          )
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
