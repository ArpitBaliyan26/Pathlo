import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import colleges from '../data/collegeDataset';
import { getCollegeDetail } from '../data/collegeDetails';
import exams from '../data/examDataset';
import { getEnrichedData } from '../data/enrichedData';
import { getCollegeProvenance, getProvenanceMeta } from '../data/provenance';
import { generateCollegeInsight } from '../services/aiService';
import { useSavedColleges } from '../hooks/useSavedColleges';
import { findCollegeByRouteKey, getCollegeSlug } from '../utils/collegeSlug';

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

const PlatformIcon = ({ platform, icon }) => {
  switch (platform) {
    case 'youtube':
      return <svg viewBox="0 0 24 24" fill="#FF0000" width="18" height="18"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
    case 'reddit':
      return <img src="/reddit.png" alt="Reddit" width="18" height="18" className="object-contain" />;
    case 'quora':
      return <img src="/quora.png" alt="Quora" width="18" height="18" className="object-contain" />;
    case 'maps':
      return <svg viewBox="0 0 24 24" fill="#34A853" width="18" height="18"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>;
    case 'google':
      return <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path fill="#4285F4" d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19.01 23.7449 15.92 23.7449 12.27Z"/><path fill="#34A853" d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.1249 19.25 6.4749 17.14 5.5249 14.29H1.54492V17.38C3.51492 21.3 7.5649 24 12.2549 24Z"/><path fill="#FBBC05" d="M5.5249 14.29C5.2749 13.57 5.1449 12.8 5.1449 12C5.1449 11.2 5.2849 10.43 5.5249 9.71V6.62H1.54492C0.724922 8.24 0.2549 10.06 0.2549 12C0.2549 13.94 0.724922 15.76 1.54492 17.38L5.5249 14.29Z"/><path fill="#EA4335" d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.5649 0 3.51492 2.7 1.54492 6.62L5.5249 9.71C6.4749 6.86 9.1249 4.75 12.2549 4.75Z"/></svg>;
    default:
      return <span className="text-base leading-none">{icon ?? '🔖'}</span>;
  }
};

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
      <div className="mb-4 text-5xl">🎓</div>
      <h1 className="mb-2 text-2xl font-bold text-slate-800 dark:text-slate-100">College not found</h1>
      <p className="mb-6 text-slate-500 dark:text-slate-400">We could not find a college with that ID.</p>
      <Link to="/colleges" className="btn-primary">Browse all colleges</Link>
    </main>
  );
}

