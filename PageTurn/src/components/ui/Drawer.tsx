import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useDialogBehavior } from '../../hooks/useDialogBehavior';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** 'right' slides in from the right (cart); 'center' shows a centred dialog (quick view). */
  placement?: 'right' | 'center';
  children: ReactNode;
}

export function Drawer({ open, onClose, title, placement = 'right', children }: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialogBehavior(open, onClose, panelRef);

  if (!open) return null;

  const titleId = `dialog-title-${placement}`;
  const panelClass =
    placement === 'right'
      ? 'ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-xl'
      : 'm-auto flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl';
  const containerClass =
    placement === 'right' ? 'fixed inset-0 z-50 flex' : 'fixed inset-0 z-50 flex p-4';

  return (
    <div className={containerClass}>
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative z-10 outline-none ${panelClass}`}
      >
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <h2 id={titleId} className="min-w-0 truncate font-serif text-lg font-bold text-slate-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
