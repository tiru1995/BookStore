import type { Book } from '../../types';

const PALETTES = [
  ['#4338ca', '#e0e7ff'],
  ['#0f766e', '#ccfbf1'],
  ['#b45309', '#fef3c7'],
  ['#be185d', '#fce7f3'],
  ['#334155', '#e2e8f0'],
  ['#7c3aed', '#ede9fe'],
];

// Deterministic colour from the book id, so covers are stable and need no image URLs.
function paletteFor(id: string): [string, string] {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return PALETTES[hash % PALETTES.length] as [string, string];
}

interface BookCoverProps {
  book: Book;
  className?: string;
}

/** Pure CSS/SVG cover, so there are no image URLs that can break. */
export function BookCover({ book, className = '' }: BookCoverProps) {
  const [ink, paper] = paletteFor(book.id);
  const words = book.title.replace(/[^\w\s]/g, '').split(/\s+/).slice(0, 4);

  return (
    <div
      role="img"
      aria-label={`Cover of ${book.title}`}
      className={`relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-t-xl p-4 ${className}`}
      style={{ backgroundColor: paper, color: ink }}
    >
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-2" style={{ backgroundColor: ink }} />
      <span className="pl-3 text-[11px] font-semibold uppercase tracking-wider opacity-80">{book.genre}</span>
      <span className="pl-3 font-serif text-lg font-bold leading-tight break-words">{words.join(' ')}</span>
      <span className="pl-3 text-xs opacity-80 break-words">{book.author}</span>
    </div>
  );
}
