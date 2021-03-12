/**
 * https://reacttraining.com/react-router/web/guides/scroll-restoration
 * Used for scrolling to the top of the page when clicking on a link.
 * It should only apply between pages and not most tabs/links within the same
 * page (exceptions apply).
 * This is needed because React Router can't tell if a route is within a
 * same "page" or between 2 "pages".
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export { ScrollToTop };
