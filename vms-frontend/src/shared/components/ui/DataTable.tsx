// shared/components/ui/DataTable.tsx
interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  align?: "left" | "right";
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  keyExtractor: (row: T) => string;
}

export function DataTable<T>({
  columns, data, isLoading, emptyMessage = "No records found.", keyExtractor
}: DataTableProps<T>) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800
                     bg-white dark:bg-neutral-950 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50 dark:bg-neutral-900 text-neutral-500">
          <tr>
            {columns.map(col => (
              <th
                key={col.header}
                className={`px-5 py-3 font-medium ${col.align === "right" ? "text-right" : "text-left"}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {isLoading && (
            <tr><td colSpan={columns.length} className="px-5 py-6 text-center text-neutral-400">Loading…</td></tr>
          )}
          {!isLoading && data.length === 0 && (
            <tr><td colSpan={columns.length} className="px-5 py-6 text-center text-neutral-400">{emptyMessage}</td></tr>
          )}
          {data.map(row => (
            <tr key={keyExtractor(row)}>
              {columns.map(col => (
                <td key={col.header} className={`px-5 py-3 ${col.align === "right" ? "text-right" : ""}`}>
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}