import { AccessoriesCategory } from './accessoriesCategory';

describe('AccessoriesCategory', () => {
  test('should all have unique ids', () => {
    const ids: string[] = [];
    Object.keys(AccessoriesCategory).forEach((key, index) => {
      // key: the name of the object key
      // index: the ordinal position of the key within the object
      // @ts-ignore
      const categoryObject = AccessoriesCategory[key];
      ids.push(categoryObject.id);
    });
    // console.log('ids:', ids);
    const isUnique = new Set(ids).size === ids.length;
    expect(isUnique).toBe(true);
  });
});
