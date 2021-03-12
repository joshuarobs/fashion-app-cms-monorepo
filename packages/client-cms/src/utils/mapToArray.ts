/**
 * Useful for getting framework maps and turning them into an array
 * @param obj
 * @returns {[]}
 */
function mapToArray(obj: any) {
  const array: any[] = [];
  Object.keys(obj).map((key) => {
    array.push(obj[key]);
  });
  return array;
}

export { mapToArray };
