import { useState } from 'react';

/* ─── Difficulty config ──────────────────────────────────────── */
const diffConfig = {
  Hard:     { dot: 'bg-rose-500',    text: 'text-rose-600 dark:text-rose-400',       badge: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20' },
  Moderate: { dot: 'bg-yellow-500',  text: 'text-yellow-600 dark:text-yellow-400',   badge: 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20' },
  Easy:     { dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' },
};

/* ─── Icons ──────────────────────────────────────────────────── */
const ChevronDown = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);
const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

/* ─── Expandable Detail Section ──────────────────────────────── */
function ExamDetail({ exam }) {
  return (
    <div className="border-t border-slate-100 dark:border-slate-700 px-5 py-4 flex flex-col gap-4 bg-slate-50/50 dark:bg-slate-800/20 animate-in fade-in slide-in-from-top-2 duration-200">
      
      {/* Exam Dates */}
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
        <span className="text-blue-500">📅</span>
        <div>
          <p className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
            Exam Dates (Expected)
          </p>
          <p className="text-xs text-blue-800 dark:text-blue-300 font-medium mt-0.5">
            {exam.nextDate}
          </p>
        </div>
      </div>

      {/* Syllabus Highlights */}
      <div>
        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
          Syllabus
        </p>
        <ul className="flex flex-col gap-1.5">
          {exam.syllabusHighlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Attempt Limits / Eligibility */}
      <div>
        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
          Eligibility & Limits
        </p>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          {exam.eligibility}
        </p>
      </div>

      {/* Difficulty Explanation */}
      <div>
        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
          Why is this {exam.difficulty}?
        </p>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-2 border-slate-200 dark:border-slate-700 pl-3 py-0.5">
          Usually taken by {exam.approxApplicants} students. Duration: {exam.duration}. {exam.difficulty === 'Hard' ? 'Requires intense preparation and deep conceptual clarity.' : 'Requires consistent practice and good time management.'}
        </p>
      </div>

      {/* Colleges via this exam */}
      <div>
        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
          Colleges accepting this exam
        </p>
        <div className="flex flex-wrap gap-1.5">
          {exam.acceptedBy.map((inst) => (
            <span key={inst}
              className="px-2.5 py-1 rounded-md text-xs font-medium
                         bg-white dark:bg-slate-800/50
                         text-slate-700 dark:text-slate-300
                         border border-slate-200 dark:border-slate-700">
              {inst}
            </span>
          ))}
        </div>
      </div>

      {/* Official Website Button */}
      <div className="pt-2">
        <a
          href={exam.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold
                     bg-slate-900 dark:bg-white text-white dark:text-slate-900
                     hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
        >
          Visit Official Website
          <LinkIcon />
        </a>
      </div>
    </div>
  );
}

/* ─── Main Exam Card ─────────────────────────────────────────── */
export default function ExamCard({ exam }) {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);
  const diff = diffConfig[exam.difficulty] || diffConfig.Moderate;

  return (
    <article className="card overflow-hidden group break-inside-avoid mb-5">
      {/* ── Main row ─────────────────────────────────────────── */}
      <div className="p-5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="shrink-0 w-11 h-11 rounded-xl
                          bg-brand-50 dark:bg-brand-500/10
                          text-brand-600 dark:text-brand-400
                          flex items-center justify-center
                          text-xs font-bold tracking-tight border
                          border-brand-100 dark:border-brand-500/20">
            {exam.shortName.slice(0, 3)}
          </div>

          {/* Name + body */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 leading-tight">
                  {exam.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {exam.conductingBody}
                </p>
              </div>
              {/* Save button */}
              <button
                onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
                aria-label={saved ? 'Unsave exam' : 'Save exam'}
                className={`shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center
                            transition-all duration-150
                            ${saved
                              ? 'bg-brand-500 border-brand-500 text-white'
                              : 'border-slate-200 dark:border-white/10 text-slate-400 hover:text-brand-500 hover:border-brand-300 dark:hover:border-brand-500/40'
                            }`}
              >
                <SaveIcon />
              </button>
            </div>

            {/* Badge row */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {/* Difficulty */}
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${diff.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
                {exam.difficulty}
              </span>
              {/* Field */}
              <span className="badge bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300">
                {exam.field}
              </span>
            </div>
          </div>
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-3 line-clamp-2">
          {exam.description}
        </p>

        {/* Expand / collapse toggle */}
        <div className="mt-4 flex justify-between items-center text-xs">
          <span className="text-slate-400 dark:text-slate-500 font-medium">
            {exam.totalMarks} marks • {exam.duration}
          </span>
          <button
            className="flex items-center gap-1.5 font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
          >
            {expanded ? 'Hide details' : 'Show details'}
            <ChevronDown open={expanded} />
          </button>
        </div>
      </div>

      {/* ── Expanded panel ───────────────────────────────────── */}
      {expanded && <ExamDetail exam={exam} />}
    </article>
  );
}
