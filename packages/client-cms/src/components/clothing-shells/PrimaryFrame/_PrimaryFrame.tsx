import React, { useState } from 'react';
import { ItemFilterValuesNumber } from '../../../framework/itemFilterValuesNumber';
import { ItemFilterValuesCompanyType } from '../../../framework/itemFilterValuesCompanyType';
import { ItemFilterValuesGender } from '../../../framework/itemFilterValuesGender';
import { ClothingShellsTableView } from '../../common/table-views/ClothingShellsTableView';

const SETTINGS = {
  SHOW_ROWS: [20, 50, 100],
};

const allGenders = Array.from(ItemFilterValuesGender.Map.values());

const testBrands = [
  { id: 'adidas', name: 'adidas' },
  { id: 'apple', name: 'Apple' },
  { id: 'nike', name: 'Nike' },
  { id: 'converse', name: 'Converse' },
  { id: 'hm', name: 'H&M' },
  { id: 'uniqlo', name: 'Uniqlo' },
  { id: 'zara', name: 'Zara' },
  { id: 'forever21', name: 'Forever21' },
  { id: 'supreme', name: 'Supreme' },
  { id: 'off-white', name: 'Off-White' },
  { id: 'yeezy', name: 'Yeezy' },
  { id: 'just-jeans', name: 'Just Jeans' },
  { id: 'alpha-industries', name: 'Alpha Industries' },
  { id: 'alexander-mcqueen', name: 'Alexander McQueen' },
  { id: 'armani', name: 'Armani' },
  { id: 'balenciaga', name: 'Balenciaga' },
  { id: 'balmain', name: 'Balmain' },
  { id: 'hugo-boss', name: 'Hugo Boss' },
  { id: 'bottega-veneta', name: 'Bottega Veneta' },
  { id: 'brioni', name: 'Brioni' },
  { id: 'bulgari', name: 'BVLGARI' },
  { id: 'burberry', name: 'Burberry' },
  { id: 'canada-goose', name: 'Canada Goose' },
  { id: 'calvin-klein', name: 'Calvin Klein' },
  { id: 'cartier', name: 'Cartier' },
  { id: 'chanel', name: 'Chanel' },
  { id: 'comme-des-garcons', name: 'Comme des Garçons' },
  { id: 'dior', name: 'Dior' },
  { id: 'dolce-gabbana', name: 'Dolce & Gabbana' },
  { id: 'fendi', name: 'Fendi' },
  { id: 'tom-ford', name: 'Tom Ford' },
  { id: 'givenchy', name: 'Givenchy' },
  { id: 'gucci', name: 'Gucci' },
  { id: 'tommy-hilfiger', name: 'Tommy Hilfiger' },
  { id: 'hermes', name: 'Hermès' },
  { id: 'kade-spade', name: 'Kate Spade' },
  { id: 'kenzo', name: 'Kenzo' },
  { id: 'lacoste', name: 'Lacoste' },
  { id: 'rick-owens', name: 'Rick Owens' },
  { id: 'prada', name: 'Prada' },
  { id: 'emilio-pucci', name: 'Emilio Pucci' },
  { id: 'ralph-lauren', name: 'Ralph Lauren' },
  { id: 'valentino', name: 'Valentino' },
  { id: 'versace', name: 'Versace' },
  { id: 'louis-vuitton', name: 'Louis Vuitton' },
  { id: 'alexander-wang', name: 'Alexander Wang' },
  { id: 'yves-saint-laurent', name: 'Yves Saint Laurent' },
  { id: '8900', name: '8900 Test' },
  { id: '88aa', name: '88aa' },
  { id: '1200', name: '1200 Test' },
  { id: '$uper', name: '$uper' },
];

