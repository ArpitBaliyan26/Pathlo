import { Link } from 'react-router-dom';
import Badge, { tagToVariant } from './Badge';

/** Star rating display */
function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
        fill="currentColor" stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
      {rating.toFixed(1)}
    </span>
  );
}

/** Location pin icon */
function LocationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="shrink-0 mt-0.5">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

/** Arrow icon */
function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

/**
 * CollegeCard — reusable card for college listings.
 * Props: college (object from data/colleges.js), compact (boolean for smaller variant)
 */
export default function CollegeCard({ college, compact = false }) {
  const {
    id, name, location, type, tags,
    description, rating, annualFees, avgPackage,
  } = college;

  // Generate a deterministic gradient from the college id
  const gradients = [
    'from-blue-400 to-indigo-600',
    'from-purple-400 to-pink-600',
    'from-emerald-400 to-teal-600',
    'from-amber-400 to-orange-600',
    'from-rose-400 to-red-600',
    'from-sky-400 to-blue-600',
  ];
  const gradientIndex = id.charCodeAt(id.length - 1) % gradients.length;
  const gradient = gradients[gradientIndex];

  // Type badge color
  const typeBadge =
    type === 'Government'   ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300' :
    type === 'Private Top'  ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300' :
    type === 'Deemed'       ? 'bg-teal-100  text-teal-700  dark:bg-teal-500/20  dark:text-teal-300' :
                              'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300';

  return (
    <article className="card group flex flex-col overflow-hidden">
      {/* ── Image / gradient header ──────────────────── */}
      <div className={`relative h-32 bg-gradient-to-br ${gradient} flex items-end p-3`}>
        {/* Type badge overlay */}
        <span className={`badge ${typeBadge} text-[10px] uppercase tracking-wider font-semibold`}>
          {type}
        </span>
        {/* Save button placeholder */}
        <button
          aria-label="Save college"
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg
                     bg-white/20 hover:bg-white/40 backdrop-blur-sm
                     flex items-center justify-center text-white
                     transition-colors duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
        {/* Initials avatar */}
        <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm
                        flex items-center justify-center text-white text-xs font-bold">
          {college.shortName?.slice(0, 2) || name.slice(0, 2).toUpperCase()}
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Name + rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 leading-snug line-clamp-2">
            {name}
          </h3>
          <StarRating rating={rating} />
        </div>

        {/* Location */}
        <p className="flex items-start gap-1 text-xs text-slate-500 dark:text-slate-400 -mt-1">
          <LocationIcon />
          {location}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant={tagToVariant(tag)}>
              {tag}
            </Badge>
          ))}
        </div>

        {/* Description */}
        {!compact && (
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Stats row */}
        <div className="flex gap-4 mt-auto pt-3 border-t border-slate-100 dark:border-white/[0.06]">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Avg Fees</p>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">₹{annualFees}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Avg Package</p>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">₹{avgPackage}</p>
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/colleges/${id}`}
          className="mt-2 flex items-center justify-between w-full text-xs font-medium
                     text-brand-600 dark:text-brand-400
                     hover:text-brand-700 dark:hover:text-brand-300
                     transition-colors duration-150 group/link"
        >
          View Details
          <span className="group-hover/link:translate-x-1 transition-transform duration-150">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </article>
  );
}
