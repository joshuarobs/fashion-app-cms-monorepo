import { Items } from '../strings';

const Ids = {
  All: 'All',
  Designers: 'Designers',
  Sellers: 'Sellers',
};

const All = {
  id: Ids.All,
  name: Items.Values.Company_Types.All,
};

const Designers = {
  id: Ids.Designers,
  name: Items.Values.Company_Types.Designers,
};

const Sellers = {
  id: Ids.Sellers,
  name: Items.Values.Company_Types.Sellers,
};

const ItemFilterValuesCompanyType = {
  Map: new Map([
    [Ids.All, All],
    [Ids.Designers, Designers],
    [Ids.Sellers, Sellers],
  ]),
  Values: {
    All,
    Designers,
    Sellers,
  },
};

export { ItemFilterValuesCompanyType };
