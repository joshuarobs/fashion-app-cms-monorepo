/**
 * Figma reference:
 * Components/Item/Element - Details
 */

import React from 'react';
import {
  Layout,
  Row,
  Col,
  Select,
  Radio,
  Input,
  Typography,
  Cascader,
} from 'antd';
import { ClothingCategory } from '../../framework/clothingCategory';
import { ItemFilterValuesOccasion } from '../../framework/itemFilterValuesOccasion';
import { ItemFilterValuesStyle } from '../../framework/itemFilterValuesStyle';
import { ItemType, Gender as GendersMap } from '@joshuarobs/clothing-framework';
import { FrameTitle } from '../common/typography/FrameTitle';
import { enumToCamelCase } from '../../utils/enumToCamelCase';
// import SelectCountryOfManufacture from '../common/data-entry/SelectCountryOfManufacture';
import { Generic, Item_Details_Frame } from '../../strings';
import { FabricLayerDisplay } from '../clothing-shell/overview/DetailsFrame/FabricLayerDisplay';
import { FrameTitleLevel2 } from '../common/typography/FrameTitleLevel2';
import { FrameInputLabel } from '../common/typography/FrameInputLabel';
import { ShoppingOutlined, SkinOutlined } from '@ant-design/icons';

const OCCASIONS = ItemFilterValuesOccasion.Values;
// const GENDERS = Array.from(ItemFilterValuesGender.MAP.values());
const GENDERS = Array.from(Object.keys(GendersMap));

// const tttt = Object.keys(GENDERS_MAP);
// console.log("T:", tttt);

// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Text, Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

const placeholderImageUrl =
  'https://pm1.narvii.com/6923/24e9471327fea2908547acc8593d945e06b7e1e9r1-620-435v2_128.jpg';

const size = 'small';

const styles = {
  itemFamilyCell: {
    height: 50,
    paddingLeft: 8,
    paddingRight: 8,
    display: 'table',
    // textAlign: 'center',
  },
  itemFamilyCellContent: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
  occasionsTitle: {
    marginTop: 12,
    marginBottom: 4,
  },
  checkbox: {
    width: '100%',
    paddingTop: 4,
    paddingBottom: 4,
  },
};

const valuesStyles = [];

ItemFilterValuesStyle.Map.forEach((style) => {
  // @ts-ignore
  valuesStyles.push(<Option key={style.id}>{style.name}</Option>);
});

const optionsClothing = [
  {
    value: ClothingCategory.Inner_Wear.id,
    label: ClothingCategory.Inner_Wear.name,
    children: [
      {
        value: ClothingCategory.Mid_Wear__Tops.id,
        label: ClothingCategory.Mid_Wear__Tops.name,
        children: [
          {
            value: ClothingCategory.Inner_Wear__Bras.id,
            label: ClothingCategory.Inner_Wear__Bras.name,
          },
          {
            value: ClothingCategory.Inner_Wear__Undershirts.id,
            label: ClothingCategory.Inner_Wear__Undershirts.name,
          },
        ],
      },
      {
        value: ClothingCategory.Inner_Wear__Lower_Torso.id,
        label: ClothingCategory.Inner_Wear__Lower_Torso.name,
        children: [
          {
            value: ClothingCategory.Inner_Wear__Briefs.id,
            label: ClothingCategory.Inner_Wear__Briefs.name,
          },
          {
            value: ClothingCategory.Inner_Wear__Panties.id,
            label: ClothingCategory.Inner_Wear__Panties.name,
          },
        ],
      },
      {
        value: ClothingCategory.Inner_Wear__Pants.id,
        label: ClothingCategory.Inner_Wear__Pants.name,
      },
      {
        value: ClothingCategory.Inner_Wear__Socks.id,
        label: ClothingCategory.Inner_Wear__Socks.name,
      },
      {
        value: ClothingCategory.Inner_Wear__Other.id,
        label: ClothingCategory.Inner_Wear__Other.name,
      },
    ],
  },
  {
    value: ClothingCategory.Mid_Wear.id,
    label: ClothingCategory.Mid_Wear.name,
    children: [
      {
        value: ClothingCategory.Mid_Wear__Dresses.id,
        label: ClothingCategory.Mid_Wear__Dresses.name,
      },
      {
        value: ClothingCategory.Mid_Wear__Tops.id,
        label: ClothingCategory.Mid_Wear__Tops.name,
        children: [
          {
            value: ClothingCategory.Mid_Wear__Blouses.id,
            label: ClothingCategory.Mid_Wear__Blouses.name,
          },
          {
            value: ClothingCategory.Mid_Wear__Knitwear_And_Sweaters.id,
            label: ClothingCategory.Mid_Wear__Knitwear_And_Sweaters.name,
          },
          {
            value: ClothingCategory.Mid_Wear__Shirts.id,
            label: ClothingCategory.Mid_Wear__Shirts.name,
          },
          {
            value: ClothingCategory.Mid_Wear__Vests.id,
            label: ClothingCategory.Mid_Wear__Vests.name,
          },
        ],
      },
      {
        value: ClothingCategory.Mid_Wear__Shorts.id,
        label: ClothingCategory.Mid_Wear__Shorts.name,
      },
      {
        value: ClothingCategory.Mid_Wear__Skirts.id,
        label: ClothingCategory.Mid_Wear__Skirts.name,
      },
      {
        value: ClothingCategory.Mid_Wear__Pants.id,
        label: ClothingCategory.Mid_Wear__Pants.name,
      },
    ],
  },
  {
    value: ClothingCategory.Outer_Wear.id,
    label: ClothingCategory.Outer_Wear.name,
    children: [
      {
        value: ClothingCategory.Outer_Wear__Jackets_And_Coats.id,
        label: ClothingCategory.Outer_Wear__Jackets_And_Coats.name,
        children: [
          {
            value:
              ClothingCategory.Outer_Wear__Jackets_And_Coats__Coats__Generic.id,
            label:
              ClothingCategory.Outer_Wear__Jackets_And_Coats__Coats__Generic
                .name,
          },
          {
            value:
              ClothingCategory.Outer_Wear__Jackets_And_Coats__Jackets__Generic
                .id,
            label:
              ClothingCategory.Outer_Wear__Jackets_And_Coats__Jackets__Generic
                .name,
          },
          {
            value: ClothingCategory.Outer_Wear__Jackets_And_Coats__Other.id,
            label: ClothingCategory.Outer_Wear__Jackets_And_Coats__Other.name,
          },
        ],
      },
      {
        value: ClothingCategory.Outer_Wear__Shoes.id,
        label: ClothingCategory.Outer_Wear__Shoes.name,
      },
    ],
  },
];

