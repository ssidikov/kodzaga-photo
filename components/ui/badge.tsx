import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#C9A84C]/20 text-[#C9A84C]",
        new: "border-blue-500/30 bg-blue-500/10 text-blue-400",
        contacted: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
        confirmed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        completed: "border-purple-500/30 bg-purple-500/10 text-purple-400",
        cancelled: "border-red-500/30 bg-red-500/10 text-red-400",
        secondary: "border-transparent bg-white/10 text-[#f0ece3]/70",
        outline: "border-white/20 text-[#f0ece3]/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
