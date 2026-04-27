import { Link } from 'react-router-dom';
import { useSavedColleges } from '../hooks/useSavedColleges';
import { useSavedExams } from '../hooks/useSavedExams';
import colleges from '../data/collegeDataset';
import exams from '../data/examDataset';
import CollegeCard from '../components/ui/CollegeCard';
import ExamCard from '../components/ui/ExamCard';

export default function DashboardPage({ user, showToast }) {
  const { savedIds } = useSavedColleges();
  const { savedExamIds, toggleExamSave, isExamSaved } = useSavedExams();
  const savedColleges = colleges.filter((c) => savedIds.includes(c.id));
  const savedExams = exams.filter((exam) => savedExamIds.includes(exam.id));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        My Path
      </h1>

      {!user && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          <p>
            Your bookmarks are saved locally on this browser. They may be removed by clearing browser data and will not sync across devices.
          </p>
          <div className="mt-2">
            <Link to="/auth" className="btn-secondary">
              Sign in to sync bookmarks
            </Link>
          </div>
        </div>
      )}

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Saved Colleges
        </h2>

        {savedColleges.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
          <div className="mt-4 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 p-8 text-center">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              You haven't saved any colleges yet.
            </h3>
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
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Saved Exams
        </h2>

        {savedExams.length > 0 ? (
          <div className="mt-4 columns-1 sm:columns-2 lg:columns-3 gap-5">
            {savedExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                saved={isExamSaved(exam.id)}
                onToggleSave={toggleExamSave}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 p-8 text-center">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              You haven't saved any exams yet.
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Explore exams and bookmark the ones you want to track.
            </p>
            <div className="mt-6">
              <Link to="/exam-explorer" className="btn-secondary">
                Explore Exams
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
