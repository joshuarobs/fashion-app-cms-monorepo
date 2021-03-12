/**
 * Gets the current tab in the page. E.g. "Settings" under the "Clothing
 * Shell" page
 * @param pathname - called via the `useLocation()` hook in a React component
 * @param indexInUrl - The position of the tab name in the url, default = 4
 * @return {*}
 */
function getCurrentPageTabName(pathname: string, indexInUrl = 4) {
  // console.log("pathname:", pathname);
  const currentTab = pathname.split('/')[indexInUrl];
  // console.log("currentTab:", currentTab);
  return currentTab;
}

export { getCurrentPageTabName };
