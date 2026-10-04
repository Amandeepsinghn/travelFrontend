type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-lagoon">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-ink md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{description}</p>
      ) : null}
    </div>
  );
}
