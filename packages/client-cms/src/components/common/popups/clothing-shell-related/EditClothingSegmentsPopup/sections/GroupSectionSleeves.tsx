import React, { useEffect, useState } from 'react';
import { Col, Collapse, Row } from 'antd';
import { SwitchElement } from '../../../../SwitchElement';
import { FrontBackOfSleevesSection } from './FrontBackOfSleevesSection';
import { ClothingSegmentsData } from '@joshuarobs/clothing-framework';
import { BaseShapeAndFabricTabAnchor } from '../tabs/BaseShapeAndFabricTabAnchor';
import { HeaderTabLinkCountBadge } from '../../../../HeaderTabLinkCountBadge';
import { ClothingSegmentDataHasChangedProps } from '../../../../../clothing-shell/overview/ClothingSegmentDataHasChangedProps';
import { FrameInputLabel } from '../../../../typography/FrameInputLabel';

const { Panel } = Collapse;

enum SectionId {
  Front_Of_Sleeve = 'Front_Of_Sleeve',
  Back_Of_Sleeve = 'Back_Of_Sleeve',
}

interface GroupSectionSleevesProps {
  editedClothingSegmentsData: ClothingSegmentsData;
  setEditedClothingSegmentsData: Function;
  setNumChangesSleeves: Function;
  setNumChangesSleevesFront: Function;
  setNumChangesSleevesBack: Function;
  hasChanged: ClothingSegmentDataHasChangedProps;
  frontSleevesHasChanged: boolean;
  backSleevesHasChanged: boolean;
  disabled?: boolean;
}

