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
          <label className="block text-sm font-semibold text-zinc-800">
            {label}
          </label>
        )}

        <div className="relative">

          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              `
              h-12
              w-full
              rounded-xl
              border
              border-zinc-300
              bg-white
              px-4
              text-base
              text-zinc-900
              placeholder:text-zinc-400
              shadow-sm
              outline-none
              transition-all
              duration-200

              focus:border-violet-600
              focus:ring-4
              focus:ring-violet-100
              `,

              leftIcon && "pl-11",
              rightIcon && "pr-11",

              error &&
                "border-red-500 focus:border-red-500 focus:ring-red-100",

              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
              {rightIcon}
            </div>
          )}

        </div>

        {error ? (
          <p className="text-sm font-medium text-red-600">
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