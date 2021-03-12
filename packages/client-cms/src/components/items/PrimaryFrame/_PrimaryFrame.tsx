import React, { useState } from 'react';
import { ItemsTable } from './ItemsTable';
import { PopupItemFilters } from '../PopupItemFilters/_PopupItemFilters';
import { FilterOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Select, Input, Button } from 'antd';
import { generateTabs } from '../PopupItemFilters/tagManager';
import { ItemFilterValuesGender } from '../../../framework/itemFilterValuesGender';
import { CompanyDataManager } from '../PopupItemFilters/companyDataManager';
import { ItemFilterValuesNumber } from '../../../framework/itemFilterValuesNumber';
import { ItemFilterValuesCompanyType } from '../../../framework/itemFilterValuesCompanyType';

const { Content } = Layout;
const { Option } = Select;
const { Search } = Input;

const cssStyles = {
  inputSelectSection: {
    marginLeft: 12,
  },
  inputSelectText: {
    marginRight: 8,
  },
  searchAndFilterButtons: {
    verticalAlign: 'middle',
    marginRight: 8,
  },
};

/**
 * We need this as a hacky work around to make the table display properly on
 * the page. This number should be total width of all fixed elements on the
 * page such as:
 * - App Shell Sidebar (200px)
 * - Content Padding (24 + 24px)
 * - Item Category Menu (240px)
 * - Item Category Margin Right (24px)
 * - Primary Frame Padding (24 + 24px)
 * Current total: 572
 */
// const MAGIC_NUMBER_TO_MINUS = 572;

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

const brandsData = CompanyDataManager.getFormattedData(testBrands);
const sellersData = CompanyDataManager.getFormattedData(testSellers);

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
  const [settingShow, setSettingShow] = useState(SETTINGS.SHOW_ROWS[2]);
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

  const tagData = generateTabs({
    gender,
    setGender,
    occasions,
    setOccasions,
    styles,
    setStyles,
    brands,
    setBrands,
    numberOfResellersValues,
    setNumberOfResellersValues,
    featuredResellers,
    setFeaturedResellers,
    resellers,
    setResellers,
    price,
    setPrice,
    testBrands,
    testSellers,
    originalStates,
  });

  const clearFilters = () => {
    setGender(originalStates.gender);
    setOccasions(originalStates.occasions);
    setStyles(originalStates.styles);
    setBrands(originalStates.brands);
    setNumberOfResellersValues(originalStates.numberOfSellersValues);
    setFeaturedResellers(originalStates.featuredSellers);
    setResellers(originalStates.sellers);
    setPrice(originalStates.price);
  };

  const hideFiltersPopup = () => {
    setShowFiltersPopup(false);
  };

  return (
    <Content
      style={{
        background: '#fff',
        padding: 24,
        minHeight: 280,
        minWidth: '100%',
        width: 'fit-content',
        height: 'fit-content',
        // margin: "0px 12px 0px 12px"
      }}
    >
      <PopupItemFilters
        visible={showFiltersPopup}
        hideFiltersPopup={hideFiltersPopup}
        gender={gender}
        setGender={setGender}
        occasions={occasions}
        setOccasions={setOccasions}
        styles={styles}
        setStyles={setStyles}
        brands={brands}
        setBrands={setBrands}
        numberOfResellersValues={numberOfResellersValues}
        setNumberOfResellersValues={setNumberOfResellersValues}
        featuredResellers={featuredResellers}
        setFeaturedResellers={setFeaturedResellers}
        resellers={resellers}
        setResellers={setResellers}
        price={price}
        setPrice={setPrice}
        tagData={tagData}
        clearFilters={clearFilters}
        testBrands={testBrands}
        testSellers={testSellers}
        brandsData={brandsData}
        sellersData={sellersData}
      />
      <Row>
        <Col span={14}>
          Showing 1-16 of 120,000 results for{' '}
          <strong>Shoes {'>'} Sneakers</strong>
        </Col>
        <Col
          span={10}
          style={{
            textAlign: 'end',
          }}
        >
          <span style={cssStyles.inputSelectSection}>
            <span style={cssStyles.inputSelectText}>Show:</span>
            <Select
              value={settingShow}
              size="small"
              style={{ width: 64 }}
              onChange={(value) => setSettingShow(value)}
              className="not-bold"
            >
              {SETTINGS.SHOW_ROWS.map((value, index) => {
                return (
                  <Option key={index} value={value}>
                    {value}
                  </Option>
                );
              })}
            </Select>
          </span>
          <span style={cssStyles.inputSelectSection}>
            <span style={cssStyles.inputSelectText}>Sort by:</span>
            <Select
              defaultValue="newest"
              size="small"
              style={{ width: 110 }}
              className="not-bold"
            >
              <Option value="newest">Newest</Option>
              <Option value="name-a-z">Name (A-Z)</Option>
              <Option value="name-z-a">Name (Z-A)</Option>
              <Option value="popular">Popular</Option>
            </Select>
          </span>
        </Col>
      </Row>
      <Row style={{ marginTop: 12, minHeight: 32 }}>
        <Search
          placeholder="Search"
          onSearch={(value) => console.log(value)}
          style={{
            ...cssStyles.searchAndFilterButtons,
            width: 240,
          }}
          // size="small"
          className="not-bold"
        />
        <Button
          style={cssStyles.searchAndFilterButtons}
          icon={<FilterOutlined />}
          onClick={() => {
            setShowFiltersPopup(true);
          }}
        >
          Filter
        </Button>
        {tagData.tags}
      </Row>
      <Row
        style={{
          marginTop: 12,
          // width: 'calc(100vw - 572px)'
          // width: `calc(100vw - ${MAGIC_NUMBER_TO_MINUS}px)`
        }}
      >
        <ItemsTable show={settingShow} />
      </Row>
    </Content>
  );
}

export { PrimaryFrame };
