interface Feature {
  name: string;
  toolA: string | boolean;
  toolB: string | boolean;
}

interface ComparisonTableProps {
  toolA: string;
  toolB: string;
  features: Feature[];
}

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </span>
    ) : (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100">
        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    );
  }
  return <span className="text-sm text-neutral-700">{value}</span>;
}

export default function ComparisonTable({ toolA, toolB, features = [] }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 my-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-neutral-50">
            <th className="text-left px-5 py-3.5 font-semibold text-neutral-600 border-b border-neutral-200 w-1/3">
              Feature
            </th>
            <th className="text-center px-5 py-3.5 font-semibold text-neutral-900 border-b border-neutral-200 w-1/3 border-l border-neutral-200">
              {toolA}
            </th>
            <th className="text-center px-5 py-3.5 font-semibold text-neutral-900 border-b border-neutral-200 w-1/3 border-l border-neutral-200">
              {toolB}
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr
              key={f.name}
              className={i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}
            >
              <td className="px-5 py-3 font-medium text-neutral-700">{f.name}</td>
              <td className="px-5 py-3 text-center border-l border-neutral-100">
                <Cell value={f.toolA} />
              </td>
              <td className="px-5 py-3 text-center border-l border-neutral-100">
                <Cell value={f.toolB} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
