import React, { useState } from 'react';
import { ItemsTable } from './ItemsTable';
import { FilterOutlined } from '@ant-design/icons';
// import PopupItemFilters from "../PopupItemFilters/";
import { Layout, Row, Col, Select, Input, Button, Tag } from 'antd';
import { ItemFilterValuesGender } from '../../../framework/itemFilterValuesGender';
// import CompanyDataManager from "../PopupItemFilters/companyDataManager";

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
 * - Primary Frame Padding (24 + 24px)
 * Current total: 304 (Done by eye)
 */
const MAGIC_NUMBER_TO_MINUS = 304;

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

function PrimaryFrame() {
  // TODO: Load from user's settings
  const [settingShow, setSettingShow] = useState(SETTINGS.SHOW_ROWS[0]);
  const [showFiltersPopup, setShowFiltersPopup] = useState(false);

  const hideFiltersPopup = () => {
    setShowFiltersPopup(false);
  };

  return (
    <Content
      style={{
        padding: 24,
        background: '#fff',
        minHeight: 280,
        margin: '0px 12px 0px 12px',
      }}
    >
      <Row>
        <Col span={14}>Showing 1-16 of 120,000 results</Col>
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
            <Select defaultValue="newest" size="small" style={{ width: 110 }}>
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
          size="small"
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
        {/*{tagData.tags}*/}
      </Row>
      <Row
        style={{
          marginTop: 12,
          // width: 'calc(100vw - 572px)'
          width: `calc(100vw - ${MAGIC_NUMBER_TO_MINUS}px)`,
        }}
      >
        <ItemsTable show={settingShow} />
      </Row>
    </Content>
  );
}

export { PrimaryFrame };
