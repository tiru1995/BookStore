# PageTurn – eCommerce Bookstore

A responsive front-end bookstore built with **React 18, TypeScript, Tailwind CSS and Vite**.
All data is local (seed data + `localStorage`), so there is no backend to configure.

## Features

- **Header & navigation** – brand logo, live search by title or author, category pills
  (All, Fiction, Non-Fiction, Tech & AI, Design, Classics) and a cart button with a live item-count badge.
- **Catalog grid** – 1 column on mobile, 2 on small tablets, 3 on tablet/laptop and 4 on wide screens.
  Each card shows an SVG-generated cover (no image URLs, so nothing can break), title, author, genre tag,
  rating, ₹ price, format and stock badges, and *Add to Cart*. Sort by Featured, Price (low→high / high→low) or Rating.
- **Quick view** – click a book for the synopsis, ISBN / publisher / pages / year, a format selector
  (Paperback, Hardcover, eBook, each priced separately) and *Add to Cart*.
- **Cart drawer** – add/remove books, change quantities (capped by stock; eBooks capped at 10), subtotal,
  5 % GST, delivery fee (free over ₹500 of print books, none for eBooks-only orders), estimated delivery dates,
  and clear cart.
- **Simulated checkout** – validated delivery form → simulated payment delay → order confirmation.
  The cart and the last order are persisted in `localStorage`
  (`pageturn.cart.v1`, `pageturn.lastOrder.v1`).
- **16 seed books** across all five categories, so filtering, searching and sorting work immediately.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build
```

## Project structure

```
src/
├─ main.tsx, App.tsx, index.css
├─ types/index.ts            # Book, CartItem, Order, format/genre/sort types
├─ data/books.ts             # seed catalog and findBook()
├─ data/categories.ts        # category pill options
├─ utils/                    # format.ts (₹ INR, dates), pricing.ts (GST, delivery, stock rules)
├─ hooks/                    # useLocalStorage, useBookFilters, useDialogBehavior
├─ context/CartContext.tsx   # cart + last order state, persisted
└─ components/
   ├─ layout/    Header, SearchInput, CategoryPills
   ├─ catalog/   BookGrid, BookCard, BookCover, RatingStars, Badges, SortSelect
   ├─ quickview/ QuickViewModal
   ├─ cart/      CartDrawer, CartItemRow, OrderSummary, CheckoutForm, OrderConfirmation
   └─ ui/        Drawer (accessible dialog shell), Button, EmptyState
```

## Accessibility & responsiveness

- Semantic landmarks (`header`, `nav`, `main`, `footer`), a skip link, a labelled search field and labelled controls.
- Drawers and modals use `role="dialog"` with `aria-modal`, trap focus, close on `Esc` or backdrop click,
  lock body scroll and return focus to the trigger.
- Cart badge, quantities and result counts use `aria-label` / `aria-live`; form errors use `aria-invalid` and `aria-describedby`.
- `prefers-reduced-motion` is respected.
- Layout uses `min-w-0`, wrapping flex rows and `overflow-x-hidden` on the root to prevent horizontal
  scrolling at 375 px and 1440 px.

## How IBM Bob was used

This project was built with **IBM Bob** in Agent mode:

1. **Planning** – Bob proposed the folder and component architecture before any code was written.
2. **Scaffolding** – Bob created the Vite + React + TypeScript + Tailwind configuration and installed dependencies.
3. **Implementation** – Bob generated the typed data model, seed catalog, pricing utilities, hooks, cart context and
   all UI components, following accessibility requirements (focus trapping, ARIA, keyboard support).
4. **Validation** – Bob ran `npm run build` (TypeScript type-check + Vite build) to confirm the project compiles.
5. **Documentation** – Bob wrote this README.

Review generated code before using it in production.
