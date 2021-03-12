import React, { useState } from 'react';
import { Modal, Button, Tag, Layout, Row, Col, Typography } from 'antd';
import { ItemFilterCategory } from '../../../framework/itemFilterCategory';
import { FilterTab } from './FilterTab';
import { Gender } from './Gender';
import { OccasionsTab } from './OccasionsTab';
import { StylesTab } from './StylesTab';
import { Brands } from './Brands';
import { NumbersTab } from './NumbersTab';
import { FeaturedResellers } from './FeaturedResellers';
import { objectToArray } from '../../../utils/objectToArray';
import { ItemFilterValuesGender } from '../../../framework/itemFilterValuesGender';
import { ItemFilterValuesNumber } from '../../../framework/itemFilterValuesNumber';
import { ItemFilterValuesCompanyType } from '../../../framework/itemFilterValuesCompanyType';
import { CompanyDataManager } from './companyDataManager';
import { generateTabs } from './tagManager';

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

// Gets `ItemFilterCategories` and turns the object into an array
const itemFilterCategories = objectToArray(ItemFilterCategory);

interface PopupItemFiltersProps {
  visible: boolean;
  hideFiltersPopup: React.MouseEventHandler;
  gender: any;
  setGender: Function;
  occasions: any;
  setOccasions: Function;
  styles: any;
  setStyles: Function;
  brands: any;
  setBrands: Function;
  numberOfResellersValues: any;
  setNumberOfResellersValues: Function;
  featuredResellers: any;
  setFeaturedResellers: Function;
  resellers: any;
  setResellers: Function;
  price: any;
  setPrice: Function;
  tagData: any;
  clearFilters: React.MouseEventHandler;
  testBrands: any;
  testSellers: any;
  brandsData: any;
  sellersData: any;
}

function PopupItemFilters({
  visible,
  hideFiltersPopup,
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
  tagData,
  clearFilters,
  testBrands,
  testSellers,
  brandsData,
  sellersData,
}: PopupItemFiltersProps) {
  const [currentTab, setCurrentTab] = useState(itemFilterCategories[0].id);

  const handleOk = () => {};

  return (
    <Modal
      visible={visible}
      title="Select Filters"
      onOk={handleOk}
      onCancel={hideFiltersPopup}
      footer={[
        <Button key="back" onClick={hideFiltersPopup}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Apply Filters
        </Button>,
      ]}
      className="popup-filters"
      width={724}
      centered
    >
      <Layout>
        <Content
          style={{
            padding: 24,
            background: '#fff',
          }}
        >
          <Row>
            <Col span={12}>
              <p>10 Filters selected</p>
            </Col>
            <Col
              span={12}
              style={{
                textAlign: 'end',
              }}
            >
              <Button type="link" onClick={clearFilters}>
                Clear Filters
              </Button>
            </Col>
          </Row>
          <Row
            style={{
              minHeight: 40,
            }}
          >
            {tagData.tags}
          </Row>
        </Content>
        <div
          style={{
            display: 'flex',
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 12,
            paddingRight: 12,
            overflowY: 'scroll',
            height: 550,
          }}
        >
          <Content
            style={{
              background: '#fff',
              maxWidth: 240,
              marginLeft: 12,
              marginRight: 12,
              height: 'fit-content',
            }}
          >
            {itemFilterCategories.map((category) => {
              let selectedValues = null;
              let allValues = null;
              switch (category.id) {
                case ItemFilterCategory.Gender.id:
                  selectedValues = gender;
                  break;
                // TODO: CATEGORY
                case ItemFilterCategory.Occasions.id:
                  selectedValues = occasions;
                  break;
                case ItemFilterCategory.Styles.id:
                  selectedValues = styles;
                  break;
                case ItemFilterCategory.Brands.id:
                  selectedValues = brands;
                  allValues = testBrands;
                  break;
                case ItemFilterCategory.Number_Of_Resellers.id:
                  selectedValues = numberOfResellersValues;
                  break;
                case ItemFilterCategory.Featured_Resellers.id:
                  selectedValues = featuredResellers;
                  allValues = testSellers;
                  break;
                case ItemFilterCategory.Resellers.id:
                  selectedValues = resellers;
                  allValues = testSellers;
                  break;
                case ItemFilterCategory.Price.id:
                  selectedValues = price;
                  break;
                // TODO: COLOURS
                // TODO: MATERIAL
                // TODO: NUMBER_IN_CLOSETS
                // TODO: PICK_RATE
                // TODO: MADE_IN
              }
              return (
                <FilterTab
                  key={category.id}
                  type={category.id}
                  title={category.name}
                  isSelected={currentTab === category.id}
                  handleClick={() => setCurrentTab(category.id)}
                  menuStrings={tagData.menuStrings}
                />
              );
            })}
          </Content>
          <Content
            style={{
              padding: 24,
              background: '#fff',
              marginLeft: 12,
              marginRight: 12,
              maxWidth: 412,
              height: 'fit-content',
              minHeight: 924,
            }}
          >
            {currentTab === ItemFilterCategory.Gender.id && (
              <Gender
                current={gender}
                setCurrent={(value: any) => setGender(value)}
              />
            )}
            {currentTab === ItemFilterCategory.Occasions.id && (
              <OccasionsTab
                current={occasions}
                setCurrent={(value: any) => setOccasions(value)}
              />
            )}
            {currentTab === ItemFilterCategory.Styles.id && (
              <StylesTab
                current={styles}
                setCurrent={(value: any) => setStyles(value)}
              />
            )}
            {currentTab === ItemFilterCategory.Brands.id && (
              <Brands
                brands={brandsData}
                values={brands}
                setValues={(value: any) => setBrands(value)}
              />
            )}
            {currentTab === ItemFilterCategory.Number_Of_Resellers.id && (
              // @ts-ignore
              <NumbersTab
                values={numberOfResellersValues}
                setValues={setNumberOfResellersValues}
              />
            )}
            {currentTab === ItemFilterCategory.Featured_Resellers.id && (
              <FeaturedResellers
                sellers={sellersData}
                values={featuredResellers}
                setValues={(value: any) => setFeaturedResellers(value)}
              />
            )}
            {currentTab === ItemFilterCategory.Resellers.id && (
              <FeaturedResellers
                sellers={sellersData}
                values={resellers}
                setValues={(value: any) => setResellers(value)}
              />
            )}
            {currentTab === ItemFilterCategory.Price.id && (
              <NumbersTab
                values={price}
                setValues={setPrice}
                formatter={(value: string) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value: string) => value.replace(/\$\s?|(,*)/g, '')}
                allowedTypes={[
                  ItemFilterValuesNumber.Values.Range.id,
                  ItemFilterValuesNumber.Values.Greater_Than_Or_Equal_To.id,
                  ItemFilterValuesNumber.Values.Lesser_Than_Or_Equal_To.id,
                ]}
                step={10}
                max={100000}
                styleInputBox={{ width: '120px' }}
              />
            )}
          </Content>
        </div>
      </Layout>
    </Modal>
  );
}

export { PopupItemFilters };
