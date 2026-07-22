import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  `
  inline-flex
  items-center
  justify-center
  rounded-xl
  font-semibold
  transition-all
  duration-200
  select-none
  focus:outline-none
  focus:ring-4
  focus:ring-violet-200
  disabled:pointer-events-none
  disabled:opacity-60
  active:scale-[0.98]
  `,
  {
    variants: {
      variant: {
        primary:
          `
          bg-violet-600
          text-white
          shadow-sm
          hover:bg-violet-700
          hover:shadow-md
          `,

        secondary:
          `
          bg-zinc-100
          text-zinc-900
          hover:bg-zinc-200
          `,

        outline:
          `
          border
          border-zinc-300
          bg-white
          text-zinc-800
          hover:bg-zinc-50
          `,

        ghost:
          `
          bg-transparent
          text-zinc-700
          hover:bg-zinc-100
          `,

        danger:
          `
          bg-red-600
          text-white
          hover:bg-red-700
          `,
      },

      size: {
        sm: "h-10 px-4 text-sm",

        md: "h-12 px-6 text-base",

        lg: "h-14 px-8 text-lg",
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