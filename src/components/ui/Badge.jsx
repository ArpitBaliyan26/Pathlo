/**
 * Reusable Badge component.
 * variant: 'default' | 'tech' | 'business' | 'liberal' | 'research' | 'government' | 'private'
 */

const variantStyles = {
  default:    'border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-700/70 dark:text-slate-100',
  tech:       'border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-400/40 dark:bg-blue-500/25 dark:text-blue-100',
  business:   'border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/40 dark:bg-amber-500/25 dark:text-amber-100',
  liberal:    'border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/40 dark:bg-rose-500/25 dark:text-rose-100',
  research:   'border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-500/25 dark:text-emerald-100',
  government: 'border border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-400/40 dark:bg-indigo-500/25 dark:text-indigo-100',
  private:    'border border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-400/40 dark:bg-purple-500/25 dark:text-purple-100',
};

/** Map a raw tag string to a variant */
export function tagToVariant(tag) {
  const t = tag.toLowerCase();
  if (t.includes('engineer') || t.includes('tech') || t.includes('it')) return 'tech';
  if (t.includes('business') || t.includes('mba') || t.includes('management')) return 'business';
  if (t.includes('liberal') || t.includes('arts') || t.includes('humanities')) return 'liberal';
  if (t.includes('research') || t.includes('science')) return 'research';
  if (t.includes('government') || t.includes('govt')) return 'government';
  if (t.includes('private')) return 'private';
  return 'default';
}

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span className={`badge ${variantStyles[variant] || variantStyles.default} ${className}`}>
      {children}
    </span>
  );
}
