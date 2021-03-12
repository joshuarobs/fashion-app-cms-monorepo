import { Generic } from '../strings';

const Ids = {
  True: 'True',
  False: 'False',
};

const True = {
  id: Ids.True,
  name: Generic.Bool.True,
};

const False = {
  id: Ids.False,
  name: Generic.Bool.False,
};

const ItemFilterValuesBool = {
  Map: new Map([
    [Ids.True, True],
    [Ids.False, False],
  ]),
  Values: {
    True,
    False,
  },
};

export { ItemFilterValuesBool };
