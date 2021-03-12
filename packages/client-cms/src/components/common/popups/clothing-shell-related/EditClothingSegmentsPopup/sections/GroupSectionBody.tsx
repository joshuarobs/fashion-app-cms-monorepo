import React, { useEffect, useState } from 'react';
import { Col, Collapse, Row } from 'antd';
import { SwitchElement } from '../../../../SwitchElement';
import { FrontBackOfBodySection } from './FrontBackOfBodySection';
import { ClothingSegmentsData } from '@joshuarobs/clothing-framework';
import { BaseShapeAndFabricTabAnchor } from '../tabs/BaseShapeAndFabricTabAnchor';
import { HeaderTabLinkCountBadge } from '../../../../HeaderTabLinkCountBadge';
import { ClothingSegmentDataHasChangedProps } from '../../../../../clothing-shell/overview/ClothingSegmentDataHasChangedProps';
import { FrameInputLabel } from '../../../../typography/FrameInputLabel';

const { Panel } = Collapse;

enum SectionId {
  Front_Of_Body = 'Front_Of_Body',
  Back_Of_Body = 'Back_Of_Body',
}

interface BodySectionProps {
  editedClothingSegmentsData: ClothingSegmentsData;
  setEditedClothingSegmentsData: Function;
  setNumChangesBody: Function;
  setNumChangesBodyFront: Function;
  setNumChangesBodyBack: Function;
  hasChanged: ClothingSegmentDataHasChangedProps;
  frontBodyHasChanged: boolean;
  backBodyHasChanged: boolean;
  disabled?: boolean;
}

function GroupSectionBody({
  editedClothingSegmentsData,
  setEditedClothingSegmentsData,
  setNumChangesBody,
  setNumChangesBodyFront,
  setNumChangesBodyBack,
  hasChanged,
  frontBodyHasChanged,
  backBodyHasChanged,
  disabled,
}: BodySectionProps) {
  // const [front_and_back_are_same, setFrontAndBackAreSame] = useState(false);
  // const [is_symmetrical, setIsSymmetrical] = useState(false);
  const [activeKeys, setActiveKeys] = useState([SectionId.Front_Of_Body]);

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
      body_front_back_is_same: checked,
    });
    // Close the `Back of Body` section if we set this to true
    if (checked) {
      setActiveKeys(
        activeKeys.filter((item: any) => item !== SectionId.Back_Of_Body)
      );
    }
  };

  const toggleIsSymmetrical = (checked: boolean) => {
    setEditedClothingSegmentsData({
      ...editedClothingSegmentsData,
      body_is_symmetrical: checked,
    });
  };

  // Count how many modifications from the default ClothingSegmentData state
  // have been made
  // NOTE: This is separate from the number of changes made, which is
  // the number compared to the original state (from the database)
  let numModificationsFrontOfBody = 0;
  if (editedClothingSegmentsData.right_body_start_front)
    numModificationsFrontOfBody++;
  if (editedClothingSegmentsData.right_body_end_front)
    numModificationsFrontOfBody++;
  if (editedClothingSegmentsData.left_body_start_front)
    numModificationsFrontOfBody++;
  if (editedClothingSegmentsData.left_body_end_front)
    numModificationsFrontOfBody++;

  let numModificationsBackOfBody = 0;
  if (editedClothingSegmentsData.right_body_start_back)
    numModificationsBackOfBody++;
  if (editedClothingSegmentsData.right_body_end_back)
    numModificationsBackOfBody++;
  if (editedClothingSegmentsData.left_body_start_back)
    numModificationsBackOfBody++;
  if (editedClothingSegmentsData.left_body_end_back)
    numModificationsBackOfBody++;

  let numModificationsBody =
    numModificationsFrontOfBody + numModificationsBackOfBody;
  if (!editedClothingSegmentsData.body_front_back_is_same)
    numModificationsBody++;
  if (!editedClothingSegmentsData.body_is_symmetrical) numModificationsBody++;

  setNumChangesBody(numModificationsBody);
  setNumChangesBodyFront(numModificationsFrontOfBody);
  setNumChangesBodyBack(numModificationsBackOfBody);

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
            <FrameInputLabel
              text="Front and back are same"
              hasChanged={hasChanged.body_front_back_is_same}
              noColumn
            />
            <SwitchElement
              checked={editedClothingSegmentsData.body_front_back_is_same}
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
              hasChanged={hasChanged.body_is_symmetrical}
              noColumn
            />
            <SwitchElement
              checked={editedClothingSegmentsData.body_is_symmetrical}
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
                text="Front of Body"
                hasChanged={frontBodyHasChanged}
                noColumn
              />
              <HeaderTabLinkCountBadge count={numModificationsFrontOfBody} />
            </div>
          }
          key={SectionId.Front_Of_Body}
          id={BaseShapeAndFabricTabAnchor.Body_Front}
        >
          <FrontBackOfBodySection
            isSymmetrical={editedClothingSegmentsData.body_is_symmetrical}
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
                text="Back of Body"
                hasChanged={backBodyHasChanged}
                disabled={editedClothingSegmentsData.body_front_back_is_same}
                noColumn
              />
              <HeaderTabLinkCountBadge count={numModificationsBackOfBody} />
            </div>
          }
          key={SectionId.Back_Of_Body}
          id={BaseShapeAndFabricTabAnchor.Body_Back}
          // disabled={editedClothingSegmentsData.body_front_back_is_same}
          collapsible={
            editedClothingSegmentsData.body_front_back_is_same
              ? 'disabled'
              : undefined
          }
        >
          <FrontBackOfBodySection
            isSymmetrical={editedClothingSegmentsData.body_is_symmetrical}
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

export { GroupSectionBody };
