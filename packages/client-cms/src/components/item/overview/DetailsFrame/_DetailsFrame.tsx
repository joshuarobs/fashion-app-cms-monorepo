/**
 * Figma reference:
 * Components/Item/Element - Details
 */

import React, { useEffect, useState } from 'react';
import {
  InfoCircleOutlined,
  ShoppingOutlined,
  SkinOutlined,
} from '@ant-design/icons';
import {
  Checkbox,
  Layout,
  DatePicker,
  Row,
  Col,
  Select,
  InputNumber,
  Radio,
  Input,
  Typography,
  Cascader,
  Tooltip,
} from 'antd';
import { ClothingCategory } from '../../../../framework/clothingCategory';
import { ItemFilterValuesOccasion } from '../../../../framework/itemFilterValuesOccasion';
import { ItemFilterValuesStyle } from '../../../../framework/itemFilterValuesStyle';
import { ItemFamilySection } from './ItemFamilySection';
import { BrandSection } from './BrandSection';
import { PopupSelectCompany } from '../../PopupSelectCompany';
import {
  ItemType,
  DataState,
  Gender as GENDERS_MAP,
} from '@joshuarobs/clothing-framework/build/enums';
import { FrameTitle } from '../../../common/typography/FrameTitle';
import { TagInProduction } from '../../../common/localisation/TagInProduction';
import { BurgerMenuButton } from '../../../common/frames/BurgerMenuButton/_BurgerMenuButton';
import { RevisionDropdownBox } from '../../../common/page-state-related/RevisionDropdownBox';
import { useNavigate, useLocation } from 'react-router-dom';
import { enumToCamelCase } from '../../../../utils/enumToCamelCase';
import { TagInDevelopment } from '../../../common/localisation/TagInDevelopment';
import { TagInReview } from '../../../common/localisation/TagInReview';
import { TagInRetirement } from '../../../common/localisation/TagInRetirement';
import { SelectCountryOfManufacture } from '../../../common/data-entry/SelectCountryOfManufacture/_SelectCountryOfManufacture';
import { Generic, Item_Details_Frame } from '../../../../strings';
import { FrameInputLabel } from '../../../common/typography/FrameInputLabel';

const OCCASIONS = ItemFilterValuesOccasion.Values;
// const GENDERS = Array.from(ItemFilterValuesGender.MAP.values());
const GENDERS = Array.from(Object.keys(GENDERS_MAP));

// const tttt = Object.keys(GENDERS_MAP);
// console.log("T:", tttt);

// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Text } = Typography;
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

