// The four L-shaped corners used site-wide as the "this piece" frame.
export default function Corners({ className = "" }: { className?: string }) {
  const base = "absolute h-7 w-7 border-ink";
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-4 ${className}`}>
      <span className={`${base} left-0 top-0 border-l border-t`} />
      <span className={`${base} right-0 top-0 border-r border-t`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}
