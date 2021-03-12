/**
 * Useful for getting framework objects and turning them into an array
 * @param obj
 * @returns {[]}
 */
function objectToArray(obj: any) {
  const array: any[] = [];
  Object.keys(obj).forEach((key) => {
    array.push(obj[key]);
  });
  return array;
}

export { objectToArray };
