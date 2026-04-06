export function Spinner({ size = 20, className = '', label = 'Loading' }) {
  const s = typeof size === 'number' ? size : parseInt(size, 10) || 20
  return (
    <svg
      role="status"
      aria-label={label}
      width={s}
      height={s}
      viewBox="0 0 24 24"
      className={`animate-spin text-violet-600 dark:text-violet-400 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{label}</title>
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  )
}
