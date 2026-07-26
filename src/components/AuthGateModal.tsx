"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface AuthGateModalProps {
  open: boolean;
  onClose: () => void;
  actionLabel?: string;
}

export default function AuthGateModal({ open, onClose, actionLabel }: AuthGateModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 backdrop-blur-sm px-4 animate-fadeUp"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-gate-title"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-xl2 bg-white p-8 shadow-2xl focus:outline-none"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="focus-ring absolute right-4 top-4 rounded-full p-1.5 text-ink/50 hover:bg-mist hover:text-ink"
        >
          <X size={18} />
        </button>

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest">
          <img src="/logo-mark.png" alt="" className="h-8 w-8" />
        </div>

        <h2 id="auth-gate-title" className="text-center text-xl font-semibold text-ink">
          Create your free Angazi account to continue
        </h2>
        <p className="mt-2 text-center text-sm text-ink/60">
          {actionLabel
            ? `Sign up or log in to ${actionLabel}.`
            : "Sign up or log in to unlock this action — it only takes a minute."}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/signup"
            onClick={onClose}
            className="focus-ring flex h-12 items-center justify-center rounded-xl bg-forest text-sm font-semibold text-white transition hover:bg-forest-dark"
          >
            Create free account
          </Link>
          <Link
            href="/login"
            onClick={onClose}
            className="focus-ring flex h-12 items-center justify-center rounded-xl border border-ink/15 text-sm font-semibold text-ink transition hover:bg-mist"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
