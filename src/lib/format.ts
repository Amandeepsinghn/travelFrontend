export function formatPrice(price: string | number, currency = "INR"): string {
  const value = typeof price === "string" ? Number(price) : price;
  if (Number.isNaN(value)) return `${currency} ${price}`;

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString("en-IN")}`;
  }
}

export function formatDuration(days: number, nights: number): string {
  return `${days}D / ${nights}N`;
}

export function stars(rating: number | null | undefined): string {
  if (!rating) return "Unrated";
  return `${"★".repeat(rating)}${"☆".repeat(Math.max(0, 5 - rating))}`;
}
