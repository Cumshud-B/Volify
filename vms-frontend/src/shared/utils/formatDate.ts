// shared/utils/formatDate.ts
export function formatDate(isoString: string, locale: string = "en-US"): string {
  return new Date(isoString).toLocaleDateString(locale, {
    year: "numeric", month: "short", day: "numeric"
  });
}

export function formatDateTime(isoString: string, locale: string = "en-US"): string {
  return new Date(isoString).toLocaleString(locale, {
    year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
  });
}