const extraResellers = [
  { id: 'amazon', isReseller: true, name: 'Amazon', website: 'amazon.com' },
  { id: 'ebay', isReseller: true, name: 'eBay', website: 'ebay.com' },
  { id: 'asos', isReseller: true, name: 'Asos', website: 'asos.com' },
  {
    id: 'the-iconic',
    isReseller: true,
    name: 'The Iconic',
    website: 'theiconic.com',
  },
  { id: 'jcrew', isReseller: true, name: 'Jcrew', website: 'jcrew.com' },
  {
    id: 'net-a-porter',
    isReseller: true,
    name: 'Net-a-Porter',
    website: 'net-a-porter.com',
  },
  {
    id: 'mr-porter',
    isReseller: true,
    name: 'MR PORTER',
    website: 'mrporter.com',
  },
  { id: 'ssense', isReseller: true, name: 'SSENSE', website: 'ssense.com' },
  {
    id: 'farfetch',
    isReseller: true,
    name: 'Farfetch',
    website: 'farfetch.com',
  },
  {
    id: 'nordstrom',
    isReseller: true,
    name: 'Nordstrom',
    website: 'nordstorm.com',
  },
  { id: 'stockx', isReseller: true, name: 'StockX', website: 'stockx.com' },
  { id: 'goat', isReseller: true, name: 'Goat', website: 'goat.com' },
  { id: 'zappos', isReseller: true, name: 'Zappos', website: 'zappos.com' },
];

const testSellers = [...testBrands, ...extraResellers];

// const brandsData = CompanyDataManager.getFormattedData(testBrands);
// const sellersData = CompanyDataManager.getFormattedData(testSellers);

const originalStates = {
  gender: allGenders[0].id,
  occasions: [],
  styles: [],
  brands: {
    brands: [],
    search: '',
  },
  numberOfSellersValues: {
    type: ItemFilterValuesNumber.Values.Equal_To.id,
    equalTo: undefined,
    rangeMin: undefined,
    rangeMax: undefined,
    greaterThanOrEqualTo: undefined,
    lesserThanOrEqualTo: undefined,
  },
  featuredSellers: {
    companies: [],
    search: '',
    searchType: ItemFilterValuesCompanyType.Values.All.id,
  },
  sellers: {
    companies: [],
    search: '',
    searchType: ItemFilterValuesCompanyType.Values.All.id,
  },
  price: {
    type: ItemFilterValuesNumber.Values.Range.id,
    rangeMin: undefined,
    rangeMax: undefined,
    greaterThanOrEqualTo: undefined,
    lesserThanOrEqualTo: undefined,
  },
};

function PrimaryFrame() {
  // TODO: Load from user's settings
  const [settingShow, setSettingShow] = useState(SETTINGS.SHOW_ROWS[0]);
  const [showFiltersPopup, setShowFiltersPopup] = useState(false);

  const [gender, setGender] = useState(originalStates.gender);
  const [occasions, setOccasions] = useState(originalStates.occasions);
  const [styles, setStyles] = useState(originalStates.styles);
  const [brands, setBrands] = useState(originalStates.brands);
  const [numberOfResellersValues, setNumberOfResellersValues] = useState(
    originalStates.numberOfSellersValues
  );
  const [featuredResellers, setFeaturedResellers] = useState(
    originalStates.featuredSellers
  );
  const [resellers, setResellers] = useState(originalStates.sellers);
  const [price, setPrice] = useState(originalStates.price);

  // const tagData = generateTabs({
  //   gender,
  //   setGender,
  //   occasions,
  //   setOccasions,
  //   styles,
  //   setStyles,
  //   brands,
  //   setBrands,
  //   numberOfResellersValues,
  //   setNumberOfResellersValues,
  //   featuredResellers,
  //   setFeaturedResellers,
  //   resellers,
  //   setResellers,
  //   price,
  //   setPrice,
  //   testBrands,
  //   testSellers,
  //   originalStates,
  // });
  //
  // const clearFilters = () => {
  //   setGender(originalStates.gender);
  //   setOccasions(originalStates.occasions);
  //   setStyles(originalStates.styles);
  //   setBrands(originalStates.brands);
  //   setNumberOfResellersValues(originalStates.numberOfSellersValues);
  //   setFeaturedResellers(originalStates.featuredSellers);
  //   setResellers(originalStates.sellers);
  //   setPrice(originalStates.price);
  // };

  const hideFiltersPopup = () => {
    setShowFiltersPopup(false);
  };

  return <ClothingShellsTableView />;
}

export { PrimaryFrame };