interface DetailsFrameProps {
  item: any;
}

function DetailsFrame({ item }: DetailsFrameProps) {
  const {
    name,
    item_type,
    for_gender,
    weight,
    insulation_points,
    highly_insulating,
  } = item;

  return (
    <Content
      style={{
        minHeight: 280,
        maxWidth: 412,
      }}
    >
      <div
        style={{
          padding: 16,
          background: '#fff',
          borderRadius: 4,
        }}
      >
        <Row>
          <FrameTitle text={Item_Details_Frame.General_Details} span={12} />
        </Row>
        <Row style={{ ...styles.sectionTitle, marginTop: 0 }}>
          <FrameInputLabel text={Item_Details_Frame.Heuristic_Item_Name} />
        </Row>
        <Row>
          <Input value={name} disabled={true} />
          {/*<Text strong>{name}</Text>*/}
        </Row>
        <Row gutter={16} style={styles.sectionTitle}>
          <FrameInputLabel text={Item_Details_Frame.Item_Type} span={12} />
          <FrameInputLabel
            text={Item_Details_Frame.Gender_Intended_For}
            span={12}
          />
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Select value={item_type} style={{ width: '100%' }} disabled={true}>
              <Option value={ItemType.Clothing}>
                <SkinOutlined /> {Generic.Item_Types.Clothing}
              </Option>
              <Option value={ItemType.Accessory}>
                <ShoppingOutlined /> {Generic.Item_Types.Accessory}
              </Option>
            </Select>
          </Col>
          <Col span={12}>
            <Select
              // defaultValue={ItemFilterValuesGender.VALUES.ALL.id}
              value={for_gender}
              style={{ width: '100%' }}
              disabled={true}
            >
              {GENDERS.map((gender) => {
                return (
                  <Option key={gender} value={gender}>
                    {enumToCamelCase(gender)}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        <Row style={styles.sectionTitle}>
          <FrameInputLabel text={Item_Details_Frame.Item_Category} />
        </Row>
        <Row>
          <Cascader
            options={optionsClothing}
            style={{ width: '100%' }}
            disabled={true}
          />
        </Row>
        <Row gutter={16} style={styles.sectionTitle}>
          <FrameInputLabel text={Item_Details_Frame.Weight_g} span={12} />
          <FrameInputLabel
            text={Item_Details_Frame.Insulation_Points}
            span={12}
          />
        </Row>
        <Row gutter={16} style={styles.sectionTitle}>
          <Col span={12}>
            {/* @ts-ignore */}
            <Input value={weight > 0 ? `${weight}g` : null} disabled={true} />
          </Col>
          <Col span={12}>
            <Input value={insulation_points} disabled={true} />
          </Col>
        </Row>
        <Row gutter={16} style={styles.sectionTitle}>
          <FrameInputLabel
            text={Item_Details_Frame.Highly_Insulating}
            span={12}
          />
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Radio.Group value={highly_insulating}>
              <Radio value={false}>False</Radio>
              <Radio value={true}>True</Radio>
            </Radio.Group>
          </Col>
        </Row>
        {/* ============================== */}
        {/* DEFAULT FABRIC LAYERS */}
        {/* ============================== */}
        <Row style={{ marginTop: 16 }}>
          <FrameTitleLevel2 text={'Default Fabric Layers'} noMargin />
        </Row>
        {/* ============================== */}
        {/* DEFAULT FABRIC LAYERS - SHELL AND FILL */}
        {/* ============================== */}
        <Row gutter={16} style={{ ...styles.sectionTitle }}>
          <Col span={12}>
            <Text>Shell</Text>
          </Col>
          <Col span={12}>
            <Text>Fill</Text>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FabricLayerDisplay
              fabricLayerId={null}
              overrideData={item.default_shell_layer}
            />
          </Col>
          <Col span={12}>
            <FabricLayerDisplay
              fabricLayerId={null}
              overrideData={item.default_fill_layer}
            />
          </Col>
        </Row>
        {/* ============================== */}
        {/* DEFAULT FABRIC LAYERS - LINING AND INTERLINING */}
        {/* ============================== */}
        <Row gutter={16} style={styles.sectionTitle}>
          <Col span={12}>
            <Text>Lining</Text>
          </Col>
          <Col span={12}>
            <Text>Interlining</Text>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FabricLayerDisplay
              fabricLayerId={null}
              overrideData={item.default_lining_layer}
            />
          </Col>
          <Col span={12}>
            <FabricLayerDisplay
              fabricLayerId={null}
              overrideData={item.default_interlining_layer_id}
            />
          </Col>
        </Row>
      </div>
    </Content>
  );
}

export { DetailsFrame };
