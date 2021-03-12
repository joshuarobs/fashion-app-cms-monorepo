const getRouteTab = (string: string, urlNumberOfParts: number) => {
  const tabPath = string.split('/')[urlNumberOfParts];
  console.log('tabPath:', tabPath);
  if (!tabPath) {
    return '/';
  }
  return tabPath.replace('/', '');
};

export { getRouteTab };
