/**
 * SearchBar – reusable search input for colleges / exams.
 * Props:
 *   value       string   – controlled input value
 *   onChange    fn       – (value: string) => void
 *   placeholder string   – input placeholder text
 *   className   string   – extra wrapper classes
 */

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      className="text-slate-400"
    >
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

export default function SearchBar({
  value = '',
  onChange,
  placeholder = 'Search…',
  className = '',
}) {
  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Search icon – left */}
      <span className="absolute left-3.5 pointer-events-none">
        <SearchIcon />
      </span>

      <input
        id="college-search"
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full h-11 pl-10 pr-10 rounded-xl
                   text-sm text-slate-800 dark:text-slate-100
                   placeholder:text-slate-400 dark:placeholder:text-slate-500
                   bg-white dark:bg-[#1a1d27]
                   border border-slate-200 dark:border-[#252836]
                   ring-0 outline-none
                   focus:border-brand-400 dark:focus:border-brand-500
                   focus:ring-2 focus:ring-brand-400/20 dark:focus:ring-brand-500/20
                   transition-all duration-150"
      />

      {/* Clear button – right */}
      {value && (
        <button
          onClick={() => onChange?.('')}
          aria-label="Clear search"
          className="absolute right-3.5 text-slate-400 hover:text-slate-600
                     dark:hover:text-slate-200 transition-colors"
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
}
