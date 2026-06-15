import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border dark:border-input border-zinc-300 dark:bg-zinc-800 bg-white px-3 py-2 text-base dark:text-white text-zinc-900 shadow-sm dark:placeholder:text-muted-foreground placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 dark:focus-visible:ring-ring focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }