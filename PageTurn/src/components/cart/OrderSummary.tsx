import type { Totals } from '../../types';
import { formatDate, formatINR } from '../../utils/format';
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, GST_RATE, deliveryWindow } from '../../utils/pricing';

interface OrderSummaryProps {
  totals: Totals;
}

export function OrderSummary({ totals }: OrderSummaryProps) {
  const { start, end } = deliveryWindow();
  const deliveryText = totals.deliveryFee === 0 ? 'Free' : formatINR(totals.deliveryFee);
  const gstPercent = Math.round(GST_RATE * 100);

  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between">
        <dt className="text-slate-700">Subtotal</dt>
        <dd className="font-medium text-slate-900">{formatINR(totals.subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-slate-700">GST ({gstPercent}%)</dt>
        <dd className="font-medium text-slate-900">{formatINR(totals.tax)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-slate-700">Delivery</dt>
        <dd className="font-medium text-slate-900">{totals.hasPhysical ? deliveryText : 'None (eBooks only)'}</dd>
      </div>
      {totals.hasPhysical && totals.deliveryFee > 0 && (
        <p className="text-xs text-slate-500">
          Add {formatINR(FREE_DELIVERY_THRESHOLD - totals.shippableSubtotal)} more in print books for free
          delivery (standard fee {formatINR(DELIVERY_FEE)}).
        </p>
      )}
      {totals.hasPhysical && (
        <p className="text-xs text-slate-500">
          Estimated delivery {formatDate(start)} – {formatDate(end)}
        </p>
      )}
      <div className="flex justify-between border-t border-slate-200 pt-3 text-base">
        <dt className="font-bold text-slate-900">Total</dt>
        <dd className="font-bold text-slate-900">{formatINR(totals.total)}</dd>
      </div>
    </dl>
  );
}
