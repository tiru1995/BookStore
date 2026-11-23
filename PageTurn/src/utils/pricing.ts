import { findBook } from '../data/books';
import type { Book, CartItem, CartLine, Format, Totals } from '../types';

export const GST_RATE = 0.05;
export const DELIVERY_FEE = 49;
export const FREE_DELIVERY_THRESHOLD = 500;
export const EBOOK_MAX_QUANTITY = 10;

const round2 = (value: number) => Math.round(value * 100) / 100;
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

export function isFormatAvailable(book: Book, format: Format): boolean {
  return format === 'eBook' || book.stock > 0;
}

export function maxQuantity(book: Book, format: Format): number {
  return format === 'eBook' ? EBOOK_MAX_QUANTITY : book.stock;
}

export function defaultFormat(book: Book): Format {
  return isFormatAvailable(book, 'Paperback') ? 'Paperback' : 'eBook';
}

export function displayPrice(book: Book): number {
  return book.prices[defaultFormat(book)];
}

export function buildLines(items: CartItem[]): CartLine[] {
  return items.flatMap((item) => {
    const book = findBook(item.bookId);
    if (!book) return [];
    const unitPrice = book.prices[item.format];
    return [{ item, book, unitPrice, lineTotal: unitPrice * item.quantity }];
  });
}

export function calculateTotals(lines: CartLine[]): Totals {
  const subtotal = sum(lines.map((line) => line.lineTotal));
  const physicalLines = lines.filter((line) => line.item.format !== 'eBook');
  const shippableSubtotal = sum(physicalLines.map((line) => line.lineTotal));
  const hasPhysical = physicalLines.length > 0;
  const tax = round2(subtotal * GST_RATE);
  const deliveryFee =
    !hasPhysical || shippableSubtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

  return {
    subtotal,
    shippableSubtotal,
    tax,
    deliveryFee,
    total: round2(subtotal + tax + deliveryFee),
    hasPhysical,
  };
}

export function deliveryWindow(from: Date = new Date()): { start: Date; end: Date } {
  const addDays = (days: number) => {
    const date = new Date(from);
    date.setDate(date.getDate() + days);
    return date;
  };
  return { start: addDays(3), end: addDays(5) };
}
