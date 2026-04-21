import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { supabase } from './lib/supabaseClient';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import CollegesPage from './pages/CollegesPage';
import CollegeDetailPage from './pages/CollegeDetailPage';
import ExamExplorerPage from './pages/ExamExplorerPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import AIChatbot from './components/ui/AIChatbot';
import ScrollToTop from './utils/ScrollToTop';



/* ─── Route Guard: Redirect to auth if not logged in and skipAuth not set ─── */
function ProtectedLayout({ user, children }) {
  const location = useLocation();
  const skipAuth = localStorage.getItem('skipAuth') === 'true';

  // If on auth page, render normally
  if (location.pathname === '/auth') {
    return children;
  }

  // If not logged in and skipAuth not set, redirect to auth
  if (!user && !skipAuth) {
    return <Navigate to="/auth" replace />;
  }

  // Otherwise render normally
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  useEffect(() => {
    // Check current auth state on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (!toast) return undefined;

    const timeout = window.setTimeout(() => {
      setToast('');
    }, 2400);

    return () => window.clearTimeout(timeout);
  }, [toast]);

  const showToast = (message) => {
    setToast(message);
  };

  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f172a]">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ProtectedLayout user={user}>
          <div className="min-h-screen flex flex-col bg-white dark:bg-[#0f172a] transition-colors duration-200">
            <ScrollToTop />
            <Navbar user={user} />
            <Routes>
              <Route path="/" element={<HomePage user={user} showToast={showToast} />} />
              <Route path="/colleges" element={<CollegesPage user={user} showToast={showToast} />} />
              <Route path="/colleges/:id" element={<CollegeDetailPage user={user} showToast={showToast} />} />
              <Route path="/exam-explorer" element={<ExamExplorerPage />} />
              <Route path="/dashboard" element={<DashboardPage user={user} showToast={showToast} />} />
              <Route path="/auth" element={<AuthPage user={user} />} />
            </Routes>
            <AIChatbot />
            {toast && (
              <div className="pointer-events-none fixed bottom-24 left-1/2 z-[60] -translate-x-1/2">
                <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg dark:bg-white dark:text-slate-900">
                  {toast}
                </div>
              </div>
            )}
          </div>
        </ProtectedLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
