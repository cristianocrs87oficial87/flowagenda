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
        "rounded-xl border border-zinc-200 bg-white p-5 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}