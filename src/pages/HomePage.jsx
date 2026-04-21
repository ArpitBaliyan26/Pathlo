import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import CollegeCard from '../components/ui/CollegeCard';
import colleges, { categories } from '../data/collegeDataset';
import exams from '../data/examDataset';

function shuffleArray(items) {
  const next = [...items];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }

  return next;
}

/* ─── Sub-component: Section header ─────────────────────────── */
function SectionHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        {eyebrow && (
          <p className="section-label mb-1.5">{eyebrow}</p>
        )}
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
        )}
      </div>
      {action && (
        <Link
          to={action.href}
          className="shrink-0 text-sm font-medium text-brand-600 dark:text-brand-400
                     hover:text-brand-700 dark:hover:text-brand-300
                     flex items-center gap-1 transition-colors"
        >
          {action.label}
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      )}
    </div>
  );
}

/* ─── Sub-component: Category card ──────────────────────────── */
const categoryColors = {
  blue:    { bg: 'bg-blue-50 dark:bg-blue-500/10',    border: 'border-blue-100 dark:border-blue-500/20',    text: 'text-blue-700 dark:text-blue-300',    hover: 'hover:border-blue-300 dark:hover:border-blue-500/50' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-500/10',  border: 'border-amber-100 dark:border-amber-500/20',  text: 'text-amber-700 dark:text-amber-300',  hover: 'hover:border-amber-300 dark:hover:border-amber-500/50' },
  rose:    { bg: 'bg-rose-50 dark:bg-rose-500/10',    border: 'border-rose-100 dark:border-rose-500/20',    text: 'text-rose-700 dark:text-rose-300',    hover: 'hover:border-rose-300 dark:hover:border-rose-500/50' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-100 dark:border-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-300', hover: 'hover:border-emerald-300 dark:hover:border-emerald-500/50' },
};

function CategoryCard({ category }) {
  const c = categoryColors[category.color] || categoryColors.blue;
  return (
    <Link
      to={category.link}
      className={`group flex flex-col gap-3 p-5 rounded-xl border ${c.bg} ${c.border} ${c.hover}
                  transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl" role="img" aria-label={category.label}>
          {category.icon}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`${c.text} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200`}>
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
      <div>
        <h3 className={`text-sm font-semibold ${c.text} leading-snug`}>{category.label}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{category.description}</p>
      </div>
      <span className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-auto">
        {category.count}
      </span>
    </Link>
  );
}

/* ─── Main: HomePage ─────────────────────────────────────────── */
export default function HomePage({ user, showToast }) {
  const featuredExams = exams.slice(0, 3);
  const featuredColleges = useMemo(() => shuffleArray(colleges).slice(0, 3), []);

  return (
    <main className="flex-1">

      {/* ════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Subtle background orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2
                          w-[700px] h-[400px] rounded-full
                          bg-gradient-to-b from-brand-100/60 to-transparent
                          dark:from-brand-900/30 dark:to-transparent
                          blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                          bg-brand-50 dark:bg-brand-500/10
                          border border-brand-100 dark:border-brand-500/20
                          text-brand-600 dark:text-brand-400 text-xs font-medium mb-6">
            <img src="/logo.svg" alt="" className="w-4 h-4 rounded-full" />
            Personalised college discovery for Indian students
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight
                         text-slate-900 dark:text-white leading-[1.1] text-balance mb-5">
            Discover Your{' '}
            <span className="text-brand-500 dark:text-brand-400">Path</span>
            , Your Way
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-500 dark:text-slate-400
                         leading-relaxed mb-8 text-balance">
            Pathlo is a discovery platform, not a ranking site.
            Explore modern career paths in business, tech, and liberal arts.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/colleges" className="btn-primary px-6 py-3 text-sm shadow-brand">
              Explore Colleges
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link to="/exam-explorer" className="btn-ghost border border-slate-200 dark:border-white/10 px-6 py-3 text-sm">
              View Exams
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 max-w-lg mx-auto text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 11.08-2-1.73-5.25-3.03-7.5-4.33-2.5 1.44 7.5 4.33 5.25 3.03 2 1.73z"/><path d="m22 11.08-7.5 4.33-5.25 3.03-2 1.73-2.5-1.44 2-1.73 5.25-3.03 7.5-4.33z"/><path d="M1.96 9.35 4.5 7.9l7.5 4.33 7.5 4.33 2.54 1.47-2.5 1.44-7.5-4.33-7.5-4.33Z"/></svg>
              New-Age Tech Schools
            </span>
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect x="2" y="20" width="20" height="2"/><path d="M12 12h0"/></svg>
              Modern Business Schools
            </span>
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 22c-2.66 0-5.08-1.04-6.88-2.78"/><path d="m15.78 15.78-3.56-3.56a2 2 0 0 1 0-2.82l3.56-3.56"/><path d="M12 22c2.66 0 5.08-1.04 6.88-2.78"/></svg>
              Liberal Arts Universities
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          EXPLORE COLLEGES
          ════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <SectionHeader
          eyebrow="✦ Colleges"
          title="Explore colleges across different fields and paths"
          subtitle="Browse colleges by interest, location, and study path. Verified source data will continue to grow here."
          action={{ label: 'View all', href: '/colleges' }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} user={user} showToast={showToast} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CTA BANNER — "Not sure which college fits you?"
          ════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="relative overflow-hidden rounded-2xl
                        bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-500
                        dark:from-brand-700 dark:via-brand-600 dark:to-indigo-600
                        p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* BG decoration */}
          <div aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-full w-1/2
                       bg-gradient-to-l from-white/5 to-transparent" />

          <div className="relative z-10 text-center sm:text-left">
            <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-1.5">
              ✦ Explore Further
            </p>
            <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
              Not sure where to start?
            </h2>
            <p className="text-white/75 text-sm mt-2 max-w-md">
              Browse all colleges, apply filters by field or type, and learn what each path actually looks like — beyond the rankings.
            </p>
          </div>

          <Link
            to="/colleges"
            className="relative z-10 shrink-0 inline-flex items-center gap-2
                       px-6 py-3 rounded-xl bg-white text-brand-600
                       text-sm font-semibold shadow-lg
                       hover:bg-brand-50 active:scale-[0.98]
                       transition-all duration-150"
          >
            Browse All Colleges
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          EXPLORE BY CATEGORY
          ════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <SectionHeader
          eyebrow="✦ Explore by Category"
          title="What path excites you?"
          subtitle="Browse colleges and exams by your area of interest"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          UPCOMING EXAMS TEASER
          ════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <SectionHeader
          eyebrow="✦ Upcoming Exams"
          title="Know Your Exams"
          subtitle="Dates, syllabus, difficulty and more — all in one place"
          action={{ label: 'All exams', href: '/exam-explorer' }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featuredExams.map((exam) => (
            <div key={exam.id}
              className="card p-6 flex flex-col gap-3 group hover:border-brand-200 dark:hover:border-brand-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-500/10
                                  text-brand-600 dark:text-brand-400
                                  flex items-center justify-center text-xs font-bold">
                    {exam.shortName?.slice(0, 2).toUpperCase() || exam.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">{exam.name}</h3>
                    <p className="text-xs text-slate-400">{exam.conductingBody}</p>
                  </div>
                </div>
                <button aria-label="Save exam"
                  className="w-7 h-7 rounded-lg border border-slate-200 dark:border-white/10
                             flex items-center justify-center text-slate-400
                             hover:text-brand-500 hover:border-brand-300
                             dark:hover:border-brand-500/40 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                <span className={`badge ${exam.difficulty === 'Hard' ? 'text-red-500 bg-red-50 dark:bg-red-500/10' : exam.difficulty === 'Moderate' ? 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' : 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'} font-semibold`}>
                  ● {exam.difficulty}
                </span>
                <span className="badge bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300">{exam.field}</span>
                <span className="badge bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300 text-[10px]">
                  {exam.frequency}
                </span>
              </div>

              {/* Date + students */}
              <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span>📅 {exam.nextDate}</span>
                <span>👤 {exam.approxApplicants}</span>
              </div>

              {/* Desc */}
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                {exam.description}
              </p>

              {/* Link */}
              <Link to="/exam-explorer"
                className="mt-auto text-xs font-medium text-brand-600 dark:text-brand-400
                           hover:text-brand-700 flex items-center gap-1 transition-colors">
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
