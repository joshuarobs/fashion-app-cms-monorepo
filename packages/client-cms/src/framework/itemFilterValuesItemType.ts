import { Generic } from '../strings';
import { ItemType } from '@joshuarobs/clothing-framework';

const Accessory = {
  id: ItemType.Accessory,
  name: Generic.Item_Types.Accessory,
};

const Clothing = {
  id: ItemType.Clothing,
  name: Generic.Item_Types.Clothing,
};

const ItemFilterValuesItemType = {
  Map: new Map([
    [ItemType.Clothing, Clothing],
    [ItemType.Accessory, Accessory],
  ]),
  Values: {
    Accessory,
    Clothing,
  },
};

export { ItemFilterValuesItemType };
