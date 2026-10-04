import { ButtonLink } from "@/components/ui/Button";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function AdminPageHeader({
  title,
  description,
  actionHref,
  actionLabel,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-white md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-white/60">{description}</p>
        ) : null}
      </div>
      {actionHref && actionLabel ? (
        <ButtonLink href={actionHref} className="bg-[#5d8a32] hover:bg-[#1a3d2c]">
          {actionLabel}
        </ButtonLink>
      ) : null}
    </div>
  );
}
