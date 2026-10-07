"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/cn";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant: "modal" | "sheet";
};

const focusableSelector = [
  "button:not([disabled])",
  "a[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function Dialog({ open, onClose, title, children, variant }: DialogProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>(focusableSelector)];
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex bg-[rgb(18_26_28/0.45)]",
        variant === "sheet"
          ? "items-end justify-center"
          : "items-center justify-center p-4",
      )}
      onClick={() => onCloseRef.current()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className={cn(
          "w-full border border-line bg-surface p-6 shadow-soft outline-none",
          variant === "sheet"
            ? "sheet-panel max-h-[85vh] overflow-y-auto rounded-t-[20px]"
            : "max-w-lg rounded-[20px]",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-[22px] text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => onCloseRef.current()}
            aria-label="Close"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-ink hover:bg-surface-alt"
          >
            <X className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4 text-base text-ink">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

type OverlayProps = Omit<DialogProps, "variant">;

export function Modal(props: OverlayProps) {
  return <Dialog {...props} variant="modal" />;
}

export function Sheet(props: OverlayProps) {
  return <Dialog {...props} variant="sheet" />;
}
