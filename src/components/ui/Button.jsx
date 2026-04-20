import { forwardRef } from 'react';

/**
 * Reusable Button component
 * variant: 'primary' | 'ghost' | 'outline'
 * size: 'sm' | 'md' | 'lg'
 */
const variants = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  outline:
    'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-all duration-150',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: '', // default in variant
  lg: 'px-6 py-3 text-base',
};

const Button = forwardRef(
  ({ children, variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    const base = variants[variant] || variants.primary;
    const sizeClass = sizes[size] || '';
    return (
      <button ref={ref} className={`${base} ${sizeClass} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
