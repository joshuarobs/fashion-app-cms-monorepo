import { ItemFilterValuesStyle } from './itemFilterValuesStyle';

describe('Item Filter Values - Styles', () => {
  test('should not be empty', () => {
    const ids = [];
    ItemFilterValuesStyle.Map.forEach((value, key) => {
      ids.push(value.id);
    });
    expect(ids.length).toBeGreaterThan(0);
  });

  test('should all have unique ids', () => {
    const ids: string[] = [];
    ItemFilterValuesStyle.Map.forEach((value, key) => {
      ids.push(value.id);
    });
    const isUnique = new Set(ids).size === ids.length;
    expect(isUnique).toBe(true);
  });

  test('should all have unique names', () => {
    const names: string[] = [];
    ItemFilterValuesStyle.Map.forEach((value, key) => {
      names.push(value.name);
    });
    const isUnique = new Set(names).size === names.length;
    expect(isUnique).toBe(true);
  });
});
