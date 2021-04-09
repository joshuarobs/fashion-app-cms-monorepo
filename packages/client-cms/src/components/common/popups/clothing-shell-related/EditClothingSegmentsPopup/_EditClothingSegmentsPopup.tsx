import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Button, Col, Modal, Row, Tabs } from 'antd';
import { RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { ClothingSegmentsPopupMode } from '../ClothingSegmentsPopupMode';
import { HeaderTabLinkCountBadge } from '../../../HeaderTabLinkCountBadge';
import { BaseShapeAndFabricTab } from './tabs/BaseShapeAndFabricTab';
import { ClothingSegmentsData } from '@joshuarobs/clothing-framework';
import { ModelAndStatistics } from '../../../frames/ClothingShellOverviewFrame/ModelAndStatistics/_ModelAndStatistics';
import { ClothingSegmentDataHasChangedProps } from '../../../../clothing-shell/overview/ClothingSegmentDataHasChangedProps';
import { LaptopSizePreset } from '../../../../../utils/LaptopSizePreset';

const { TabPane } = Tabs;

enum TabIds {
  BaseShapeAndFabric = 'BaseShapeAndFabric',
  NegativeMaskCutout = 'NegativeMaskCutout',
  MinorDetails = 'MinorDetails',
}

interface EditClothingSegmentsPopupProps {
  showModal: boolean;
  onCancel: React.MouseEventHandler;
  onSubmit: any;
  popupMode: ClothingSegmentsPopupMode;
  clothingShell: any;
  hasChanged: ClothingSegmentDataHasChangedProps;
  // clothingSegmentsData: ClothingSegmentsData;
  editedClothingSegmentsData: ClothingSegmentsData;
  setEditedClothingSegmentsData: Function;
  resetClothingSegmentData: Function;
  bodyCoverage: number | null;
  nameTitle?: string;
}

function _EditClothingSegmentsPopup({
  showModal,
  onCancel,
  onSubmit,
  popupMode,
  clothingShell,
  hasChanged,
  // clothingSegmentsData,
  editedClothingSegmentsData,
  setEditedClothingSegmentsData,
  resetClothingSegmentData,
  bodyCoverage,
  nameTitle,
}: EditClothingSegmentsPopupProps) {
  console.error('HEY');

  const [currentTab, setCurrentTab] = useState(TabIds.BaseShapeAndFabric);

  let laptopSizePreset = LaptopSizePreset.MacBookPro16;
  const isLargeLaptop16inch = useMediaQuery({ query: '(min-height: 750px)' });
  const isSmallLaptop13inch = useMediaQuery({ query: '(min-height: 600px)' });

  // Default values for a MacBook Pro 16
  const style = {
    top: 16,
  };

  const bodyStyle = {
    maxHeight: 'initial',
  };

  let mainSectionMaxHeight: number | string = 'initial';

  if (isLargeLaptop16inch) {
    // Do nothing
  } else if (isSmallLaptop13inch) {
    laptopSizePreset = LaptopSizePreset.MacBookPro13;
    style.top = 16;
    // @ts-ignore
    bodyStyle.maxHeight = 540;
    mainSectionMaxHeight = 540;
  }

  console.log('@@@@clothingShell:', clothingShell);
  let title;
  switch (popupMode) {
    case ClothingSegmentsPopupMode.Edit:
      title = 'Edit Clothing Segments - ' + nameTitle;
      break;
    case ClothingSegmentsPopupMode.Readonly:
      title = 'View Clothing Segments - ' + nameTitle;
      break;
  }

  const disabled = popupMode === ClothingSegmentsPopupMode.Readonly;
  // console.log('popupMode:', popupMode);

  // const [editedClothingSegmentsData, setEditedClothingSegmentsData] = useState(
  //   clothingSegmentsData
  // );

  const [
    numChangesTabBaseShapeFabric,
    setNumChangesTabBaseShapeFabric,
  ] = useState(0);

  const [
    numChangesTabNegativeMaskCutout,
    setNumChangesTabNegativeMaskCutout,
  ] = useState(0);

  const [numChangesTabMinorDetails, setNumChangesTabMinorDetails] = useState(0);

  const footerReadonly = [
    <Button
      key="submit"
      type="primary"
      loading={false}
      // onClick={
      //   popupMode === ClothingSegmentsPopupMode.Edit ? onSubmit : onCancel
      // }
      onClick={onCancel}
      disabled={false}
    >
      {popupMode === ClothingSegmentsPopupMode.Edit ? 'Apply Changes' : 'Done'}
    </Button>,
  ];

  const footerAll = [
    <Button
      key="reset"
      // @ts-ignore
      onClick={resetClothingSegmentData}
      disabled={popupMode === ClothingSegmentsPopupMode.Readonly}
    >
      Reset
    </Button>,
    <Button
      key="undo"
      onClick={() => {}}
      icon={<UndoOutlined rotate={90} />}
      disabled={popupMode === ClothingSegmentsPopupMode.Readonly}
    >
      Undo
    </Button>,
    <Button
      key="redo"
      onClick={() => {}}
      icon={<RedoOutlined rotate={270} />}
      disabled
    >
      Redo
    </Button>,
    ...footerReadonly,
  ];

  return (
    <Modal
      // key="ModalModalBundles"
      // wrapClassName="ModalModalBundles"
      visible={showModal}
      title={title}
      onCancel={onCancel}
      onOk={onSubmit}
      footer={
        popupMode === ClothingSegmentsPopupMode.Edit
          ? footerAll
          : footerReadonly
      }
      width={1100}
      style={style}
      bodyStyle={bodyStyle}
    >
      <div
        style={{
          marginLeft: 24,
          marginRight: 24,
          marginTop: 4,
          marginBottom: 16,
        }}
      >
        <div>
          <Row>
            <Col
              span={15}
              style={{
                maxHeight: mainSectionMaxHeight,
                // overflow: 'hidden',
              }}
            >
              <Row>
                <Tabs
                  activeKey={currentTab}
                  // @ts-ignore
                  onChange={(value) => setCurrentTab(value)}
                >
                  <TabPane
                    tab={
                      <span className="page-tab-link">
                        {/*<GlobalOutlined />*/}
                        Base Shape and Fabric
                        <HeaderTabLinkCountBadge
                          count={numChangesTabBaseShapeFabric}
                        />
                      </span>
                    }
                    key={TabIds.BaseShapeAndFabric}
                  />
                  <TabPane
                    tab={
                      <span className="page-tab-link">
                        {/*<GlobalOutlined />*/}
                        Negative Mask Cut-out
                        <HeaderTabLinkCountBadge
                          count={numChangesTabNegativeMaskCutout}
                        />
                      </span>
                    }
                    key={TabIds.NegativeMaskCutout}
                  />
                  <TabPane
                    tab={
                      <span className="page-tab-link">
                        {/*<GlobalOutlined />*/}
                        Minor Details
                        <HeaderTabLinkCountBadge
                          count={numChangesTabMinorDetails}
                        />
                      </span>
                    }
                    key={TabIds.MinorDetails}
                  />
                </Tabs>
              </Row>
              <div hidden={currentTab !== TabIds.BaseShapeAndFabric}>
                <BaseShapeAndFabricTab
                  editedClothingSegmentsData={editedClothingSegmentsData}
                  setEditedClothingSegmentsData={setEditedClothingSegmentsData}
                  setNumChangesTabBaseShapeFabric={
                    setNumChangesTabBaseShapeFabric
                  }
                  hasChanged={hasChanged}
                  disabled={disabled}
                  laptopSizePreset={laptopSizePreset}
                />
              </div>
            </Col>
            <Col span={9} style={{ padding: 16 }}>
              <ModelAndStatistics
                bodyCoverage={bodyCoverage}
                weight={null}
                clothingSegmentsData={editedClothingSegmentsData}
                isPopup
                laptopSizePreset={laptopSizePreset}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
}

export { _EditClothingSegmentsPopup };
