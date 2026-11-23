import { createContext, useCallback, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { findBook } from '../data/books';
import { buildLines, calculateTotals, maxQuantity } from '../utils/pricing';
import type { Book, CartItem, CartLine, CustomerDetails, Format, Order, Totals } from '../types';

const CART_KEY = 'pageturn.cart.v1';
const ORDER_KEY = 'pageturn.lastOrder.v1';

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  totals: Totals;
  itemCount: number;
  lastOrder: Order | null;
  addToCart: (book: Book, format: Format, quantity?: number) => void;
  setQuantity: (bookId: string, format: Format, quantity: number) => void;
  removeFromCart: (bookId: string, format: Format) => void;
  clearCart: () => void;
  placeOrder: (customer: CustomerDetails) => Order | null;
  dismissOrder: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const sameLine = (item: CartItem, bookId: string, format: Format) =>
  item.bookId === bookId && item.format === format;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>(CART_KEY, []);
  const [lastOrder, setLastOrder] = useLocalStorage<Order | null>(ORDER_KEY, null);

  const lines = useMemo(() => buildLines(items), [items]);
  const totals = useMemo(() => calculateTotals(lines), [lines]);
  const itemCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);

  const setQuantity = useCallback(
    (bookId: string, format: Format, quantity: number) => {
      const book = findBook(bookId);
      if (!book) return;
      const capped = Math.min(Math.max(0, Math.floor(quantity)), maxQuantity(book, format));
      setItems((current) =>
        capped === 0
          ? current.filter((item) => !sameLine(item, bookId, format))
          : current.some((item) => sameLine(item, bookId, format))
            ? current.map((item) =>
                sameLine(item, bookId, format) ? { ...item, quantity: capped } : item,
              )
            : [...current, { bookId, format, quantity: capped }],
      );
    },
    [setItems],
  );

  const addToCart = useCallback(
    (book: Book, format: Format, quantity = 1) => {
      const existing = items.find((item) => sameLine(item, book.id, format));
      setQuantity(book.id, format, (existing?.quantity ?? 0) + quantity);
    },
    [items, setQuantity],
  );

  const removeFromCart = useCallback(
    (bookId: string, format: Format) => {
      setItems((current) => current.filter((item) => !sameLine(item, bookId, format)));
    },
    [setItems],
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const placeOrder = useCallback(
    (customer: CustomerDetails): Order | null => {
      if (lines.length === 0) return null;
      const order: Order = {
        id: `PT-${Date.now().toString(36).toUpperCase()}`,
        placedAt: new Date().toISOString(),
        lines,
        totals,
        customer,
      };
      setLastOrder(order);
      setItems([]);
      return order;
    },
    [lines, totals, setLastOrder, setItems],
  );

  const dismissOrder = useCallback(() => setLastOrder(null), [setLastOrder]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      lines,
      totals,
      itemCount,
      lastOrder,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      placeOrder,
      dismissOrder,
    }),
    [
      items,
      lines,
      totals,
      itemCount,
      lastOrder,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      placeOrder,
      dismissOrder,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
