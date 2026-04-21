import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import colleges from '../data/collegeDataset';
import { getCollegeDetail } from '../data/collegeDetails';
import exams from '../data/examDataset';
import { generateCollegeInsight } from '../services/aiService';
import { useSavedColleges } from '../hooks/useSavedColleges';

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const SaveIcon = ({ saved }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

function Section({ title, icon, children, className = '' }) {
  return (
    <section className={`card p-6 ${className}`}>
      {title && (
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-100">
          {icon && <span className="text-slate-400 dark:text-slate-500">{icon}</span>}
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

function NotFound() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mb-4 text-5xl">College</div>
      <h1 className="mb-2 text-2xl font-bold text-slate-800 dark:text-slate-100">College not found</h1>
      <p className="mb-6 text-slate-500 dark:text-slate-400">We could not find a college with that ID.</p>
      <Link to="/colleges" className="btn-primary">Browse all colleges</Link>
    </main>
  );
}

function OverviewVisual({ image, gradient, type, shortName, name, location }) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="h-full min-h-48 w-full object-cover"
      />
    );
  }

  return (
    <div className={`h-full min-h-48 w-full bg-gradient-to-br ${gradient} p-6 text-white`}>
      <p className="text-xs uppercase tracking-[0.24em] text-white/70">{type}</p>
      <div className="mt-8">
        <p className="text-3xl font-bold leading-tight">{shortName || name.slice(0, 3).toUpperCase()}</p>
        <p className="mt-2 text-sm text-white/80">{location}</p>
      </div>
    </div>
  );
}

export default function CollegeDetailPage({ user, showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isCollegeSaved, toggleSave } = useSavedColleges();
  const saved = isCollegeSaved(id);
  const [expandedExamId, setExpandedExamId] = useState('');
  const fetchedInsightFor = useRef('');



  const college = colleges.find((entry) => entry.id === id);
  const detail = getCollegeDetail(id);
  const officialWebsite = detail?.officialWebsite || college?.officialWebsite || '';
  const collegeExams = (detail?.entryExams || college?.entryExams || []).map((examName) => {
    const normalizedName = examName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const details =
      exams.find((exam) => {
        const normalizedExamName = exam.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const normalizedShortName = exam.shortName.toLowerCase().replace(/[^a-z0-9]/g, '');

        return (
          normalizedExamName === normalizedName ||
          normalizedShortName === normalizedName ||
          normalizedExamName.includes(normalizedName) ||
          normalizedName.includes(normalizedExamName) ||
          normalizedShortName.includes(normalizedName) ||
          normalizedName.includes(normalizedShortName)
        );
      }) || null;

    return { name: examName, details };
  });

  useEffect(() => {
    if (!college || fetchedInsightFor.current === id) return;

    fetchedInsightFor.current = id;
    // setInsightLoading(true);
    // setInsight(null);

    generateCollegeInsight(college)
      .then(() => {
        // setInsight(text);
        // setInsightLoading(false);
      })
      .catch((error) => {
        console.error('[CollegeDetail] Insight error:', error);
        // setInsight('AI insight not available right now');
        // setInsightLoading(false);
      });
  }, [college, id]);

  if (!college) return <NotFound />;

  const { name, location, type, tags, rating, annualFees, avgPackage } = college;
  const gradients = [
    'from-blue-500 via-indigo-600 to-purple-700',
    'from-purple-500 via-pink-500 to-rose-600',
    'from-emerald-500 via-teal-500 to-cyan-600',
    'from-amber-500 via-orange-500 to-red-500',
    'from-sky-500 via-blue-500 to-indigo-600',
    'from-rose-500 via-pink-500 to-fuchsia-600',
  ];
  const gradient = gradients[id.charCodeAt(id.length - 1) % gradients.length];

  return (
    <main className="pb-16">
      <div className={`relative overflow-hidden bg-gradient-to-br ${gradient}`}>
        <div aria-hidden className="absolute inset-0 bg-black/20" />

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/colleges')}
            className="group mb-6 flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors duration-150 hover:text-white"
          >
            <span className="transition-transform duration-150 group-hover:-translate-x-0.5">
              <BackIcon />
            </span>
            Back
          </button>

          <div className="mb-3 flex flex-wrap gap-2">
            {tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white/90 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-3 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            {name}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
            <span className="flex items-center gap-1.5">
              <PinIcon />
              {location}
            </span>
            <span className="rounded-md border border-white/20 bg-white/15 px-2 py-0.5 text-xs font-medium text-white/90">
              {type}
            </span>
            {rating && (
              <span className="font-semibold text-amber-300">
                ⭐ {rating.toFixed(1)} / 10
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:px-8">
        {/* ─── Left column ─────────────────────────────────── */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          {(annualFees || avgPackage) && (
            <Section>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {annualFees && (
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Annual Fees</p>
                    <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">{annualFees}</p>
                  </div>
                )}
                {avgPackage && (
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Average Package</p>
                    <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">{avgPackage}</p>
                  </div>
                )}
              </div>
            </Section>
          )}

          <Section title="About" icon="ℹ️">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {detail?.about || college.description}
            </p>

            {detail.highlights?.length > 0 && (
              <ul className="mt-4 flex flex-col gap-2">
                {detail.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </div>

        {/* ─── Right column ────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          {collegeExams.length > 0 && (
            <Section title="Entry via Exams">
              <div className="flex flex-col gap-2">
                {collegeExams.map(({ name: examName, details }) => (
                  <div key={examName} className="overflow-hidden rounded-lg border border-slate-100 bg-slate-50 dark:border-white/[0.06] dark:bg-white/[0.04]">
                    <button
                      type="button"
                      onClick={() => setExpandedExamId((current) => (current === examName ? '' : examName))}
                      className="group flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-all duration-150 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
                    >
                      {examName}
                      <span className={`text-slate-300 transition-all group-hover:text-brand-400 dark:text-slate-600 ${expandedExamId === examName ? 'rotate-90' : ''}`}>
                        <ArrowRight />
                      </span>
                    </button>

                    {expandedExamId === examName && details && (
                      <div className="border-t border-slate-100 px-3 py-3 text-xs dark:border-white/[0.06]">
                        <p className="font-semibold text-slate-800 dark:text-slate-100">{details.name}</p>
                        <p className="mt-1 text-slate-600 dark:text-slate-300">{details.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2 text-slate-500 dark:text-slate-400">
                          <span>{details.conductingBody}</span>
                          <span>{details.nextDate}</span>
                          <span>{details.duration}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          <Section title="Quick Actions">
            <div className="flex flex-col gap-2.5">
              <div>
                <button
                  onClick={() => {
                    if (!user) {
                      showToast?.('Log in to save colleges');
                      return;
                    }
                    toggleSave(id);
                  }}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-150 ${
                    saved
                      ? 'bg-brand-600 text-white shadow-brand hover:bg-brand-700'
                      : 'bg-brand-500 text-white shadow-brand hover:bg-brand-600'
                  }`}
                >
                  <SaveIcon saved={saved} />
                  {saved ? 'Saved' : 'Save College'}
                </button>

              </div>

              {officialWebsite && (
                <a
                  href={officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-150 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/[0.04]"
                >
                  <LinkIcon />
                  Official Website
                </a>
              )}
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}
