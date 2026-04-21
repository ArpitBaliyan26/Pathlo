import { useMemo, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

// Close icon
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function AuthPage({ user }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = useMemo(() => location.state?.from || '/', [location.state]);

  if (user) {
    return <Navigate to={from} replace />;
  }

  const getFriendlyAuthMessage = (authError, currentMode) => {
    const rawMessage = authError?.message?.toLowerCase() || '';

    if (currentMode === 'login' && rawMessage.includes('email not confirmed')) {
      return 'Please verify your email before logging in. Check your inbox or spam folder.';
    }

    if (currentMode === 'login') {
      return 'Unable to log in right now. Please check your credentials and try again.';
    }

    return 'Unable to continue right now. Please try again.';
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) {
          throw loginError;
        }

        navigate('/', { replace: true });
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          throw signUpError;
        }

        if (data?.session) {
          navigate('/', { replace: true });
        } else {
          setSuccess('Signup successful. Check your email for confirmation link.');
        }
      }
    } catch (authError) {
      setError(getFriendlyAuthMessage(authError, mode));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/', { replace: true });
  };

  return (
    <main className="flex min-h-[calc(100vh-56px)] items-center justify-center overflow-hidden px-4 py-4 sm:px-6">
      <div className="w-full max-w-sm -translate-y-6">
        {/* Close button */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={handleClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Auth card */}
        <div className="card p-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            {mode === 'login' ? 'Log in' : 'Create account'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {mode === 'login' 
              ? 'Enter your email and password to log in' 
              : 'Enter your email and create a password'}
          </p>

          {/* Mode toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-slate-100 dark:bg-slate-800/30 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
                setSuccess('');
              }}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === 'login'
                  ? 'bg-white dark:bg-[#334155] text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError('');
                setSuccess('');
              }}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === 'signup'
                  ? 'bg-white dark:bg-[#334155] text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#131820] px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#131820] px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                placeholder="••••••••"
              />
            </div>

            {success && (
              <div className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg px-3.5 py-2.5">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center mt-6"
            >
              {loading ? 'Loading...' : mode === 'login' ? 'Log in' : 'Sign up'}
            </button>

            {error && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Skip button outside card */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              localStorage.setItem('skipAuth', 'true');
              navigate('/', { replace: true });
            }}
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </main>
  );
}
