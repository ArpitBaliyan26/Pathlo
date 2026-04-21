import { Link } from 'react-router-dom';
import Badge, { tagToVariant } from './Badge';
import { useSavedColleges } from '../../hooks/useSavedColleges';

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0"
    >
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function SaveIcon({ saved }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CardVisual({ image, gradient, type, shortName, name, location }) {
  if (image) {
    return <img src={image} alt={name} className="h-36 w-full object-cover" />;
  }

  return (
    <div className={`h-36 w-full bg-gradient-to-br ${gradient} p-4 text-white`}>
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">{type}</p>
      <div className="mt-6">
        <p className="text-xl font-bold leading-tight">{shortName || name.slice(0, 3).toUpperCase()}</p>
        <p className="mt-1 text-xs text-white/80">{location}</p>
      </div>
    </div>
  );
}

export default function CollegeCard({ college, compact = false, user = null, showToast }) {
  const { isCollegeSaved, toggleSave } = useSavedColleges();
  const saved = isCollegeSaved(college.id);

  const {
    id,
    name,
    location,
    type,
    description,
    image,
    shortName,
    rating,
    annualFees,
    avgPackage,
  } = college;

  const visibleTags = college.tags?.slice(0, 3) ?? [];
  const courses = college.courses || college.coursesOffered || [];
  const gradient = [
    'from-blue-500 to-indigo-600',
    'from-violet-500 to-purple-700',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-red-600',
    'from-sky-500 to-blue-600',
    'from-pink-500 to-fuchsia-600',
    'from-teal-500 to-cyan-600',
  ][id.charCodeAt(id.length - 1) % 8];

  const handleSave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      showToast?.('Log in to save colleges');
      return;
    }

    toggleSave(id);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-700 dark:bg-[#1e293b]">
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/30">
          <button
            type="button"
            onClick={handleSave}
            aria-label={saved ? 'Unsave college' : 'Save college'}
            className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg border backdrop-blur-sm transition-all duration-150 ${
              saved
                ? 'border-brand-500 bg-brand-500 text-white'
                : 'border-white/20 bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <SaveIcon saved={saved} />
          </button>
          <CardVisual
            image={image}
            gradient={gradient}
            type={type}
            shortName={shortName}
            name={name}
            location={location}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 dark:text-white">
          {name}
        </h3>

        <div className="flex items-center justify-between -mt-1 text-xs text-slate-500 dark:text-slate-400">
          <p className="flex items-center gap-1">
            <LocationIcon />
            {location}
          </p>
          {rating && (
            <p className="font-semibold text-amber-600 dark:text-amber-400">
              ⭐ {rating.toFixed(1)} / 10
            </p>
          )}
        </div>

        {(annualFees || avgPackage) && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            {annualFees && (
              <div>
                <p className="text-slate-500 dark:text-slate-400">Fees</p>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{annualFees}</p>
              </div>
            )}
            {avgPackage && (
              <div>
                <p className="text-slate-500 dark:text-slate-400">Avg. Package</p>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{avgPackage}</p>
              </div>
            )}
          </div>
        )}

        {visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <Badge key={tag} variant={tagToVariant(tag)}>
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {!compact && description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {description}
          </p>
        )}

        {courses.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {courses.slice(0, 3).map((course) => (
              <span
                key={course}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800/50 dark:text-slate-300"
              >
                {course}
              </span>
            ))}
          </div>
        )}

        <Link
          to={`/colleges/${id}`}
          className="group/link mt-1 flex w-full items-center justify-between text-xs font-semibold text-brand-600 transition-colors duration-150 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
        >
          View Details
          <span className="transition-transform duration-150 group-hover/link:translate-x-1">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </article>
  );
}
