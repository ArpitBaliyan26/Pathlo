import { useState, useMemo } from 'react';
import SearchBar from '../components/ui/SearchBar';
import FilterBar from '../components/ui/FilterBar';
import ExamCard from '../components/ui/ExamCard';
import { exams, difficultyOptions, examCategories } from '../data/examDataset';
import { useSavedExams } from '../hooks/useSavedExams';

/* ─── Filter groups ──────────────────────────────────────────── */
const filterGroups = [
  {
    id: 'difficulty',
    label: 'Level',
    options: difficultyOptions,
  },
  {
    id: 'category',
    label: 'Field',
    options: examCategories,
  },
];

/* ─── Empty state ────────────────────────────────────────────── */
function EmptyState({ onReset }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">📋</div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
        No exams match your filters
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
        Try adjusting your filters or searching with different keywords.
      </p>
      <button
        onClick={onReset}
        className="mt-5 btn-ghost border border-slate-200 dark:border-white/10 text-sm px-4 py-2"
      >
        Clear all filters
      </button>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function ExamExplorerPage() {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState({});
  const { isExamSaved, toggleExamSave } = useSavedExams();

  const handleFilter = (groupId, value) => {
    setActive((prev) => ({ ...prev, [groupId]: value }));
  };

  const resetAll = () => {
    setSearch('');
    setActive({});
  };

  const results = useMemo(() => {
    let list = [...exams];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.conductingBody.toLowerCase().includes(q) ||
          e.field.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q)) ||
          e.description.toLowerCase().includes(q)
      );
    }

    if (active.difficulty) {
      list = list.filter((e) => e.difficulty === active.difficulty);
    }

    if (active.category) {
      list = list.filter((e) => e.category === active.category);
    }

    return list;
  }, [search, active]);

  const activeCount = Object.values(active).filter(Boolean).length + (search.trim() ? 1 : 0);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="mb-8">
        <p className="section-label mb-1.5">✦ Exam Explorer</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Explore Exams
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">
          Discover entrance exams and the paths they unlock
        </p>
      </div>

      {/* ── Search ───────────────────────────────────────────── */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search exams by name, field, or conducting body…"
        className="mb-4"
      />

      {/* ── Filters ──────────────────────────────────────────── */}
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <FilterBar groups={filterGroups} active={active} onChange={handleFilter} />
        {activeCount > 0 && (
          <button
            onClick={resetAll}
            className="text-xs font-medium text-brand-600 dark:text-brand-400
                       hover:text-brand-700 flex items-center gap-1 shrink-0 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Clear {activeCount} filter{activeCount > 1 ? 's' : ''}
          </button>
        )}
      </div>

      {/* ── Result count ─────────────────────────────────────── */}
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
        Showing{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-300">{results.length}</span>
        {' '}of{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-300">{exams.length}</span>
        {' '}exams
      </p>

      {/* ── Cards Masonry Layout ─────────────────────────────── */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
        {results.length > 0
          ? results.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              saved={isExamSaved(exam.id)}
              onToggleSave={toggleExamSave}
            />
          ))
          : <EmptyState onReset={resetAll} />
        }
      </div>

      {/* ── Bottom note ──────────────────────────────────────── */}
      {results.length > 0 && (
        <div className="mt-12 text-center py-8 border-t border-slate-100 dark:border-white/[0.06]">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Exam dates and details are indicative. Always verify with the official conducting body.
          </p>
        </div>
      )}

    </main>
  );
}
