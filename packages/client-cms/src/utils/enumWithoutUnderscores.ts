const enumWithoutUnderscores = function (str: string) {
  return str.replace(/_/g, ' ');
};

export { enumWithoutUnderscores };
