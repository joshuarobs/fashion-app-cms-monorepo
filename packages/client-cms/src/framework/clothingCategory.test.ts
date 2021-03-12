import { ClothingCategory } from './clothingCategory';

describe('Clothing categories', () => {
  test('should all have unique ids', () => {
    const ids: string[] = [];
    Object.keys(ClothingCategory).forEach((key, index) => {
      // key: the name of the object key
      // index: the ordinal position of the key within the object
      // @ts-ignore
      const categoryObject = ClothingCategory[key];
      ids.push(categoryObject.id);
    });
    console.log('ids:', ids);
    const isUnique = new Set(ids).size === ids.length;
    expect(isUnique).toBe(true);
  });
});
