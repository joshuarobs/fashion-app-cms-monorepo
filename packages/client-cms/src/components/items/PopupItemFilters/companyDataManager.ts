/**
 * The key for the special group 'Other' that dumps all odd names together
 * @type {string}
 */
const keyOther = 'Other';

/**
 * Fixes a list of company data by sorting it properly
 */
function getFormattedData(companies: any) {
  const companiesCopy = [...companies];
  // Sort alphabetically
  companiesCopy.sort((a, b) => {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  // Sort by moving all 'other' to the end
  companiesCopy.sort((a, b) => {
    const keyA = a.name[0].toLocaleUpperCase();
    const keyB = b.name[0].toLocaleUpperCase();
    const isLetterA = keyA.toLowerCase() !== keyA.toUpperCase();
    const isLetterB = keyB.toLowerCase() !== keyB.toUpperCase();
    if (isLetterA && !isLetterB) {
      return -1;
    }
    if (!isLetterA && isLetterB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  const companiesByLetter = companiesCopy.reduce((a, c) => {
    // c[0] should be the first letter of an entry
    const key = c.name[0].toLocaleUpperCase();
    const isLetter = key.toLowerCase() !== key.toUpperCase();
    // console.log('isLetter:', isLetter, 'c:', c);

    // either push to an existing dict entry or create one
    if (isLetter) {
      if (a[key]) {
        a[key].push(c);
      } else {
        a[key] = [c];
      }
    }
    // Handle non-letter names differently; dump them all into one group
    else {
      if (a[keyOther]) {
        a[keyOther].push(c);
      } else {
        a[keyOther] = [c];
      }
    }

    return a;
  }, {});

  return {
    companies: companiesCopy,
    companiesByLetter,
  };
}

const CompanyDataManager = {
  getFormattedData,
  keyOther,
};

export { CompanyDataManager };
