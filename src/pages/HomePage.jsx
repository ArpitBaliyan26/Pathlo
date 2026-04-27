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

/* ─── Main: HomePage ─────────────────────────────────────────── */
export default function HomePage({ user, showToast }) {
  const featuredColleges = useMemo(() => shuffleArray(colleges).slice(0, 3), []);
  const featuredExams = useMemo(() => shuffleArray(exams).slice(0, 3), []);

  const allCategoryCards = [
    ...categories,
    { id: 'gov', label: 'Government', icon: '🏛️', description: 'Subsidised fees, strong public reputation', count: null, link: '/colleges?type=Government' },
    { id: 'pvt', label: 'Private',    icon: '🏫', description: 'Industry-linked modern campuses',           count: null, link: '/colleges?type=Private' },
  ];

  return (
    <main className="flex-1">

      {/* ════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2
                          w-[700px] h-[400px] rounded-full
                          bg-gradient-to-b from-brand-100/60 to-transparent
                          dark:from-brand-900/30 dark:to-transparent
                          blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                          bg-brand-50 dark:bg-brand-500/10
                          border border-brand-100 dark:border-brand-500/20
                          text-brand-600 dark:text-brand-400 text-xs font-medium mb-6">
            <img src="/logo.svg" alt="" className="w-4 h-4 rounded-full" />
            Modern college discovery for Indian students
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight
                         text-slate-900 dark:text-white leading-[1.1] text-balance mb-5">
            Discover Your{' '}
            <span className="text-brand-500 dark:text-brand-400">Path</span>
            , Your Way
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-500 dark:text-slate-400
                         leading-relaxed mb-8 text-balance">
            Not sure where to start? Browse all colleges, apply filters by field or type, and learn what each path actually looks like – beyond the rankings.
          </p>

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

          <div className="mt-14 grid grid-cols-3 gap-x-6 gap-y-3 max-w-lg mx-auto text-xs text-slate-500 dark:text-slate-400">
            <span className="flex flex-col items-center gap-1 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 11.08-2-1.73-5.25-3.03-7.5-4.33-2.5 1.44 7.5 4.33 5.25 3.03 2 1.73z"/><path d="m22 11.08-7.5 4.33-5.25 3.03-2 1.73-2.5-1.44 2-1.73 5.25-3.03 7.5-4.33z"/><path d="M1.96 9.35 4.5 7.9l7.5 4.33 7.5 4.33 2.54 1.47-2.5 1.44-7.5-4.33-7.5-4.33Z"/></svg>
              New-Age Tech<br/>Colleges
            </span>
            <span className="flex flex-col items-center gap-1 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect x="2" y="20" width="20" height="2"/><path d="M12 12h0"/></svg>
              Modern Business<br/>Schools
            </span>
            <span className="flex flex-col items-center gap-1 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Liberal Arts<br/>Universities
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURED COLLEGES
          ════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <SectionHeader
          eyebrow="✦ Colleges"
          title="Explore colleges across different fields and paths"
          subtitle=""
          action={{ label: 'View all', href: '/colleges' }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} user={user} showToast={showToast} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          EXPLORE BY CATEGORY – single blue box
          ════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="relative overflow-hidden rounded-2xl
                        bg-gradient-to-br from-brand-600 via-brand-500 to-indigo-500
                        dark:from-brand-700 dark:via-brand-600 dark:to-indigo-600
                        p-8 sm:p-10">
          {/* Decorations */}
          <div aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-full w-1/2
                       bg-gradient-to-l from-white/5 to-transparent" />
          <div aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56
                       rounded-full bg-white/5 blur-3xl" />

          {/* Header */}
          <div className="relative z-10 mb-7">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
              ✦ Explore by Category
            </p>
            <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
              What path excites you?
            </h2>
            <p className="text-white/75 text-sm mt-1.5">
              Browse colleges and exams by your area of interest
            </p>
          </div>

          {/* Glass cards grid */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {allCategoryCards.map((cat) => (
              <Link
                key={cat.id}
                to={cat.link}
                className="group flex flex-col gap-2.5 p-4 rounded-xl
                           bg-white/10 hover:bg-white/20
                           border border-white/15 hover:border-white/35
                           transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="text-2xl" role="img" aria-label={cat.label}>{cat.icon}</span>
                <div>
                  <p className="text-white text-sm font-semibold leading-snug">{cat.label}</p>
                  <p className="text-white/65 text-xs mt-0.5 line-clamp-2">{cat.description}</p>
                </div>
                {cat.count && (
                  <span className="text-white/45 text-xs mt-auto">{cat.count}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          UPCOMING EXAMS TEASER
          ════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <SectionHeader
          eyebrow="✦ Upcoming Exams"
          title="Explore Entrance Exams"
          subtitle="Dates, syllabus, difficulty and more – all in one place"
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

              <div className="flex flex-wrap gap-1.5">
                <span className={`badge ${exam.difficulty === 'Hard' ? 'text-red-500 bg-red-50 dark:bg-red-500/10' : exam.difficulty === 'Moderate' ? 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' : 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'} font-semibold`}>
                  ▏ {exam.difficulty}
                </span>
                <span className="badge bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300">{exam.field}</span>
                <span className="badge bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300 text-[10px]">
                  {exam.frequency}
                </span>
              </div>

              <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span>📅 {exam.nextDate}</span>
                <span>👤 {exam.approxApplicants}</span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                {exam.description}
              </p>

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
