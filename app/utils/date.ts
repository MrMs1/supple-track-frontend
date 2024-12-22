import { isBefore } from "date-fns";

export function formatDate(date: Date): string {
  if (typeof date === "string") {
    return new Date(date).toLocaleDateString("ja-JP");
  }
  return date.toLocaleDateString("ja-JP");
}

export function checkExpirationWarning(
  items: { expiredAt: Date; endAt: Date }[],
) {
  return items.some((item) => {
    const supplyEndDate = item.endAt;
    const expirationDate = item.expiredAt;
    return isBefore(expirationDate, supplyEndDate);
  });
}
