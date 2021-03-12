import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { grey } from '@ant-design/colors';
import { Col, Row, Tag, Typography } from 'antd';
import { ItemFilterCategory } from '../../../framework/itemFilterCategory';
import { ItemFilterCategoryData } from '../../../framework/ItemFilterCategoryData';

const { Text } = Typography;

const MAIN_COLOUR = '#1890ff';
const MAIN_COLOUR_FADED = MAIN_COLOUR + '10';

const styles = {
  notSelected: {
    padding: 12,
    display: 'flex',
    borderRight: '2px solid transparent',
    cursor: 'pointer',
  },
  selected: {
    padding: 12,
    display: 'flex',
    borderRight: `2px solid ${MAIN_COLOUR}`,
    backgroundColor: `${MAIN_COLOUR_FADED}`,
    cursor: 'pointer',
  },
  textSelected: {
    color: MAIN_COLOUR,
  },
  arrowSelected: {
    color: MAIN_COLOUR,
    fontSize: 18,
  },
  arrowDefault: {
    color: grey[0],
    fontSize: 18,
  },
  searchAndFilterButtons: {
    verticalAlign: 'middle',
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
    cursor: 'pointer',
  },
};

interface FilterTabProps {
  type: ItemFilterCategoryData;
  title: any;
  isSelected: boolean;
  handleClick: Function;
  menuStrings: any;
}

function FilterTab({
  type,
  title,
  isSelected,
  handleClick,
  menuStrings,
}: FilterTabProps) {
  let tags = <Text type="secondary">All</Text>;
  // switch (type) {
  //   case ItemFilterCategory.GENDER.id:

  let data = [];

  switch (type) {
    case ItemFilterCategory.Gender:
      data = menuStrings.gender;
      break;
    case ItemFilterCategory.Category:
      data = menuStrings.category;
      break;
    case ItemFilterCategory.Occasions:
      data = menuStrings.occasions;
      break;
    case ItemFilterCategory.Styles:
      data = menuStrings.styles;
      break;
    case ItemFilterCategory.Brands:
      data = menuStrings.brands;
      break;
    case ItemFilterCategory.Number_Of_Resellers:
      data = menuStrings.numberOfSellersValues;
      break;
    case ItemFilterCategory.Featured_Resellers:
      data = menuStrings.featuredSellers;
      break;
    case ItemFilterCategory.Resellers:
      data = menuStrings.sellers;
      break;
    case ItemFilterCategory.Price:
      data = menuStrings.price;
      break;
    case ItemFilterCategory.Colours:
      data = menuStrings.colours;
      break;
    case ItemFilterCategory.Materials:
      data = menuStrings.materials;
      break;
    case ItemFilterCategory.Number_In_Closets:
      data = menuStrings.numberInClosets;
      break;
    case ItemFilterCategory.Pick_Rate:
      data = menuStrings.pickRate;
      break;
    case ItemFilterCategory.Made_In:
      data = menuStrings.madeIn;
      break;
  }

  if (data.length > 0) {
    tags = data.map((value: any) => (
      <Tag
        style={styles.searchAndFilterButtons}
        key={value}
        className="large-tag"
      >
        {value}
      </Tag>
    ));
  }

  return (
    <Row
      style={isSelected ? styles.selected : styles.notSelected}
      // @ts-ignore
      onClick={handleClick}
    >
      <Col span={20}>
        <Text
          // @ts-ignore
          style={isSelected ? styles.textSelected : null}
        >
          {title}
        </Text>
        <br />
        {tags}
      </Col>
      <Col
        span={4}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RightOutlined
          style={isSelected ? styles.arrowSelected : styles.arrowDefault}
        />
      </Col>
    </Row>
  );
}

export { FilterTab };
