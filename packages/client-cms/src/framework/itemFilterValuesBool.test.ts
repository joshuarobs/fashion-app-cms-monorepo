import { ItemFilterValuesBool } from './itemFilterValuesBool';

describe('Item Filter Values - Boolean', () => {
  test('should not be empty', () => {
    const ids = [];
    ItemFilterValuesBool.Map.forEach((value, key) => {
      ids.push(value.id);
    });
    expect(ids.length).toBeGreaterThan(0);
  });

  test('should all have unique ids', () => {
    const ids: string[] = [];
    ItemFilterValuesBool.Map.forEach((value, key) => {
      ids.push(value.id);
    });
    const isUnique = new Set(ids).size === ids.length;
    expect(isUnique).toBe(true);
  });

  test('should all have unique names', () => {
    const names: string[] = [];
    ItemFilterValuesBool.Map.forEach((value, key) => {
      names.push(value.name);
    });
    const isUnique = new Set(names).size === names.length;
    expect(isUnique).toBe(true);
  });
});
