import { Items } from '../strings';

// There are number prefixes that are used for sorting tags in the UI
enum Ids {
  Home = '10-home',
  Home_Sleeping = '11-home-sleeping',
  Casual = '20-casual',
  Smart_Casual = '21-smart-casual',
  Workout = '30-workout',
  Hiking = '31-hiking',
  Sports = '32-sports',
  Uniform = '40-uniform',
  Business_Casual = '41-business-casual',
  Business_Formal = '42-business-formal',
  Semi_Formal = '50-semi-formal',
  Black_Tie = '51-black-tie',
  White_Tie = '52-white-tie',
}

const Home = {
  id: Ids.Home,
  name: Items.Values.Occasions.Home,
};

const Home_Sleeping = {
  id: Ids.Home_Sleeping,
  name: Items.Values.Occasions.Sleeping,
};

const Casual = {
  id: Ids.Casual,
  name: Items.Values.Occasions.Casual,
};

const Smart_Casual = {
  id: Ids.Smart_Casual,
  name: Items.Values.Occasions.Smart_Casual,
};

const Workout = {
  id: Ids.Workout,
  name: Items.Values.Occasions.Workout,
};

const Hiking = {
  id: Ids.Hiking,
  name: Items.Values.Occasions.Hiking,
};

const Sports = {
  id: Ids.Sports,
  name: Items.Values.Occasions.Sports,
};

const Uniform = {
  id: Ids.Uniform,
  name: Items.Values.Occasions.Uniform,
};

const Business_Casual = {
  id: Ids.Business_Casual,
  name: Items.Values.Occasions.Business_Casual,
};

const Business_Formal = {
  id: Ids.Business_Formal,
  name: Items.Values.Occasions.Business_Formal,
};

const Semi_Formal = {
  id: Ids.Semi_Formal,
  name: Items.Values.Occasions.Semi_Formal,
};

const Black_Tie = {
  id: Ids.Black_Tie,
  name: Items.Values.Occasions.Black_Tie,
};

const White_Tie = {
  id: Ids.White_Tie,
  name: Items.Values.Occasions.White_Tie,
};

const _map = new Map([
  [Ids.Home, Home],
  [Ids.Home_Sleeping, Home_Sleeping],
  [Ids.Casual, Casual],
  [Ids.Smart_Casual, Smart_Casual],
  [Ids.Workout, Workout],
  [Ids.Hiking, Hiking],
  [Ids.Sports, Sports],
  [Ids.Uniform, Uniform],
  [Ids.Business_Casual, Business_Casual],
  [Ids.Business_Formal, Business_Formal],
  [Ids.Semi_Formal, Semi_Formal],
  [Ids.Black_Tie, Black_Tie],
  [Ids.White_Tie, White_Tie],
]);

const ItemFilterValuesOccasion = {
  Map: _map,
  Values: {
    Home,
    Home_Sleeping,
    Casual,
    Smart_Casual,
    Workout,
    Hiking,
    Sports,
    Uniform,
    Business_Casual,
    Business_Formal,
    Semi_Formal,
    Black_Tie,
    White_Tie,
  },
};

export { ItemFilterValuesOccasion };
