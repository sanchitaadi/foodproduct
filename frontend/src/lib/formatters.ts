/**
 * PEACHY PLATE — E-Commerce Currency and Unit Formatters
 */

export function formatPrice(cents: number, currency: string = "INR"): string {
  const amount = cents / 100;
  if (currency === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(1).replace(/\.0$/, "")} kg`;
  }
  return `${Math.round(grams)}g`;
}

export function calculateDiscountPercent(originalCents?: number, currentCents?: number): number | null {
  if (!originalCents || !currentCents || originalCents <= currentCents) return null;
  const saving = ((originalCents - currentCents) / originalCents) * 100;
  return Math.round(saving);
}
