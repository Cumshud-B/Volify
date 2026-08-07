// shared/components/ui/Spinner.tsx
export function Spinner({ size = 20 }: { size?: number }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-neutral-200 border-t-indigo-600"
      style={{ width: size, height: size }}
    />
  );
}