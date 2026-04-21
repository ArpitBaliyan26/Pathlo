/**
 * FilterBar — horizontal scrollable chip filter row.
 *
 * Props:
 *   groups    Array<{ id, label, options: Array<{value, label, icon?}> }>
 *   active    { [groupId]: value | null }
 *   onChange  (groupId, value | null) => void
 */

export default function FilterBar({ groups = [], active = {}, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {groups.map((group) => (
        <div key={group.id} className="flex items-center gap-1.5 flex-wrap">
          {/* Group label */}
          {group.label && (
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 mr-1 shrink-0">
              {group.label}:
            </span>
          )}

          {/* "All" chip */}
          <FilterChip
            label="All"
            active={!active[group.id]}
            onClick={() => onChange?.(group.id, null)}
          />

          {/* Option chips */}
          {group.options.map((opt) => (
            <FilterChip
              key={opt.value}
              label={opt.label}
              icon={opt.icon}
              active={active[group.id] === opt.value}
              color={opt.color}
              tooltip={opt.tooltip}
              onClick={() =>
                onChange?.(group.id, active[group.id] === opt.value ? null : opt.value)
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Single chip ─────────────────────────────────────────── */
const colorMap = {
  blue:    'data-[active=true]:bg-blue-500/10 data-[active=true]:text-blue-600 data-[active=true]:border-blue-300 dark:data-[active=true]:bg-blue-500/15 dark:data-[active=true]:text-blue-400 dark:data-[active=true]:border-blue-500/40',
  amber:   'data-[active=true]:bg-amber-500/10 data-[active=true]:text-amber-600 data-[active=true]:border-amber-300 dark:data-[active=true]:bg-amber-500/15 dark:data-[active=true]:text-amber-400 dark:data-[active=true]:border-amber-500/40',
  rose:    'data-[active=true]:bg-rose-500/10 data-[active=true]:text-rose-600 data-[active=true]:border-rose-300 dark:data-[active=true]:bg-rose-500/15 dark:data-[active=true]:text-rose-400 dark:data-[active=true]:border-rose-500/40',
  emerald: 'data-[active=true]:bg-emerald-500/10 data-[active=true]:text-emerald-600 data-[active=true]:border-emerald-300 dark:data-[active=true]:bg-emerald-500/15 dark:data-[active=true]:text-emerald-400 dark:data-[active=true]:border-emerald-500/40',
  indigo:  'data-[active=true]:bg-indigo-500/10 data-[active=true]:text-indigo-600 data-[active=true]:border-indigo-300 dark:data-[active=true]:bg-indigo-500/15 dark:data-[active=true]:text-indigo-400 dark:data-[active=true]:border-indigo-500/40',
  purple:  'data-[active=true]:bg-brand-500/10 data-[active=true]:text-brand-600 data-[active=true]:border-brand-300 dark:data-[active=true]:bg-brand-500/15 dark:data-[active=true]:text-brand-400 dark:data-[active=true]:border-brand-500/40',
};

function FilterChip({ label, icon, active = false, color = 'purple', tooltip, onClick }) {
  const colorClass = colorMap[color] || colorMap.purple;
  return (
    <button
      data-active={active}
      onClick={onClick}
      title={tooltip}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                  border transition-all duration-150 select-none
                  ${active
                    ? `${colorClass}`
                    : 'border-slate-200 dark:border-[#252836] text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}
