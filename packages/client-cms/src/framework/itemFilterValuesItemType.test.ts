import { ItemFilterValuesItemType } from './itemFilterValuesItemType';

describe('Item Filter Values - Item Type', () => {
  test('should not be empty', () => {
    const ids = [];
    ItemFilterValuesItemType.Map.forEach((value, key) => {
      ids.push(value.id);
    });
    expect(ids.length).toBeGreaterThan(0);
  });

  test('should all have unique ids', () => {
    const ids: string[] = [];
    ItemFilterValuesItemType.Map.forEach((value, key) => {
      ids.push(value.id);
    });
    const isUnique = new Set(ids).size === ids.length;
    expect(isUnique).toBe(true);
  });

  test('should all have unique names', () => {
    const names: string[] = [];
    ItemFilterValuesItemType.Map.forEach((value, key) => {
      names.push(value.name);
    });
    const isUnique = new Set(names).size === names.length;
    expect(isUnique).toBe(true);
  });
});
