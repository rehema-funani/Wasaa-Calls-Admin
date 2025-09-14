import * as React from "react"
import { cn } from "../../utils/helpers"

export function Card({
  className,
  children,
  hover,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm",
        hover && "transition-transform hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  )
}
