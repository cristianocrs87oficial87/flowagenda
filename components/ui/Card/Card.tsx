import { CardProps } from "./types";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        `
        rounded-3xl
        border
        border-zinc-200/80
        bg-white
        p-6
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-xl
        `,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}