export default function CollegeDetailPage({ user, showToast }) {
  const { collegeKey: routeKey } = useParams();
  const routeLocation = useLocation();
  const navigate = useNavigate();
  const { isCollegeSaved, toggleSave } = useSavedColleges();
  const [expandedExamId, setExpandedExamId] = useState('');
  const fetchedInsightFor = useRef('');

  const [insight, setInsight] = useState(null);
  const [insightLoading, setInsightLoading] = useState(false);

  const college = findCollegeByRouteKey(colleges, routeKey);
  const collegeId = college?.id || routeKey;
  const canonicalSlug = college ? getCollegeSlug(college) : '';
  const saved = isCollegeSaved(collegeId);
  const detail = getCollegeDetail(collegeId);
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
    if (!college || !canonicalSlug || routeKey === canonicalSlug) return;

    navigate(`/colleges/${canonicalSlug}${routeLocation.search}${routeLocation.hash}`, {
      replace: true,
    });
  }, [canonicalSlug, college, navigate, routeKey, routeLocation.hash, routeLocation.search]);

  useEffect(() => {
    if (!college || fetchedInsightFor.current === collegeId) return;

    fetchedInsightFor.current = collegeId;
    setInsightLoading(true);
    setInsight(null);

    generateCollegeInsight(college)
      .then((text) => {
        setInsight(text);
        setInsightLoading(false);
      })
      .catch((error) => {
        console.error('[CollegeDetail] Insight error:', error);
        setInsight('AI insight not available right now. Please try again later.');
        setInsightLoading(false);
      });
  }, [college, collegeId]);

  if (!college) return <NotFound />;

  const { name, location, type, tags, rating } = college;
  const enriched = getEnrichedData(collegeId);
  const annualFees = college.annualFees || enriched.fees;
  const avgPackage = college.avgPackage || enriched.pkg;
  const provenance = getCollegeProvenance(collegeId);
  const provenanceMeta = getProvenanceMeta(provenance);
  const isVerified = provenance.status === 'verified';
  const confidenceLabel = provenance.confidence
    ? `${provenance.confidence.charAt(0).toUpperCase()}${provenance.confidence.slice(1)} confidence`
    : null;
  const displayAlumni = detail?.alumni?.length > 0 ? detail.alumni : enriched.alumni;
  const gradients = [
    'from-blue-900/90 via-indigo-900/80 to-purple-900/90',
    'from-purple-900/90 via-pink-900/80 to-rose-900/90',
    'from-emerald-900/90 via-teal-900/80 to-cyan-900/90',
    'from-amber-900/90 via-orange-900/80 to-red-900/90',
    'from-sky-900/90 via-blue-900/80 to-indigo-900/90',
    'from-rose-900/90 via-pink-900/80 to-fuchsia-900/90',
  ];
  const campusImages = [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1571260899304-425070110588?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=2000'
  ];
  const gradient = gradients[collegeId.charCodeAt(collegeId.length - 1) % gradients.length];
  const bgImage = campusImages[collegeId.charCodeAt(collegeId.length - 1) % campusImages.length];

  return (
    <main className="pb-16">
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} mix-blend-multiply`} />
        {/* Extra darkening for readability */}
        <div aria-hidden className="absolute inset-0 bg-black/40" />

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
        {/* ─── Left column (Main content) ────────────────── */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          
          {/* AI Insight */}
          <Section className="border-brand-200 bg-brand-50/50 dark:border-brand-500/30 dark:bg-brand-500/5">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-brand-800 dark:text-brand-300">
              <span className="text-xl">✨</span> AI Insight
            </h2>
            {insightLoading ? (
              <div className="flex animate-pulse flex-col gap-2">
                <div className="h-4 w-3/4 rounded bg-brand-200 dark:bg-brand-800/50"></div>
                <div className="h-4 w-full rounded bg-brand-200 dark:bg-brand-800/50"></div>
                <div className="h-4 w-5/6 rounded bg-brand-200 dark:bg-brand-800/50"></div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {insight}
              </p>
            )}
          </Section>

          {(annualFees || avgPackage) && (
            <Section>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border ${
                    isVerified
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300'
                      : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-300'
                  }`}
                >
                  {isVerified ? 'Verified' : 'Indicative'}
                </span>

                {confidenceLabel && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {confidenceLabel}
                  </span>
                )}

                {provenance.verifiedOn && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Verified on {provenance.verifiedOn}
                  </span>
                )}
              </div>

              {provenanceMeta.isStale && (
                <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
                  Verification is older than {provenanceMeta.staleAfterDays} days. Please re-check official sources.
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

              {provenance.sourceLinks?.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Sources
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {provenance.sourceLinks.map((source) => (
                      <a
                        key={`${source.label}-${source.url}`}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:text-slate-300 dark:hover:border-brand-500/40 dark:hover:text-brand-300"
                      >
                        {source.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
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

          {/* ── Research Links (Moved to main column) ── */}
          {detail?.externalLinks?.length > 0 && (
            <Section title="Research This College" icon="🔍">
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                Real student perspectives and discussions. Explore YouTube, Reddit, Quora, and Google Reviews to get the full picture.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {detail.externalLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 hover:shadow dark:border-white/[0.08] dark:bg-slate-800/50 dark:text-slate-200 dark:hover:border-brand-500/40 dark:hover:bg-brand-500/10 dark:hover:text-brand-400"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800">
                      <PlatformIcon platform={link.platform} icon={link.icon} />
                    </div>
                    <span className="line-clamp-2 leading-snug">{link.label}</span>
                  </a>
                ))}
              </div>
            </Section>
          )}

        </div>

        {/* ─── Right column (Sidebar) ────────────────────── */}
        <div className="flex flex-col gap-5">
          <Section title="Quick Actions">
            <div className="flex flex-col gap-2.5">
              <div>
                <button
                  onClick={() => {
                    if (!user) {
                      showToast?.(
                        saved
                          ? 'Removed from local bookmarks'
                          : 'Saved locally. Sign in to keep bookmarks across devices.'
                      );
                    }
                    toggleSave(collegeId);
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
              
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(college.name + ' ' + college.location)}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-150 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 dark:border-white/10 dark:text-slate-300 dark:hover:bg-emerald-500/10 dark:hover:border-emerald-500/30 dark:hover:text-emerald-400"
              >
                <PlatformIcon platform="maps" />
                View on Google Maps
              </a>
            </div>
          </Section>

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

          {/* ── Notable Alumni ── */}
          {displayAlumni?.length > 0 && (
            <Section title="Notable Alumni" icon="🌟">
              <div className="flex flex-col gap-3">
                {displayAlumni.map((person) => (
                  <div key={person.name} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-base dark:bg-brand-900/30">
                      {person.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{person.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{person.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

        </div>
      </div>
    </main>
  );
}
