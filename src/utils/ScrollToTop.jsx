import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // Only scroll to top on fresh navigation, not back/forward
    if (state?.scrollTop !== false) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, state]);

  return null;
}
