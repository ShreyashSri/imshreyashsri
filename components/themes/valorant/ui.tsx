const cx = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(" ")

const buttonVariants = {
  primary:
    "border border-primary bg-primary text-primary-foreground shadow-[0_0_24px_hsl(var(--primary)/0.24)] hover:bg-primary/90 hover:shadow-[0_0_34px_hsl(var(--primary)/0.34)]",
  outline: "border border-primary/55 bg-background/35 text-foreground hover:bg-primary hover:text-primary-foreground",
  ghost: "border border-transparent hover:border-primary/45 hover:bg-primary/10 hover:text-primary",
}

const buttonSizes = { sm: "h-9 px-3", md: "h-10 px-4 py-2", lg: "h-12 px-8" }

export function button({ variant = "primary", size = "md" }: { variant?: keyof typeof buttonVariants; size?: keyof typeof buttonSizes } = {}) {
  return cx(
    "btn-tactical inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4 [&_svg]:shrink-0",
    buttonVariants[variant],
    buttonSizes[size],
  )
}

const badgeVariants = {
  primary: "border-transparent bg-primary text-primary-foreground",
  secondary: "border-secondary/40 bg-secondary/15 text-secondary-foreground",
  outline: "border-primary/45 bg-background/30 text-foreground",
}

export function Badge({ variant = "primary", className, children }: { variant?: keyof typeof badgeVariants; className?: string; children: React.ReactNode }) {
  return <span className={cx("tactical-badge inline-flex items-center border px-2.5 py-0.5 text-xs font-bold", badgeVariants[variant], className)}>{children}</span>
}

type DivProps = React.HTMLAttributes<HTMLDivElement>

export const Card = ({ className, ...props }: DivProps) => <div className={cx("tactical-card bg-card text-card-foreground", className)} {...props} />
export const CardHeader = ({ className, ...props }: DivProps) => <div className={cx("flex flex-col space-y-1.5 p-6", className)} {...props} />
export const CardTitle = ({ className, ...props }: DivProps) => <div className={cx("font-display text-2xl font-bold uppercase leading-none", className)} {...props} />
export const CardDescription = ({ className, ...props }: DivProps) => <div className={cx("text-sm leading-relaxed text-muted-foreground", className)} {...props} />
export const CardContent = ({ className, ...props }: DivProps) => <div className={cx("p-6 pt-0", className)} {...props} />
export const CardFooter = ({ className, ...props }: DivProps) => <div className={cx("flex items-center p-6 pt-0", className)} {...props} />
