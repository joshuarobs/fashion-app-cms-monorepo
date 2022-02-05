import { Items } from '../strings';
import { Gender } from '@joshuarobs/clothing-framework';

const All = {
  id: Gender.All,
  name: Items.Values.Gender.All,
};

const Male = {
  id: Gender.Male,
  name: Items.Values.Gender.Male,
};

const Female = {
  id: Gender.Female,
  name: Items.Values.Gender.Female,
};

const Other = {
  id: Gender.Other,
  name: Items.Values.Gender.Other,
};

const ItemFilterValuesGender = {
  Map: new Map([
    [Gender.All, All],
    [Gender.Male, Male],
    [Gender.Female, Female],
    [Gender.Other, Other],
  ]),
  Values: {
    All,
    Male,
    Female,
    Other,
  },
};

export { ItemFilterValuesGender };
