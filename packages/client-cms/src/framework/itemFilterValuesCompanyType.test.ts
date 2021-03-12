import { ItemFilterValuesCompanyType } from './itemFilterValuesCompanyType';

describe('Item Filter Values - Company Types', () => {
  test('should not be empty', () => {
    const ids = [];
    ItemFilterValuesCompanyType.Map.forEach((value, key) => {
      ids.push(value.id);
    });
    expect(ids.length).toBeGreaterThan(0);
  });

  test('should all have unique ids', () => {
    const ids: string[] = [];
    ItemFilterValuesCompanyType.Map.forEach((value, key) => {
      ids.push(value.id);
    });
    const isUnique = new Set(ids).size === ids.length;
    expect(isUnique).toBe(true);
  });

  test('should all have unique names', () => {
    const names: string[] = [];
    ItemFilterValuesCompanyType.Map.forEach((value, key) => {
      names.push(value.name);
    });
    const isUnique = new Set(names).size === names.length;
    expect(isUnique).toBe(true);
  });
});
