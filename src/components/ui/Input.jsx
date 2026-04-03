export function Input({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
        </span>
      ) : null}
      <input
        className={`w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-violet-500/40 focus:ring-2 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 ${className}`}
        {...props}
      />
    </label>
  )
}

