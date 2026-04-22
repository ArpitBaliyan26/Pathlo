import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CollegeCard from '../components/ui/CollegeCard';
import SearchBar from '../components/ui/SearchBar';
import FilterBar from '../components/ui/FilterBar';
import colleges, { collegeFilterGroups as filterGroups } from '../data/collegeDataset';

const sortOptions = [
  { value: 'rating', label: 'Rating' },
  { value: 'fees_asc', label: 'Fees: low first' },
  { value: 'name', label: 'A - Z' },
];

function EmptyState({ onReset }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 text-5xl">🔍</div>
      <h3 className="mb-1 text-base font-semibold text-slate-800 dark:text-slate-200">
        No colleges match your filters
      </h3>
      <p className="max-w-xs text-sm text-slate-500 dark:text-slate-400">
        Try adjusting the filters or clearing your search to explore all colleges.
      </p>
      <button
        onClick={onReset}
        className="mt-5 btn-ghost border border-slate-200 px-4 py-2 text-sm dark:border-white/10"
      >
        Clear all filters
      </button>
    </div>
  );
}

function parseFeeValue(value) {
  if (!value) return Number.MAX_SAFE_INTEGER;

  const normalized = value.toLowerCase();

  if (normalized.includes('nominal') || normalized.includes('subsid')) {
    return 0;
  }

  const match = normalized.match(/(\d+(\.\d+)?)/);
  if (!match) {
    return Number.MAX_SAFE_INTEGER;
  }

  const amount = Number.parseFloat(match[1]);

  if (normalized.includes('cr')) return amount * 100;
  if (normalized.includes('k')) return amount / 100;
  return amount;
}

export default function CollegesPage({ user, showToast }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [searchParams, setSearchParams] = useSearchParams();
  const visibleFilterGroups = useMemo(
    () => filterGroups.filter((group) => group.id !== 'tag'),
    []
  );

  const active = useMemo(() => {
    const next = {};

    visibleFilterGroups.forEach((group) => {
      const value = searchParams.get(group.id);
      const isValid = group.options.some((option) => option.value === value);

      if (isValid) {
        next[group.id] = value;
      }
    });

    return next;
  }, [searchParams, visibleFilterGroups]);

  const handleFilter = (groupId, value) => {
    const next = new URLSearchParams(searchParams);

    if (value) {
      next.set(groupId, value);
    } else {
      next.delete(groupId);
    }

    setSearchParams(next, { replace: true });
  };

  const resetAll = () => {
    setSearch('');
    setSearchParams({}, { replace: true });
    setSortBy('rating');
  };

  const results = useMemo(() => {
    let list = [...colleges];

    if (search.trim()) {
      const query = search.toLowerCase();
      list = list.filter(
        (college) =>
          college.name.toLowerCase().includes(query) ||
          college.location.toLowerCase().includes(query) ||
          college.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          college.description.toLowerCase().includes(query)
      );
    }

    if (active.category) {
      list = list.filter((college) => college.category === active.category);
    }

    if (active.type) {
      list = list.filter((college) => college.type === active.type);
    }

    list.sort((left, right) => {
      if (sortBy === 'rating') return (right.rating || 0) - (left.rating || 0);
      if (sortBy === 'name') return left.name.localeCompare(right.name);
      if (sortBy === 'fees_asc') {
        return parseFeeValue(left.annualFees) - parseFeeValue(right.annualFees);
      }

      return 0;
    });

    return list;
  }, [active, search, sortBy]);

  const activeFilterCount =
    Object.values(active).filter(Boolean).length + (search.trim() ? 1 : 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="section-label mb-1.5">Colleges</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Explore Colleges
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Explore colleges across traditional, business, liberal arts, research, and new-age paths.
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search colleges, tags, or location..."
          className="flex-1"
        />

        <div className="relative">
          <select
            id="sort-colleges"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 outline-none transition-all duration-150 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 dark:border-[#252836] dark:bg-[#1a1d27] dark:text-slate-200 dark:focus:border-brand-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <FilterBar groups={visibleFilterGroups} active={active} onChange={handleFilter} />

        {activeFilterCount > 0 && (
          <button
            onClick={resetAll}
            className="flex shrink-0 items-center gap-1 text-xs font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Clear {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
          </button>
        )}
      </div>

      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-300">{results.length}</span>
          {' '}of{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-300">{colleges.length}</span>
          {' '}colleges
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.length > 0 ? (
          results.map((college) => (
            <CollegeCard key={college.id} college={college} user={user} showToast={showToast} />
          ))
        ) : (
          <EmptyState onReset={resetAll} />
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-12 border-t border-slate-100 py-10 text-center dark:border-white/[0.06]">
          <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            More colleges can be added over time. If a real institution is missing,{' '}
            <a
              href="mailto:hello@pathlo.in"
              className="text-brand-600 hover:underline dark:text-brand-400"
            >
              suggest a college
            </a>
            .
          </p>
        </div>
      )}
    </main>
  );
}
