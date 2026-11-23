import type { Book } from '../../types';
import { BookCard } from './BookCard';
import { EmptyState } from '../ui/EmptyState';

interface BookGridProps {
  books: Book[];
  onSelect: (book: Book) => void;
  onReset: () => void;
}

export function BookGrid({ books, onSelect, onReset }: BookGridProps) {
  if (books.length === 0) {
    return (
      <EmptyState
        title="No books match your search"
        message="Try a different title or author, or choose another category."
        action={
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            Clear filters
          </button>
        }
      />
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <li key={book.id} className="min-w-0">
          <BookCard book={book} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}