const optionsClothing = [
  {
    value: ClothingCategory.Inner_Wear.id,
    label: ClothingCategory.Inner_Wear.name,
    children: [
      {
        value: ClothingCategory.Inner_Wear__Tops.id,
        label: ClothingCategory.Inner_Wear__Tops.name,
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

const valuesStyles: any[] = [];

ItemFilterValuesStyle.Map.forEach((style) => {
  // @ts-ignore
  valuesStyles.push(<Option key={style.id}>{style.name}</Option>);
});

interface DetailsFrameProps {
  item: any;
  itemMaindataRevision: any;
  uniqueRevisions: any;
  paramsRevision: any;
  paramsIsRelease: any;
  name: any;
  setName: any;
  type: any;
  setType: any;
  short_id: any;
  setShortId: any;
  occasions: any;
  setOccasions: any;
  brand_id: any;
  setBrandId: any;
  for_gender: any;
  setForGender: any;
  made_in_id: any;
  setMadeInId: any;
  disabled: boolean;
  hasChanged: any;
  numberOfChanges: any;
  onChange: any;
  saveChanges: any;
  setToRetiredData: any;
  deleteItemMaindataRevisionAndMaindata: any;
}

function DetailsFrame({
  item,
  itemMaindataRevision,
  uniqueRevisions,
  paramsRevision,
  paramsIsRelease,
  name,
  setName,
  type,
  setType,
  short_id,
  setShortId,
  occasions,
  setOccasions,
  brand_id,
  setBrandId,
  for_gender,
  setForGender,
  made_in_id,
  setMadeInId,
  disabled,
  hasChanged,
  numberOfChanges,
  onChange,
  saveChanges,
  setToRetiredData,
  deleteItemMaindataRevisionAndMaindata,
}: DetailsFrameProps) {
  // console.log("DetailsFrame > data:", data);
  console.log('DetailsFrame > itemMaindataRevision:', itemMaindataRevision);
  // console.log("DetailsFrame > brand_id:", brand_id);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectValue, setSelectValue] = useState(null);
  useEffect(() => {
    // setSelectValue(`Revision ${uniqueRevisions[0].revision}`);
    // setSelectValue(`Revision ${paramsRevisionId}`);
    // setSelectValue(`Revision ${paramsRevision}`);
    // @ts-ignore
    setSelectValue(Number.parseInt(paramsRevision));
  }, [paramsRevision]);

  // Handle when the user changes the revision via the drop down box (Select)
  // @ts-ignore
  const handleChangeRevision = ({ value }, option) => {
    // Use the unique revisions to determine the most developed state for
    // each revision (whether it is draft or release)
    // uniqueRevisions
    const matchingRevision = uniqueRevisions.find(
      // @ts-ignore
      ({ revision }) => revision === value
    );
    console.log('value:', value);
    console.log('matchingRevision:', matchingRevision);
    const { revision, item_maindata_aggregate } = matchingRevision;
    console.log(
      'value:',
      value,
      '\noption:',
      option,
      '\nselectValue:',
      selectValue,
      '\nrevision:',
      revision
    );
    setSelectValue(revision);
    // Set is release to either its actual value (true or false), or if we
    // can't find it, play it safe and assume that it would be false (a
    // revision SHOULD have at least a draft version, i.e. is_release = false)
    // We are selecting the first item (array index 0), typically is the
    // most latest version (i.e. the release version)
    // For non localisation data entries (item, company, etc.) we only have
    // a release version for each revision, so default to true
    const is_release = true;
    // const is_release =
    //     item_maindata_aggregate.aggregate.count > 0
    //     ? company_translations[0].is_release
    //     : false;
    // history.push(`${location.pathname}?rev=${revision}&release=${is_release}`);
    // Don't need to put release variable since it will automatically load the
    // release version
    navigate(`${location.pathname}?rev=${revision}`);
  };

  const [showPopupSelectCompany, setShowPopupSelectCompany] = useState(false);

  const selectCompany = (id: any) => {
    setBrandId(id);
    setShowPopupSelectCompany(false);
  };

  // ======================================================================
  // UX FUNCTIONS TO ALLOW QUICK SAVING OF FIELDS WITH ENTER
  // ======================================================================
  // Works for all applicable fields that you can press enter on
  // Only works if it's the only change, so having 2 fields or values modified
  // won't work as we don't want accidental changes
  const onPressEnterName = () => {
    if (numberOfChanges === 1 && hasChanged.name) {
      saveChanges();
    }
  };

  // const disabled = itemMaindataRevision.state !== DATA_STATES.DEVELOPMENT;
  let currentStateTag = null;
  switch (itemMaindataRevision.state) {
    case DataState.Development:
      currentStateTag = <TagInDevelopment notClickable />;
      break;
    case DataState.Review:
      currentStateTag = <TagInReview notClickable />;
      break;
    case DataState.Production:
      currentStateTag = <TagInProduction notClickable />;
      break;
    case DataState.Retired:
      currentStateTag = <TagInRetirement notClickable />;
      break;
  }

  return (
    <Content
      style={{
        minHeight: 280,
        maxWidth: 412,
      }}
    >
      <PopupSelectCompany
        item={item}
        itemMaindataRevision={itemMaindataRevision}
        visible={showPopupSelectCompany}
        currentCompanyId={brand_id}
        hideFiltersPopup={() => setShowPopupSelectCompany(false)}
        selectCompany={selectCompany}
      />
      <div
        style={{
          padding: 16,
          background: '#fff',
          borderRadius: 4,
        }}
      >
        <Row>
          <FrameTitle text={Item_Details_Frame.General_Details} span={12} />
          <Col
            style={{
              marginLeft: 'auto',
              // left: "-2px"
            }}
          >
            <RevisionDropdownBox
              uniqueRevisions={uniqueRevisions}
              selectValue={selectValue}
              handleChangeRevision={handleChangeRevision}
            />
            <BurgerMenuButton
              revision={itemMaindataRevision}
              setToRetiredData={setToRetiredData}
              deleteRevision={deleteItemMaindataRevisionAndMaindata}
              // deleteItemTranslations={deleteItemTranslationsForThisRevision}
            />
          </Col>
        </Row>
        <Row
          style={{
            marginBottom: 8,
          }}
        >
          <Col span={12}>{currentStateTag}</Col>
          {/*<Col*/}
          {/*  span={12}*/}
          {/*  style={{*/}
          {/*    display: "flex",*/}
          {/*    justifyContent: "flex-end"*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Button size={size} disabled={disabled}>*/}
          {/*    Fill in via API Sources*/}
          {/*  </Button>*/}
          {/*</Col>*/}
        </Row>
        <BrandSection
          companyId={brand_id}
          showPopup={() => setShowPopupSelectCompany(true)}
          hasChanged={hasChanged.brand_id}
          disabled={disabled}
        />
        <ItemFamilySection disabled={disabled} />
        <Row style={styles.sectionTitle}>
          <FrameInputLabel
            text={Item_Details_Frame.Database_Item_Name}
            span={20}
            hasChanged={hasChanged.name}
          />
          <Col
            span={4}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Tooltip title={Item_Details_Frame.Database_Item_Name_Tooltip}>
              <InfoCircleOutlined
                style={{
                  cursor: 'pointer',
                  fontSize: 16,
                  opacity: 0.65,
                }}
              />
            </Tooltip>
          </Col>
        </Row>
        <Row>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onPressEnter={onPressEnterName}
            disabled={disabled}
          />
        </Row>
        <Row gutter={16} style={styles.sectionTitle}>
          <FrameInputLabel
            text={Item_Details_Frame.Item_Type}
            span={12}
            hasChanged={hasChanged.type}
          />
          <FrameInputLabel
            text={Item_Details_Frame.Short_Id}
            span={12}
            hasChanged={hasChanged.short_id}
          />
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Select
              value={type}
              onChange={(v) => setType(v)}
              style={{ width: '100%' }}
              disabled={disabled}
            >
              <Option value={ItemType.Clothing}>
                <SkinOutlined /> {Generic.Item_Types.Clothing}
              </Option>
              <Option value={ItemType.Accessory}>
                <ShoppingOutlined /> {Generic.Item_Types.Accessory}
              </Option>
            </Select>
          </Col>
          <Col span={12}>
            <InputNumber
              style={{ width: '100%' }}
              value={short_id}
              onChange={(v) => setShortId(v)}
              min={100000}
              max={99999999}
              step={10}
              disabled={disabled}
            />
          </Col>
        </Row>
        <Row style={styles.sectionTitle}>
          <FrameInputLabel
            text={Item_Details_Frame.Item_Category}
            hasChanged={hasChanged.item_category}
          />
        </Row>
        <Row>
          <Cascader
            options={optionsClothing}
            style={{ width: '100%' }}
            disabled={disabled}
          />
        </Row>
        <Row style={styles.sectionTitle}>
          <FrameInputLabel
            text={Item_Details_Frame.Occasions}
            hasChanged={hasChanged.occasions}
          />
        </Row>
        <Row style={{ ...styles.sectionTitle, marginTop: -4 }}>
          <div
            style={{
              padding: 8,
              border: '1px dashed #bbb',
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                whiteSpace: 'normal',
              }}
            >
              Item specific values are <strong>inherited</strong> from Item
              Category: <strong>Low-Tops</strong>
            </Text>
          </div>
        </Row>
        <Row
          style={{
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          <Radio.Group
            size={size}
            defaultValue="from-category"
            buttonStyle="solid"
            style={{
              margin: 'auto',
              marginTop: 4,
            }}
          >
            <Radio.Button value="from-category">
              {Item_Details_Frame.From_Category}
            </Radio.Button>
            <Radio.Button value="item-specific">
              {Item_Details_Frame.Item_Specific}
            </Radio.Button>
          </Radio.Group>
        </Row>
        <Row>
          <Checkbox.Group
            style={{ width: '100%' }}
            value={occasions}
            onChange={onChange}
            disabled={disabled}
          >
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ ...styles.occasionsTitle, marginTop: 0 }}>
                  <Text type="secondary" strong>
                    Home
                  </Text>
                  <br />
                </div>
                <Checkbox value={OCCASIONS.Home.id} style={styles.checkbox}>
                  {OCCASIONS.Home.name}
                </Checkbox>
                <br />
                <Checkbox
                  value={OCCASIONS.Home_Sleeping.id}
                  style={styles.checkbox}
                >
                  {OCCASIONS.Home_Sleeping.name}
                </Checkbox>
                <br />
              </Col>
              <Col span={12}>
                <div style={{ ...styles.occasionsTitle, marginTop: 0 }}>
                  <Text type="secondary" strong>
                    Casual
                  </Text>
                  <br />
                </div>
                <Checkbox value={OCCASIONS.Casual.id} style={styles.checkbox}>
                  {OCCASIONS.Casual.name}
                </Checkbox>
                <br />
                <Checkbox
                  value={OCCASIONS.Smart_Casual.id}
                  style={styles.checkbox}
                >
                  {OCCASIONS.Smart_Casual.name}
                </Checkbox>
                <br />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <div style={styles.occasionsTitle}>
                  <Text type="secondary" strong>
                    Activity
                  </Text>
                  <br />
                </div>
                <Checkbox value={OCCASIONS.Workout.id} style={styles.checkbox}>
                  {OCCASIONS.Workout.name}
                </Checkbox>
                <br />
                <Checkbox value={OCCASIONS.Hiking.id} style={styles.checkbox}>
                  {OCCASIONS.Hiking.name}
                </Checkbox>
                <br />
                <Checkbox value={OCCASIONS.Sports.id} style={styles.checkbox}>
                  {OCCASIONS.Sports.name}
                </Checkbox>
                <br />
              </Col>
              <Col span={12}>
                <div style={styles.occasionsTitle}>
                  <Text type="secondary" strong>
                    Work
                  </Text>
                  <br />
                </div>
                <Checkbox value={OCCASIONS.Uniform.id} style={styles.checkbox}>
                  {OCCASIONS.Uniform.name}
                </Checkbox>
                <br />
                <Checkbox
                  value={OCCASIONS.Business_Casual.id}
                  style={styles.checkbox}
                >
                  {OCCASIONS.Business_Casual.name}
                </Checkbox>
                <br />
                <Checkbox
                  value={OCCASIONS.Business_Formal.id}
                  style={styles.checkbox}
                >
                  {OCCASIONS.Business_Formal.name}
                </Checkbox>
                <br />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <div style={styles.occasionsTitle}>
                  <Text type="secondary" strong>
                    Formal
                  </Text>
                  <br />
                </div>
                <Checkbox
                  value={OCCASIONS.Semi_Formal.id}
                  style={styles.checkbox}
                >
                  {OCCASIONS.Semi_Formal.name}
                </Checkbox>
                <br />
                <Checkbox
                  value={OCCASIONS.Black_Tie.id}
                  style={styles.checkbox}
                >
                  {OCCASIONS.Black_Tie.name}
                </Checkbox>
                <br />
                <Checkbox
                  value={OCCASIONS.White_Tie.id}
                  style={styles.checkbox}
                >
                  {OCCASIONS.White_Tie.name}
                </Checkbox>
                <br />
              </Col>
            </Row>
          </Checkbox.Group>
        </Row>
        <Row style={styles.sectionTitle}>
          <FrameInputLabel
            text={Item_Details_Frame.Styles}
            hasChanged={hasChanged.styles}
          />
        </Row>
        <Row>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            disabled={disabled}
          >
            {valuesStyles}
          </Select>
        </Row>
        <Row gutter={16} style={styles.sectionTitle}>
          <FrameInputLabel
            text={Item_Details_Frame.Release_Date}
            hasChanged={hasChanged.release_date}
            span={12}
          />
          <FrameInputLabel
            text={Item_Details_Frame.Designer_Item_Id}
            hasChanged={hasChanged.designer_id}
            span={12}
          />
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <DatePicker style={{ width: '100%' }} disabled={disabled} />
          </Col>
          <Col span={12}>
            <Input disabled={disabled} />
          </Col>
        </Row>
        <Row gutter={16} style={styles.sectionTitle}>
          <FrameInputLabel
            text={Item_Details_Frame.Gender_Intended_For}
            hasChanged={hasChanged.for_gender}
            span={12}
          />
          <FrameInputLabel
            text={Item_Details_Frame.Made_In}
            hasChanged={hasChanged.made_in_id}
            span={12}
          />
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Select
              // defaultValue={ItemFilterValuesGender.VALUES.ALL.id}
              value={for_gender}
              onChange={(value) => setForGender(value)}
              style={{ width: '100%' }}
              disabled={disabled}
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
          <Col span={12}>
            <SelectCountryOfManufacture
              disabled={disabled}
              made_in_id={made_in_id}
              setMadeInId={setMadeInId}
            />
          </Col>
        </Row>
      </div>
    </Content>
  );
}

export { DetailsFrame };
