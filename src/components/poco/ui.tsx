import { Link } from "@tanstack/react-router";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "soft";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:brightness-110 glow-primary",
  ghost: "bg-transparent text-ink-muted hover:text-foreground",
  outline: "border border-stroke-panel bg-transparent text-foreground hover:bg-elev-2",
  soft: "bg-elev-2 text-foreground hover:brightness-125",
};

const sizes = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: keyof typeof sizes }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      )}
    />
  );
}

export function LinkButton({
  to,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("panel p-5 sm:p-6", className)}>{children}</div>;
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  const base =
    "w-full rounded-xl border border-stroke-panel bg-surface-note px-3.5 py-3 text-sm text-foreground placeholder:text-ink-muted/60 outline-none transition focus:border-primary/70 focus:ring-2 focus:ring-primary/20";
  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium text-ink-muted">{label}</span>
      {textarea ? (
        <textarea rows={4} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={base} />
      ) : (
        <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={base} />
      )}
    </label>
  );
}

export function SectionTitle({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="space-y-2">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      {sub ? <p className="text-sm leading-relaxed text-ink-muted">{sub}</p> : null}
    </div>
  );
}
