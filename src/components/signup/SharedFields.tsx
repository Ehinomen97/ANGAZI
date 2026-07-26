"use client";

export function TextField({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}</label>
      <input
        {...props}
        className="focus-ring mt-1.5 w-full rounded-xl border border-ink/15 p-3 text-sm"
      />
    </div>
  );
}
