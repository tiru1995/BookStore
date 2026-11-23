import type { Book, Format } from '../../types';
import { isFormatAvailable } from '../../utils/pricing';

interface FormatBadgeProps {
  format: Format;
}

export function FormatBadge({ format }: FormatBadgeProps) {
  return (
    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
      {format}
    </span>
  );
}

interface StockBadgeProps {
  book: Book;
}

export function StockBadge({ book }: StockBadgeProps) {
  if (book.stock === 0 && !isFormatAvailable(book, 'eBook')) {
    return <span className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-800">Out of stock</span>;
  }
  if (book.stock > 0 && book.stock <= 5) {
    return (
      <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
        Only {book.stock} left
      </span>
    );
  }
  return <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">In stock</span>;
}

export function GenreTag({ genre }: { genre: string }) {
  return (
    <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-800">
      {genre}
    </span>
  );
}
