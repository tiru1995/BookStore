import { useMemo, useState } from 'react';
import { books as allBooks } from '../data/books';
import type { Book, CategoryFilter, SortKey } from '../types';

export function useBookFilters() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [sort, setSort] = useState<SortKey>('featured');

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = allBooks.filter((book: Book) => {
      const matchesCategory = category === 'All' || book.genre === category;
      const matchesQuery =
        term === '' ||
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term);
      return matchesCategory && matchesQuery;
    });

    const minPrice = (book: Book) => Math.min(...Object.values(book.prices));
    const sorted = [...filtered];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => minPrice(a) - minPrice(b));
        break;
      case 'price-desc':
        sorted.sort((a, b) => minPrice(b) - minPrice(a));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
        break;
    }
    return sorted;
  }, [query, category, sort]);

  return { query, setQuery, category, setCategory, sort, setSort, results };
}
