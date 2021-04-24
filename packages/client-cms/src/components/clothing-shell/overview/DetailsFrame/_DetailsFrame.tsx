/**
 * Figma reference:
 * Components/Item/Element - Details
 */

import React, { useState, useEffect } from 'react';
import {
  Layout,
  Row,
  Col,
  Select,
  InputNumber,
  Input,
  Typography,
  message,
} from 'antd';
import { ItemFilterValuesStyle } from '../../../../framework/itemFilterValuesStyle';
import {
  FabricLayerType,
  ItemType,
} from '@joshuarobs/clothing-framework/build/enums';
import { PopupSelectFabricLayer } from '../../PopupSelectFabricLayer/_PopupSelectFabricLayer';
import { FabricLayerDisplay } from './FabricLayerDisplay';
import { UnsavedChangesCard } from '../../../common/UnsavedChangesCard';
import { Item_Details_Frame } from '../../../../strings';
import { FrameTitle } from '../../../common/typography/FrameTitle';
import { FrameInputLabel } from '../../../common/typography/FrameInputLabel';
import { FrameTitleLevel2 } from '../../../common/typography/FrameTitleLevel2';
import { RevisionDropdownBox } from '../../../common/page-state-related/RevisionDropdownBox';
import { BurgerMenuButton } from '../../../common/frames/BurgerMenuButton/_BurgerMenuButton';
import { useHistory, useLocation } from 'react-router-dom';

// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Title, Text } = Typography;
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
  radioStyle: {
    // display: "block",
    height: '32px',
    lineHeight: '32px',
  },
};

const valuesStyles = [];

ItemFilterValuesStyle.Map.forEach((style) => {
  // @ts-ignore
  valuesStyles.push(<Option key={style.id}>{style.name}</Option>);
});

// update_companies_by_pk(id: $id, _set: $changes) {
//   affected_rows
//   returning {
//     id
//     name
//     short_id
//     type
//   }
// }

interface DetailsFrameProps {
  clothingShell: any;
  uniqueRevisions: any;
  paramsRevision: any;
  clothingShellMaindataRevision: any;
  numberOfChanges: number;
  discardChanges: Function;
  saveChanges: any;
  hasChanged: any;
  // disabled: boolean;
  // setdisabled: Function;
  disabled: boolean;
  name?: string;
  setName: Function;
  item_type?: string;
  setItemType: Function;
  uniform_thickness?: number;
  setUniformThickness: Function;
  default_shell_layer_id: number | null;
  setDefaultShellLayerId: Function;
  default_fill_layer_id: number | null;
  setDefaultFillLayerId: Function;
  default_lining_layer_id: number | null;
  setDefaultLiningLayerId: Function;
  default_interlining_layer_id: number | null;
  setDefaultInterliningLayerId: Function;
}

