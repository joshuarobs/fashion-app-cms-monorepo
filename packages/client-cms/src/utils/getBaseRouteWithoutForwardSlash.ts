const getBaseRouteWithoutForwardSlash = (string: string) => {
  return string.split('/')[1].replace('/', '');
};

export { getBaseRouteWithoutForwardSlash };
