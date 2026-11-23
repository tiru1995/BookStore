import { useMemo, useState } from 'react';
import { Header } from './components/layout/Header';
import { SearchInput } from './components/layout/SearchInput';
import { CategoryPills } from './components/layout/CategoryPills';
import { BookGrid } from './components/catalog/BookGrid';
import { SortSelect } from './components/catalog/SortSelect';
import { QuickViewModal } from './components/quickview/QuickViewModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { useBookFilters } from './hooks/useBookFilters';
import type { Book } from './types';

export default function App() {
  const { query, setQuery, category, setCategory, sort, setSort, results } = useBookFilters();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const summary = useMemo(
    () => `${results.length} ${results.length === 1 ? 'book' : 'books'} found`,
    [results.length],
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <a
        href="#catalog"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to catalog
      </a>

      <Header
        onOpenCart={() => setCartOpen(true)}
        search={<SearchInput value={query} onChange={setQuery} />}
        categories={<CategoryPills value={category} onChange={setCategory} />}
      />

      <main id="catalog" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="font-serif text-2xl font-bold text-slate-900">
              {category === 'All' ? 'All books' : category}
            </h1>
            <p role="status" aria-live="polite" className="text-sm text-slate-600">
              {summary}
            </p>
          </div>
          <SortSelect value={sort} onChange={setSort} />
        </div>

        <BookGrid
          books={results}
          onSelect={setSelectedBook}
          onReset={() => {
            setQuery('');
            setCategory('All');
          }}
        />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-600 sm:px-6">
          PageTurn · Demo store. Prices in INR, including GST shown at checkout.
        </div>
      </footer>

      <QuickViewModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