function DetailsFrame({
  clothingShell,
  uniqueRevisions,
  paramsRevision,
  clothingShellMaindataRevision,
  numberOfChanges,
  discardChanges,
  saveChanges,
  hasChanged,
  // disabled,
  disabled,
  name,
  setName,
  item_type,
  setItemType,
  uniform_thickness,
  setUniformThickness,
  default_shell_layer_id,
  setDefaultShellLayerId,
  default_fill_layer_id,
  setDefaultFillLayerId,
  default_lining_layer_id,
  setDefaultLiningLayerId,
  default_interlining_layer_id,
  setDefaultInterliningLayerId,
}: DetailsFrameProps) {
  const history = useHistory();
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
    // console.log(
    //   'value:',
    //   value,
    //   '\noption:',
    //   option,
    //   '\nselectValue:',
    //   selectValue,
    //   '\nrevision:',
    //   revision
    // );
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
    history.push(`${location.pathname}?rev=${revision}`);
  };

  // ============================================================
  // Popup related states
  // ============================================================
  // Whether to show the popup or not (for selecting a fabric layer)
  const [showPopupSelectFabricLayer, setShowPopupSelectFabricLayer] = useState(
    false
  );

  // What fabric layer types will be be filtering for (e.g. shell, fill, lining)
  const [
    popupSelectFabricLayerDefault,
    setPopupSelectFabricLayerDefault,
  ] = useState('');

  // The current fabric layer id
  const [currentFabricLayerId, setCurrentFabricLayerId] = useState(null);

  const showPopup = (fabricLayerType: any, layerId: any) => {
    setPopupSelectFabricLayerDefault(fabricLayerType);
    setCurrentFabricLayerId(layerId);
    setShowPopupSelectFabricLayer(true);
  };

  const selectFabricLayer = (id: any) => {
    switch (popupSelectFabricLayerDefault) {
      case FabricLayerType.Shell:
        setDefaultShellLayerId(id);
        break;
      case FabricLayerType.Fill:
        setDefaultFillLayerId(id);
        break;
      case FabricLayerType.Lining:
        setDefaultLiningLayerId(id);
        break;
      case FabricLayerType.Interlining:
        setDefaultInterliningLayerId(id);
        break;
    }
    setShowPopupSelectFabricLayer(false);
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

  return (
    <>
      <UnsavedChangesCard
        numberOfChanges={numberOfChanges}
        discardChanges={discardChanges}
        saveChanges={saveChanges}
      />
      <Content
        style={{
          marginBottom: 24,
        }}
      >
        <PopupSelectFabricLayer
          clothingShell={clothingShell}
          visible={showPopupSelectFabricLayer}
          currentFabricLayerId={currentFabricLayerId}
          layerType={popupSelectFabricLayerDefault}
          hideFiltersPopup={() => setShowPopupSelectFabricLayer(false)}
          selectFabricLayer={selectFabricLayer}
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
                // revision={itemMaindataRevision}
                // setToRetiredData={setToRetiredData}
                // deleteRevision={deleteItemMaindataRevisionAndMaindata}
                revision={() => {}}
                setToRetiredData={() => {}}
                deleteRevision={() => {}}
              />
            </Col>
          </Row>
          {/* ============================== */}
          {/* CLOTHING SHELL NAME */}
          {/* ============================== */}
          <Row style={styles.sectionTitle}>
            <FrameInputLabel
              text={Item_Details_Frame.Clothing_Shell_Name}
              hasChanged={hasChanged.name}
            />
          </Row>
          <Row>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onPressEnter={onPressEnterName}
              disabled={disabled}
            />
          </Row>
          {/* ============================== */}
          {/* ITEM TYPE + UNIFORM THICKNESS (MM) */}
          {/* ============================== */}
          <Row style={styles.sectionTitle} gutter={16}>
            <FrameInputLabel
              span={12}
              text={Item_Details_Frame.Item_Type}
              hasChanged={hasChanged.item_type}
            />
            <FrameInputLabel
              span={12}
              text={Item_Details_Frame.Uniform_Thickness}
              hasChanged={hasChanged.uniform_thickness}
            />
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Select
                value={item_type}
                onChange={(v) => setItemType(v)}
                style={{ width: '100%' }}
                disabled={disabled}
              >
                <Option value={ItemType.Clothing}>Clothing</Option>
                <Option value={ItemType.Accessory}>Accessories</Option>
              </Select>
            </Col>
            <Col span={12}>
              <InputNumber
                value={uniform_thickness}
                min={0}
                max={10}
                step={0.1}
                onChange={(e) => setUniformThickness(e)}
                disabled={disabled}
              />
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
          <Row gutter={16} style={styles.sectionTitle}>
            <FrameInputLabel
              text="Shell"
              hasChanged={hasChanged.default_shell_layer_id}
              span={12}
            />
            <FrameInputLabel
              text="Fill"
              hasChanged={hasChanged.default_fill_layer_id}
              span={12}
            />
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FabricLayerDisplay
                fabricLayerId={default_shell_layer_id}
                showPopup={() =>
                  showPopup(FabricLayerType.Shell, default_shell_layer_id)
                }
                removeFabricLayer={() => setDefaultShellLayerId(null)}
                disabled={disabled}
              />
            </Col>
            <Col span={12}>
              <FabricLayerDisplay
                fabricLayerId={default_fill_layer_id}
                showPopup={() =>
                  showPopup(FabricLayerType.Fill, default_fill_layer_id)
                }
                removeFabricLayer={() => setDefaultFillLayerId(null)}
                disabled={disabled}
              />
            </Col>
          </Row>
          {/* ============================== */}
          {/* DEFAULT FABRIC LAYERS - LINING AND INTERLINING */}
          {/* ============================== */}
          <Row gutter={16} style={styles.sectionTitle}>
            <FrameInputLabel
              text="Lining"
              hasChanged={hasChanged.default_lining_layer_id}
              span={12}
            />
            <FrameInputLabel
              text="Interlining"
              hasChanged={hasChanged.default_interlining_layer_id}
              span={12}
            />
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FabricLayerDisplay
                fabricLayerId={default_lining_layer_id}
                showPopup={() =>
                  showPopup(FabricLayerType.Lining, default_lining_layer_id)
                }
                removeFabricLayer={() => setDefaultLiningLayerId(null)}
                disabled={disabled}
              />
            </Col>
            <Col span={12}>
              <FabricLayerDisplay
                fabricLayerId={default_interlining_layer_id}
                showPopup={() =>
                  showPopup(
                    FabricLayerType.Interlining,
                    default_interlining_layer_id
                  )
                }
                removeFabricLayer={() => setDefaultInterliningLayerId(null)}
                disabled={disabled}
              />
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
}

export { DetailsFrame };
