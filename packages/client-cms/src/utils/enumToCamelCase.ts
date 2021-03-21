const enumToCamelCase = function (str = '') {
  const fixedString = str.replace(/_/g, ' ');
  const newStringArray = fixedString.split(' ');

  newStringArray.forEach(function (word, index) {
    if (word === 'OF' || word === 'AND') {
      // @ts-ignore
      this[index] = word.toLowerCase();
    } else {
      // @ts-ignore
      this[index] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  }, newStringArray);

  const newString = newStringArray.join(' ');
  // console.log("newString:", newString);

  // return str.replace(/_/g, " ");
  return newString;
};

export { enumToCamelCase };
