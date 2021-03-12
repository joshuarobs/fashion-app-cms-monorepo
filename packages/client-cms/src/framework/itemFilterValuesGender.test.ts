import { ItemFilterValuesGender } from './itemFilterValuesGender';

describe('Item Filter Values - Gender', () => {
  test('should not be empty', () => {
    const ids = [];
    ItemFilterValuesGender.Map.forEach((value, key) => {
      ids.push(value.id);
    });
    expect(ids.length).toBeGreaterThan(0);
  });

  test('should all have unique ids', () => {
    const ids: string[] = [];
    ItemFilterValuesGender.Map.forEach((value, key) => {
      ids.push(value.id);
    });
    const isUnique = new Set(ids).size === ids.length;
    expect(isUnique).toBe(true);
  });
});
