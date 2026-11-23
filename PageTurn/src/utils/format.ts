const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

const shortDate = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' });

export function formatINR(amount: number): string {
  return currency.format(amount);
}

export function formatDate(date: Date): string {
  return shortDate.format(date);
}
