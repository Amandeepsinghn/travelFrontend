type CoverMediaProps = {
  src?: string | null;
  alt: string;
  className?: string;
  label?: string;
};

export function CoverMedia({ src, alt, className = "", label }: CoverMediaProps) {
  if (!src || src.includes("example.com")) {
    return (
      <div className={`cover-fallback relative overflow-hidden ${className}`} aria-label={alt}>
        <div className="absolute inset-0 opacity-40" style={{ animation: "drift 12s ease-in-out infinite alternate" }} />
        <div className="absolute inset-0 flex items-end p-5">
          <span className="font-[family-name:var(--font-display)] text-2xl text-white/90">
            {label ?? alt}
          </span>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`object-cover ${className}`} loading="lazy" />
  );
}