function GroupSectionSleeves({
  editedClothingSegmentsData,
  setEditedClothingSegmentsData,
  setNumChangesSleeves,
  setNumChangesSleevesFront,
  setNumChangesSleevesBack,
  hasChanged,
  frontSleevesHasChanged,
  backSleevesHasChanged,
  disabled,
}: GroupSectionSleevesProps) {
  // const [front_and_back_are_same, setFrontAndBackAreSame] = useState(false);
  // const [is_symmetrical, setIsSymmetrical] = useState(false);
  const [activeKeys, setActiveKeys] = useState([SectionId.Front_Of_Sleeve]);

  const onChangePanel = (key: any) => {
    setActiveKeys(key);
  };

  // useEffect(() => {
  //   if (front_and_back_are_same) {
  //     setActiveKeys(
  //       activeKeys.filter((item: any) => item !== SectionId.Back_Of_Sleeve)
  //     );
  //     console.log('did it work?:', activeKeys);
  //   }
  // }, [activeKeys]);

  const toggleFrontAndBackAreSame = (checked: boolean) => {
    setEditedClothingSegmentsData({
      ...editedClothingSegmentsData,
      sleeves_front_back_is_same: checked,
    });
    // Close the `Back of Sleeve` section if we set this to true
    if (checked) {
      setActiveKeys(
        activeKeys.filter((item: any) => item !== SectionId.Back_Of_Sleeve)
      );
    }
  };

  const toggleIsSymmetrical = (checked: boolean) => {
    setEditedClothingSegmentsData({
      ...editedClothingSegmentsData,
      sleeves_is_symmetrical: checked,
    });
  };

  // Count how many modifications from the default ClothingSegmentData state
  // have been made
  // NOTE: This is separate from the number of changes made, which is
  // the number compared to the original state (from the database)
  let numModificationsFrontOfSleeve = 0;
  if (editedClothingSegmentsData.right_sleeve_start_front)
    numModificationsFrontOfSleeve++;
  if (editedClothingSegmentsData.right_sleeve_end_front)
    numModificationsFrontOfSleeve++;
  if (editedClothingSegmentsData.left_sleeve_start_front)
    numModificationsFrontOfSleeve++;
  if (editedClothingSegmentsData.left_sleeve_end_front)
    numModificationsFrontOfSleeve++;

  let numModificationsBackOfSleeve = 0;
  if (editedClothingSegmentsData.right_sleeve_start_back)
    numModificationsBackOfSleeve++;
  if (editedClothingSegmentsData.right_sleeve_end_back)
    numModificationsBackOfSleeve++;
  if (editedClothingSegmentsData.left_sleeve_start_back)
    numModificationsBackOfSleeve++;
  if (editedClothingSegmentsData.left_sleeve_end_back)
    numModificationsBackOfSleeve++;

  let numModificationsSleeve =
    numModificationsFrontOfSleeve + numModificationsBackOfSleeve;
  if (!editedClothingSegmentsData.sleeves_front_back_is_same)
    numModificationsSleeve++;
  if (!editedClothingSegmentsData.sleeves_is_symmetrical)
    numModificationsSleeve++;

  setNumChangesSleeves(numModificationsSleeve);
  setNumChangesSleevesFront(numModificationsFrontOfSleeve);
  setNumChangesSleevesBack(numModificationsBackOfSleeve);

  return (
    <>
      <Row style={{ marginBottom: 12 }} gutter={12}>
        <Col span={12}>
          <label
            style={{
              userSelect: 'none',
              padding: 2,
              display: 'block',
              cursor: !disabled ? 'pointer' : 'default',
            }}
          >
            {/*<span*/}
            {/*  style={{*/}
            {/*    marginRight: 12,*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Front and back are same*/}
            {/*</span>*/}
            <FrameInputLabel
              text="Front and back are same"
              hasChanged={hasChanged.sleeves_front_back_is_same}
              noColumn
            />
            <SwitchElement
              checked={editedClothingSegmentsData.sleeves_front_back_is_same}
              onChange={toggleFrontAndBackAreSame}
              disabled={disabled}
              alignRight
            />
          </label>
        </Col>
        <Col span={12}>
          <label
            style={{
              userSelect: 'none',
              padding: 2,
              display: 'block',
              cursor: !disabled ? 'pointer' : 'default',
            }}
          >
            <FrameInputLabel
              text="Is symmetrical"
              hasChanged={hasChanged.sleeves_is_symmetrical}
              noColumn
            />
            <SwitchElement
              checked={editedClothingSegmentsData.sleeves_is_symmetrical}
              onChange={toggleIsSymmetrical}
              disabled={disabled}
              alignRight
            />
          </label>
        </Col>
      </Row>
      <Collapse activeKey={activeKeys} onChange={onChangePanel}>
        <Panel
          header={
            <div>
              <FrameInputLabel
                text="Front of Sleeve"
                hasChanged={frontSleevesHasChanged}
                noColumn
              />
              <HeaderTabLinkCountBadge count={numModificationsFrontOfSleeve} />
            </div>
          }
          key={SectionId.Front_Of_Sleeve}
          id={BaseShapeAndFabricTabAnchor.Sleeves_Front}
        >
          <FrontBackOfSleevesSection
            isSymmetrical={editedClothingSegmentsData.sleeves_is_symmetrical}
            editedClothingSegmentsData={editedClothingSegmentsData}
            setEditedClothingSegmentsData={setEditedClothingSegmentsData}
            hasChanged={hasChanged}
            disabled={disabled}
            isFront
          />
        </Panel>
        <Panel
          header={
            <div>
              <FrameInputLabel
                text="Back of Sleeve"
                hasChanged={backSleevesHasChanged}
                disabled={editedClothingSegmentsData.sleeves_front_back_is_same}
                noColumn
              />
              <HeaderTabLinkCountBadge count={numModificationsBackOfSleeve} />
            </div>
          }
          key={SectionId.Back_Of_Sleeve}
          id={BaseShapeAndFabricTabAnchor.Sleeves_Back}
          collapsible={
            editedClothingSegmentsData.sleeves_front_back_is_same
              ? 'disabled'
              : undefined
          }
          // disabled={editedClothingSegmentsData.sleeves_front_back_is_same}
        >
          <FrontBackOfSleevesSection
            isSymmetrical={editedClothingSegmentsData.sleeves_is_symmetrical}
            editedClothingSegmentsData={editedClothingSegmentsData}
            setEditedClothingSegmentsData={setEditedClothingSegmentsData}
            hasChanged={hasChanged}
            disabled={disabled}
          />
        </Panel>
      </Collapse>
    </>
  );
}

export { GroupSectionSleeves };
