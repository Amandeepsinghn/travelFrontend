import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-1.5 text-sm text-ink-soft" htmlFor={inputId}>
      <span className="font-medium text-ink">{label}</span>
      <input
        id={inputId}
        className={cn(
          "rounded-xl border border-ink/10 bg-white/80 px-3.5 py-2.5 text-ink outline-none transition focus:border-lagoon focus:ring-2 focus:ring-lagoon/20",
          error && "border-red-400 focus:border-red-400 focus:ring-red-200",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
