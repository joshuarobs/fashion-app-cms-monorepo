import * as _ from 'lodash';

/**
 * Adds a `key` property (based of its `id` property) to all objects in the
 * array. This is needed for a data array for Ant Design Tables.
 */
function addKeysToArrayObjects(array: any) {
  // For now, deep clone the array. If ever apollo-client allows extension
  // of data objects returned from the server, then remove the deep clone
  const newData = _.cloneDeep(array);
  newData.forEach((item: any) => {
    if (item.id) {
      item.key = item.id;
    } else if (item.value) {
      item.key = item.value;
    } else if (item.code) {
      item.key = item.code;
    }
  });
  return newData;
}

export { addKeysToArrayObjects };
