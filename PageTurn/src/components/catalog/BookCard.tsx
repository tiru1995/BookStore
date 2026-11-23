import { useCart } from '../../context/CartContext';
import { displayPrice, defaultFormat } from '../../utils/pricing';
import { formatINR } from '../../utils/format';
import type { Book } from '../../types';
import { Button } from '../ui/Button';
import { BookCover } from './BookCover';
import { FormatBadge, GenreTag, StockBadge } from './Badges';
import { RatingStars } from './RatingStars';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
}

export function BookCard({ book, onSelect }: BookCardProps) {
  const { addToCart } = useCart();
  const format = defaultFormat(book);
  const outOfStock = book.stock === 0 && format !== 'eBook';

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => onSelect(book)}
        aria-label={`View details for ${book.title} by ${book.author}`}
        className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-indigo-600"
      >
        <BookCover book={book} />
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <GenreTag genre={book.genre} />
          <FormatBadge format={format} />
          <StockBadge book={book} />
        </div>

        <div className="min-w-0">
          <h3 className="line-clamp-2 font-serif text-base font-bold leading-snug text-slate-900">
            <button
              type="button"
              onClick={() => onSelect(book)}
              className="text-left hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
            >
              {book.title}
            </button>
          </h3>
          <p className="mt-1 truncate text-sm text-slate-600">{book.author}</p>
        </div>

        <RatingStars rating={book.rating} />

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <p className="text-lg font-bold text-slate-900">
            <span className="sr-only">Price from </span>
            {formatINR(displayPrice(book))}
          </p>
          <Button
            onClick={() => addToCart(book, format)}
            disabled={outOfStock}
            aria-label={`Add ${book.title} to cart`}
            className="px-3"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
