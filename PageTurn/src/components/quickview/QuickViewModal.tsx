import { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { BookCover } from '../catalog/BookCover';
import { FormatBadge, StockBadge } from '../catalog/Badges';
import { RatingStars } from '../catalog/RatingStars';
import { useCart } from '../../context/CartContext';
import { FORMATS } from '../../types';
import type { Book, Format } from '../../types';
import { formatINR } from '../../utils/format';
import { isFormatAvailable, maxQuantity } from '../../utils/pricing';

interface QuickViewModalProps {
  book: Book | null;
  onClose: () => void;
}

export function QuickViewModal({ book, onClose }: QuickViewModalProps) {
  return (
    <Drawer open={book !== null} onClose={onClose} title={book?.title ?? ''} placement="center">
      {book && <QuickViewContent key={book.id} book={book} />}
    </Drawer>
  );
}

function QuickViewContent({ book }: { book: Book }) {
  const { addToCart } = useCart();
  const firstAvailable = FORMATS.find((format) => isFormatAvailable(book, format)) ?? 'eBook';
  const [format, setFormat] = useState<Format>(firstAvailable);
  const [feedback, setFeedback] = useState('');
  const unavailable = !isFormatAvailable(book, format);

  const handleAdd = () => {
    addToCart(book, format);
    setFeedback(`Added ${book.title} (${format}) to your cart.`);
  };

  const metadata: Array<[string, string]> = [
    ['ISBN', book.isbn],
    ['Publisher', book.publisher],
    ['Pages', String(book.pages)],
    ['Year', String(book.year)],
  ];

  return (
    <div className="grid gap-6 p-5 sm:grid-cols-[200px_1fr]">
      <div className="mx-auto w-40 sm:w-full">
        <BookCover book={book} className="rounded-xl" />
      </div>

      <div className="min-w-0 space-y-4">
        <div>
          <p className="text-sm text-slate-600">{book.author}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <RatingStars rating={book.rating} />
            <StockBadge book={book} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Synopsis</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">{book.synopsis}</p>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          {metadata.map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="text-slate-500">{label}</dt>
              <dd className="break-words font-medium text-slate-900">{value}</dd>
            </div>
          ))}
        </dl>

        <fieldset>
          <legend className="text-sm font-semibold text-slate-900">Format</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {FORMATS.map((option) => {
              const available = isFormatAvailable(book, option);
              const selected = option === format;
              return (
                <label
                  key={option}
                  className={`flex cursor-pointer flex-col rounded-lg border px-3 py-2 text-sm has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-indigo-600 ${
                    selected ? 'border-indigo-600 bg-indigo-50' : 'border-slate-300 bg-white'
                  } ${available ? '' : 'opacity-50'}`}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`format-${book.id}`}
                      value={option}
                      checked={selected}
                      disabled={!available}
                      onChange={() => setFormat(option)}
                      className="accent-indigo-600"
                    />
                    <span className="font-medium text-slate-900">{option}</span>
                  </span>
                  <span className="mt-1 pl-6 text-slate-700">{formatINR(book.prices[option])}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleAdd} disabled={unavailable}>
            Add to Cart
          </Button>
          <FormatBadge format={format} />
          <span className="text-xs text-slate-500">Up to {maxQuantity(book, format)} per order</span>
        </div>
        <p role="status" aria-live="polite" className="min-h-5 text-sm text-emerald-700">
          {feedback}
        </p>
      </div>
    </div>
  );
}
