/**
 * Reusable Badge component.
 * variant: 'default' | 'tech' | 'business' | 'liberal' | 'research' | 'government' | 'private'
 */

const variantStyles = {
  default:    'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300',
  tech:       'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  business:   'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  liberal:    'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
  research:   'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  government: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
  private:    'bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300',
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
