import { Generic } from '../strings';

enum Ids {
  Equal_To = 'Equal_To',
  Range = 'Range',
  Min = 'Min',
  Max = 'Max',
  Greater_Than_Or_Equal_To = 'Greater_Than_Or_Equal_To',
  Lesser_Than_Or_Equal_To = 'Lesser_Than_Or_Equal_To',
}

const Equal_To = {
  id: Ids.Equal_To,
  name: Generic.Number_Filters.Equal_To,
};

const Range = {
  id: Ids.Range,
  name: Generic.Number_Filters.Range,
};

const Min = {
  id: Ids.Min,
  name: Generic.Number_Filters.Min,
};

const Max = {
  id: Ids.Max,
  name: Generic.Number_Filters.Max,
};

const Greater_Than_Or_Equal_To = {
  id: Ids.Greater_Than_Or_Equal_To,
  name: Generic.Number_Filters.Greater_Than_Or_Equal_To,
};

const Lesser_Than_Or_Equal_To = {
  id: Ids.Lesser_Than_Or_Equal_To,
  name: Generic.Number_Filters.Lesser_Than_Or_Equal_To,
};

const ItemFilterValuesNumber = {
  Map: new Map([
    [Ids.Equal_To, Equal_To],
    [Ids.Range, Range],
    [Ids.Min, Min],
    [Ids.Max, Max],
    [Ids.Greater_Than_Or_Equal_To, Greater_Than_Or_Equal_To],
    [Ids.Lesser_Than_Or_Equal_To, Lesser_Than_Or_Equal_To],
  ]),
  Values: {
    Equal_To,
    Range,
    Min,
    Max,
    Greater_Than_Or_Equal_To,
    Lesser_Than_Or_Equal_To,
  },
};

export { ItemFilterValuesNumber };
