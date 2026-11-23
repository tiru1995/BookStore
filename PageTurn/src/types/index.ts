export const FORMATS = ['Paperback', 'Hardcover', 'eBook'] as const;
export type Format = (typeof FORMATS)[number];

export const GENRES = ['Fiction', 'Non-Fiction', 'Tech & AI', 'Design', 'Classics'] as const;
export type Genre = (typeof GENRES)[number];

export type CategoryFilter = 'All' | Genre;
export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: Genre;
  rating: number;
  synopsis: string;
  isbn: string;
  publisher: string;
  pages: number;
  year: number;
  /** Physical copies available. eBooks are not limited by stock. */
  stock: number;
  prices: Record<Format, number>;
}

export interface CartItem {
  bookId: string;
  format: Format;
  quantity: number;
}

export interface CartLine {
  item: CartItem;
  book: Book;
  unitPrice: number;
  lineTotal: number;
}

export interface Totals {
  subtotal: number;
  shippableSubtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  hasPhysical: boolean;
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export interface Order {
  id: string;
  placedAt: string;
  lines: CartLine[];
  totals: Totals;
  customer: CustomerDetails;
}
