import { Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10.5 9.5v5l5-2.5-5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const contacts: {
  title: string;
  description: string;
  label: string;
  href: string;
  icon: ReactNode;
}[] = [
  {
    title: "Mail",
    description: "Write to us for trip ideas, bookings, and support.",
    label: "info@trailpanda.in",
    href: "mailto:info@trailpanda.in",
    icon: <Mail className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    title: "Phone",
    description: "Prefer talking it through? Give us a call anytime.",
    label: "7082706237",
    href: "tel:+917082706237",
    icon: <Phone className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    title: "Instagram",
    description: "See recent trips, stays, and trail moments.",
    label: "@trailpanda04",
    href: "https://instagram.com/trailpanda04",
    icon: <InstagramIcon className="h-5 w-5" />,
  },
  {
    title: "YouTube",
    description: "Watch destination stories and trip walkthroughs.",
    label: "@TrailPanda",
    href: "https://youtube.com/@TrailPanda",
    icon: <YouTubeIcon className="h-5 w-5" />,
  },
];

export function ContactSection() {
  return (
    <section className="border-t border-ink/10 bg-mist/35">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((item) => (
            <article
              key={item.title}
              className="flex min-h-[180px] flex-col rounded-xl border border-ink/10 bg-white px-5 py-5"
            >
              <div className="flex items-center gap-2.5 text-ink">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lagoon/10 text-lagoon">
                  {item.icon}
                </span>
                <h3 className="text-base font-semibold">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="mt-auto pt-6 text-base font-semibold text-ink underline decoration-ink/25 underline-offset-4 transition hover:text-lagoon hover:decoration-lagoon"
              >
                {item.label}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
