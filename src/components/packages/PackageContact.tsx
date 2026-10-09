import { formatDuration, formatPrice } from "@/lib/format";

const PHONE_DISPLAY = "+91 7082706237";
const PHONE_TEL = "+917082706237";

type Props = {
  price: string | number;
  currency?: string;
  durationDays: number;
  durationNights: number;
};

export function PackageContact({
  price,
  currency = "INR",
  durationDays,
  durationNights,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="panel rounded-3xl p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">
          Package price
        </p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight text-ink">
          {formatPrice(price, currency)}
        </p>
        <p className="mt-2 text-sm font-medium text-ink-soft">
          {formatDuration(durationDays, durationNights)}
        </p>
      </div>

      <div className="panel rounded-3xl p-6">
        <h2 className="text-lg font-semibold text-ink">Contact us for product</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Call or WhatsApp us for details, customisation, and orders.
        </p>
        <a
          href={`tel:${PHONE_TEL}`}
          className="mt-4 block text-2xl font-semibold tracking-tight text-ink transition hover:text-lagoon"
        >
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}
