export const COOKIE_MESSAGES = {
  IN: [
    "Would you like some Parle-G with your chai? ☕️ We use cookies for analytics.",
    "Accept our cookies? We promise they are as good as a fresh batch of Good Day! 🍪",
    "We use cookies to serve you better (and no, not the ones from the bakery down the street). 🍪",
  ],
  GB: [
    "Would you like some biscuits with your tea? 🫖 We use them for analytics.",
    "We use biscuits to track your experience on this site! 🍪",
    "Accept our biscuits for a better browsing experience! 🍪",
  ],
  DEFAULT: [
    "We use cookies to improve your experience! 🍪",
    "Accept our cookies for a better site experience! 🍪",
    "We track some analytics using cookies. Is that okay? 🍪",
  ],
} as const;

export function getRandomMessage(country: string | null): string {
  const list =
    country === "IN"
      ? COOKIE_MESSAGES.IN
      : country === "GB" || country === "UK"
        ? COOKIE_MESSAGES.GB
        : COOKIE_MESSAGES.DEFAULT;

  return list[Math.floor(Math.random() * list.length)];
}
