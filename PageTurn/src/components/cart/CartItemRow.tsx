import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/format';
import { maxQuantity } from '../../utils/pricing';
import type { CartLine } from '../../types';

interface CartItemRowProps {
  line: CartLine;
}

export function CartItemRow({ line }: CartItemRowProps) {
  const { setQuantity, removeFromCart } = useCart();
  const { book, item } = line;
  const max = maxQuantity(book, item.format);
  const label = `${book.title} (${item.format})`;

  return (
    <li className="flex gap-4 py-4">
      <div className="min-w-0 flex-1">
        <p className="truncate font-serif text-base font-bold text-slate-900">{book.title}</p>
        <p className="text-sm text-slate-600">
          {item.format} · {formatINR(line.unitPrice)}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center rounded-lg border border-slate-300">
            <button
              type="button"
              onClick={() => setQuantity(book.id, item.format, item.quantity - 1)}
              aria-label={`Decrease quantity of ${label}`}
              className="h-9 w-9 text-lg text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
            >
              −
            </button>
            <span aria-live="polite" aria-label={`Quantity of ${label}`} className="w-8 text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(book.id, item.format, item.quantity + 1)}
              disabled={item.quantity >= max}
              aria-label={`Increase quantity of ${label}`}
              className="h-9 w-9 text-lg text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 disabled:text-slate-300"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(book.id, item.format)}
            className="rounded-md px-2 py-1 text-sm font-medium text-rose-700 hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-600"
          >
            Remove<span className="sr-only"> {label}</span>
          </button>
        </div>
      </div>
      <p className="shrink-0 text-sm font-bold text-slate-900">{formatINR(line.lineTotal)}</p>
    </li>
  );
}
