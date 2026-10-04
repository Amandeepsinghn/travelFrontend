import { cn } from "@/lib/utils";

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  const inputId = id ?? props.name;

  return (
    <label htmlFor={inputId} className="flex items-center gap-2.5 text-sm text-ink">
      <input
        id={inputId}
        type="checkbox"
        className={cn(
          "size-4 rounded border-ink/20 text-lagoon focus:ring-lagoon/30",
          className,
        )}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
