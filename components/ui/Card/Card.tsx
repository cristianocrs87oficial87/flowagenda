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
        rounded-2xl
        border
        border-zinc-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:shadow-md
        `,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}