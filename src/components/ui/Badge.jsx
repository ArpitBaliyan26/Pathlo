/**
 * Reusable Badge component.
 * variant: 'default' | 'tech' | 'business' | 'liberal' | 'research' | 'government' | 'private'
 */

const variantStyles = {
  default:    'bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300',
  tech:       'bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200',
  business:   'bg-amber-50 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200',
  liberal:    'bg-rose-50 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200',
  research:   'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200',
  government: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200',
  private:    'bg-purple-50 text-purple-700 dark:bg-purple-500/20 dark:text-purple-200',
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
