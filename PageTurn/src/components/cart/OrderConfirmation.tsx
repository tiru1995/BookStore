import type { Order } from '../../types';
import { formatINR } from '../../utils/format';
import { Button } from '../ui/Button';

interface OrderConfirmationProps {
  order: Order;
  onDone: () => void;
}

export function OrderConfirmation({ order, onDone }: OrderConfirmationProps) {
  const placed = new Date(order.placedAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="space-y-6 p-5" role="status">
      <div>
        <p className="text-sm font-semibold text-emerald-700">Payment successful (simulated)</p>
        <h3 className="mt-1 font-serif text-xl font-bold text-slate-900">Thank you, {order.customer.name}</h3>
        <p className="mt-1 text-sm text-slate-600">
          Order <span className="font-mono font-semibold text-slate-900">{order.id}</span> placed {placed}.
        </p>
        <p className="mt-1 text-sm text-slate-600">A confirmation has been noted for {order.customer.email}.</p>
      </div>

      <section aria-labelledby="order-items-heading">
        <h4 id="order-items-heading" className="text-sm font-semibold text-slate-900">
          Items
        </h4>
        <ul className="mt-2 divide-y divide-slate-200 text-sm">
          {order.lines.map((line) => (
            <li key={`${line.book.id}-${line.item.format}`} className="flex justify-between gap-4 py-2">
              <span className="min-w-0 truncate text-slate-700">
                {line.book.title} ({line.item.format}) × {line.item.quantity}
              </span>
              <span className="shrink-0 font-medium">{formatINR(line.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex justify-between border-t border-slate-200 pt-3 font-bold">
          <span>Total paid</span>
          <span>{formatINR(order.totals.total)}</span>
        </p>
      </section>

      <Button onClick={onDone} className="w-full">
        Continue shopping
      </Button>
    </div>
  );
}
