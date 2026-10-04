import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-ink-soft md:flex-row md:items-center md:justify-between md:px-6">
        <Link href="/" className="font-[family-name:var(--font-display)] text-lg">
          <span className="text-ink">Trail</span>{" "}
          <span className="text-lagoon">Panda</span>
        </Link>
        <div className="flex flex-wrap gap-4">
          <Link href="/destinations" className="hover:text-ink">
            Destinations
          </Link>
          <Link href="/packages" className="hover:text-ink">
            Packages
          </Link>
          <Link href="/hotels" className="hover:text-ink">
            Hotels
          </Link>
        </div>
        <p>More destinations. Happier you.</p>
      </div>
    </footer>
  );
}
