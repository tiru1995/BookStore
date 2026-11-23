import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import type { CustomerDetails } from '../../types';
import { Drawer } from '../ui/Drawer';
import { EmptyState } from '../ui/EmptyState';
import { Button } from '../ui/Button';
import { CartItemRow } from './CartItemRow';
import { CheckoutForm } from './CheckoutForm';
import { OrderConfirmation } from './OrderConfirmation';
import { OrderSummary } from './OrderSummary';

const PAYMENT_DELAY_MS = 1200;

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { lines, totals, lastOrder, clearCart, placeOrder, dismissOrder } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleClose = () => {
    setCheckingOut(false);
    setProcessing(false);
    onClose();
  };

  const handlePlaceOrder = (customer: CustomerDetails) => {
    setProcessing(true);
    // Simulated payment gateway round-trip.
    window.setTimeout(() => {
      placeOrder(customer);
      setProcessing(false);
      setCheckingOut(false);
    }, PAYMENT_DELAY_MS);
  };

  let content;
  if (lastOrder) {
    content = (
      <OrderConfirmation
        order={lastOrder}
        onDone={() => {
          dismissOrder();
          handleClose();
        }}
      />
    );
  } else if (lines.length === 0) {
    content = (
      <div className="p-5">
        <EmptyState title="Your cart is empty" message="Add a book from the catalog to get started." />
      </div>
    );
  } else if (checkingOut) {
    content = (
      <CheckoutForm
        onSubmit={handlePlaceOrder}
        onBack={() => setCheckingOut(false)}
        processing={processing}
      />
    );
  } else {
    content = (
      <div className="flex flex-col gap-6 p-5">
        <ul className="divide-y divide-slate-200" aria-label="Items in your cart">
          {lines.map((line) => (
            <CartItemRow key={`${line.book.id}-${line.item.format}`} line={line} />
          ))}
        </ul>
        <OrderSummary totals={totals} />
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button variant="secondary" onClick={clearCart}>
            Clear cart
          </Button>
          <Button onClick={() => setCheckingOut(true)}>Checkout</Button>
        </div>
      </div>
    );
  }

  const title = lastOrder ? 'Order confirmed' : checkingOut ? 'Checkout' : 'Your cart';

  return (
    <Drawer open={open} onClose={handleClose} title={title} placement="right">
      {content}
    </Drawer>
  );
}
