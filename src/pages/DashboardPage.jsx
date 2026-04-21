import { Link } from 'react-router-dom';
import { useSavedColleges } from '../hooks/useSavedColleges';
import colleges from '../data/collegeDataset';
import CollegeCard from '../components/ui/CollegeCard';

export default function DashboardPage({ user, showToast }) {
  const { savedIds } = useSavedColleges();
  const savedColleges = colleges.filter((c) => savedIds.includes(c.id));

  if (!user) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-16 text-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Log in to build your path
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Save colleges and manage your preferences here.
          </p>
          <div className="mt-6">
            <Link to="/auth" className="btn-primary">
              Log in
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        My Saved Colleges
      </h1>

      {savedColleges.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedColleges.map((college) => (
            <CollegeCard
              key={college.id}
              college={college}
              user={user}
              showToast={showToast}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            You haven't saved any colleges yet.
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Explore colleges and bookmark them to build your path.
          </p>
          <div className="mt-6">
            <Link to="/colleges" className="btn-secondary">
              Explore Colleges
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
