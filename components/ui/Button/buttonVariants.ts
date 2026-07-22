import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",

  {
    variants: {
      variant: {
        primary:
          "bg-violet-600 text-white hover:bg-violet-700",

        secondary:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",

        outline:
          "border border-zinc-300 bg-white hover:bg-zinc-50",

        ghost:
          "bg-transparent hover:bg-zinc-100",

        danger:
          "bg-red-600 text-white hover:bg-red-700",
      },

      size: {
        sm: "h-9 px-3 text-sm",

        md: "h-11 px-5 text-base",

        lg: "h-12 px-6 text-lg",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "primary",

      size: "md",
    },
  }
);