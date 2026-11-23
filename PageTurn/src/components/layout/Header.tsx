import type { ReactNode } from 'react';
import { useCart } from '../../context/CartContext';

interface HeaderProps {
  onOpenCart: () => void;
  search: ReactNode;
  categories: ReactNode;
}

export function Header({ onOpenCart, search, categories }: HeaderProps) {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <a href="#top" className="flex min-w-0 items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600">
            <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-600 text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z" />
              </svg>
            </span>
            <span className="truncate font-serif text-xl font-bold text-slate-900">PageTurn</span>
          </a>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
            className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-800 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 8H6" strokeLinejoin="round" />
              <circle cx="10" cy="20" r="1.5" />
              <circle cx="17" cy="20" r="1.5" />
            </svg>
            {itemCount > 0 && (
              <span
                aria-live="polite"
                className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-indigo-600 px-1.5 text-xs font-bold text-white"
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0 md:max-w-sm md:flex-1">{search}</div>
          <nav aria-label="Categories" className="min-w-0">
            {categories}
          </nav>
        </div>
      </div>
    </header>
  );
}
