import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import ThemeToggle from '../ui/ThemeToggle';

// Inline SVG icons
const CollegesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const ExamIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const navItems = [
  { to: '/',              label: 'Home',          icon: <HomeIcon /> },
  { to: '/colleges',      label: 'Colleges',      icon: <CollegesIcon /> },
  { to: '/exam-explorer', label: 'Exam Explorer', icon: <ExamIcon /> },
  { to: '/dashboard',     label: 'My Path',       icon: <DashboardIcon /> },
];

export default function Navbar({ user }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const getUsername = (email) => {
    if (!email) return '';
    return email.split('@')[0];
  };

  // Shadow on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    setMobileOpen(false);
    setLoggingOut(false);
  };

  const handleLoginClick = () => {
    navigate('/auth');
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300
        ${scrolled
          ? 'navbar-glass shadow-sm'
          : 'bg-white/60 dark:bg-[#0f172a]/60 backdrop-blur-sm border-b border-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

        {/* ─── Logo ─────────────────────────────────────────── */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 shrink-0 group"
          aria-label="Pathlo Home"
        >
          {/* Logo mark – user-provided icon */}
          <img
            src="/logo.svg"
            alt="Pathlo logo"
            className="w-8 h-8 rounded-full group-hover:scale-105 transition-transform duration-200"
          />
          <span className="text-[17px] font-bold tracking-tight text-slate-900 dark:text-white
                           group-hover:text-[#4040CC] dark:group-hover:text-[#7070ff] transition-colors">
            Pathlo
          </span>
        </NavLink>

        {/* ─── Desktop nav links ─────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-1 list-none">
          {navItems.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {icon}
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ─── Right section ─────────────────────────────────── */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Auth buttons (desktop) */}
          {!user ? (
            <button
              onClick={handleLoginClick}
              className="hidden md:inline-flex items-center px-3 py-1.5 text-sm font-medium
                         text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10
                         rounded-md transition-colors duration-200"
            >
              Log in
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-white/10">
              <span className="text-sm text-slate-600 dark:text-gray-400">
                {getUsername(user.email)}
              </span>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-gray-200
                           hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400
                           rounded-md transition-colors duration-200 disabled:opacity-50"
              >
                {loggingOut ? 'Logging out...' : 'Log out'}
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden btn-ghost p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* ─── Mobile drawer ───────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-700
                        bg-white dark:bg-[#0f172a] px-4 py-3 flex flex-col gap-1">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `nav-link w-full ${isActive ? 'active' : ''}`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
          {/* Mobile auth section */}
          <div className="border-t border-slate-100 dark:border-white/[0.06] mt-2 pt-2">
            {!user ? (
              <button
                onClick={handleLoginClick}
                className="w-full text-left px-3 py-2 text-sm font-medium
                           text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10
                           rounded-md transition-colors duration-200"
              >
                Log in
              </button>
            ) : (
              <>
                <div className="px-3 py-2 text-sm text-slate-600 dark:text-gray-400 border-b border-slate-100 dark:border-white/[0.06]">
                  {getUsername(user.email)}
                </div>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full text-left px-3 py-2 text-sm font-medium
                             text-slate-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-950/30
                             hover:text-red-600 dark:hover:text-red-400 rounded-md transition-colors duration-200
                             disabled:opacity-50"
                >
                  {loggingOut ? 'Logging out...' : 'Log out'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
