import { ItemFilterCategory } from './itemFilterCategory';

describe('Item Filter categories', () => {
  test('should not be empty', () => {
    const ids = [];
    Object.keys(ItemFilterCategory).forEach((key, index) => {
      // key: the name of the object key
      // index: the ordinal position of the key within the object
      // @ts-ignore
      const categoryObject = ItemFilterCategory[key];
      ids.push(categoryObject.id);
    });
    expect(ids.length).toBeGreaterThan(0);
  });

  test('should all have unique ids', () => {
    const ids: string[] = [];
    Object.keys(ItemFilterCategory).forEach((key, index) => {
      // key: the name of the object key
      // index: the ordinal position of the key within the object
      // @ts-ignore
      const categoryObject = ItemFilterCategory[key];
      ids.push(categoryObject.id);
    });
    // console.log('ids:', ids);
    const isUnique = new Set(ids).size === ids.length;
    expect(isUnique).toBe(true);
  });

  test('should all have unique names', () => {
    const names: string[] = [];
    Object.keys(ItemFilterCategory).forEach((key, index) => {
      // @ts-ignore
      const categoryObject = ItemFilterCategory[key];
      names.push(categoryObject.name);
    });
    console.log('ids:', names);
    const isUnique = new Set(names).size === names.length;
    expect(isUnique).toBe(true);
  });
});
