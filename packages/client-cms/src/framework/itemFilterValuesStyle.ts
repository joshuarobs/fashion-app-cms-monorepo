import { Items } from '../strings';

// There are number prefixes that are used for sorting tags in the UI
enum Ids {
  General = '10-general',
  Streetwear = '20-streetwear',
  Techwear = '30-techwear',
  High_Fashion = '40-high-fashion',
  Preppy = '50-preppy',
  Minimalism = '60-minimalism',
  Sportswear = '70-sportswear',
  Hip_Hop = '80-hip-hop',
  Punk = '90-punk',
  Goth = '100-goth',
  Emo = '110-emo',
}

const General = {
  id: Ids.General,
  name: Items.Values.Styles.General,
};

const Streetwear = {
  id: Ids.Streetwear,
  name: Items.Values.Styles.Streetwear,
};

const Techwear = {
  id: Ids.Techwear,
  name: Items.Values.Styles.Techwear,
};

const High_Fashion = {
  id: Ids.High_Fashion,
  name: Items.Values.Styles.High_Fashion,
};

const Preppy = {
  id: Ids.Preppy,
  name: Items.Values.Styles.Preppy,
};

const Minimalism = {
  id: Ids.Minimalism,
  name: Items.Values.Styles.Minimalism,
};

const Sportswear = {
  id: Ids.Sportswear,
  name: Items.Values.Styles.Sportswear,
};

const Hip_Hop = {
  id: Ids.Hip_Hop,
  name: Items.Values.Styles.Hip_Hop,
};

const Punk = {
  id: Ids.Punk,
  name: Items.Values.Styles.Punk,
};

const Goth = {
  id: Ids.Goth,
  name: Items.Values.Styles.Goth,
};

const Emo = {
  id: Ids.Emo,
  name: Items.Values.Styles.Emo,
};

const ItemFilterValuesStyle = {
  Map: new Map([
    [Ids.General, General],
    [Ids.Streetwear, Streetwear],
    [Ids.Techwear, Techwear],
    [Ids.High_Fashion, High_Fashion],
    [Ids.Preppy, Preppy],
    [Ids.Minimalism, Minimalism],
    [Ids.Sportswear, Sportswear],
    [Ids.Hip_Hop, Hip_Hop],
    [Ids.Punk, Punk],
    [Ids.Goth, Goth],
    [Ids.Emo, Emo],
  ]),
  Values: {
    General,
    Streetwear,
    Techwear,
    High_Fashion,
    Preppy,
    Minimalism,
    Sportswear,
    Hip_Hop,
    Punk,
    Goth,
    Emo,
  },
};

export { ItemFilterValuesStyle };
