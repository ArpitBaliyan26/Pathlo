import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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

const navItems = [
  { to: '/colleges',      label: 'Colleges',      icon: <CollegesIcon /> },
  { to: '/exam-explorer', label: 'Exam Explorer', icon: <ExamIcon /> },
  { to: '/dashboard',     label: 'Dashboard',     icon: <DashboardIcon /> },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Shadow on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300
        ${scrolled
          ? 'navbar-glass shadow-sm'
          : 'bg-white/60 dark:bg-[#0f1117]/60 backdrop-blur-sm border-b border-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

        {/* ─── Logo ─────────────────────────────────────────── */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 shrink-0 group"
          aria-label="Pathlo Home"
        >
          {/* Logo mark — user-provided icon */}
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
        <div className="md:hidden border-t border-slate-100 dark:border-white/[0.06]
                        bg-white dark:bg-[#0f1117] px-4 py-3 flex flex-col gap-1">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link w-full ${isActive ? 'active' : ''}`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
