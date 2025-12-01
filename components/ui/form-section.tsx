export function FormSection({ title, children }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="grid grid-cols-2 gap-6">{children}</div>
    </div>
  );
}
