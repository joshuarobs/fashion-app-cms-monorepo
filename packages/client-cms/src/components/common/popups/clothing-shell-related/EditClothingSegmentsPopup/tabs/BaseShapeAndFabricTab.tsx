import React, { useState } from 'react';
import { HeaderTabLinkCountBadge } from '../../../../HeaderTabLinkCountBadge';
import { Anchor, Col, Collapse, Row, Tabs } from 'antd';
import { GroupSectionSleeves } from '../sections/GroupSectionSleeves';
import { ClothingSegmentsData } from '@joshuarobs/clothing-framework';
import { BaseShapeAndFabricTabAnchor } from './BaseShapeAndFabricTabAnchor';
import { GroupSectionBody } from '../sections/GroupSectionBody';
import { ClothingSegmentDataChangesProps } from '../../../../../clothing-shell/overview/ClothingSegmentDataChangesProps';
import { ClothingSegmentDataHasChangedProps } from '../../../../../clothing-shell/overview/ClothingSegmentDataHasChangedProps';
import { FrameInputLabel } from '../../../../typography/FrameInputLabel';
import { LaptopSizePreset } from '../../../../../../utils/LaptopSizePreset';

const { Link } = Anchor;
const { Panel } = Collapse;

const style = {
  notClickable: {
    userSelect: 'none',
  },
  collapse: {
    marginBottom: 12,
  },
};

interface BaseShapeAndFabricTabProps {
  editedClothingSegmentsData: ClothingSegmentsData;
  setEditedClothingSegmentsData: Function;
  setNumChangesTabBaseShapeFabric: Function;
  hasChanged: ClothingSegmentDataHasChangedProps;
  disabled: boolean;
  laptopSizePreset?: LaptopSizePreset;
}

function BaseShapeAndFabricTab({
  editedClothingSegmentsData,
  setEditedClothingSegmentsData,
  setNumChangesTabBaseShapeFabric,
  hasChanged,
  disabled,
  laptopSizePreset = LaptopSizePreset.MacBookPro16,
}: BaseShapeAndFabricTabProps) {
  const [numChangesSleeves, setNumChangesSleeves] = useState(0);
  const [numChangesSleevesFront, setNumChangesSleevesFront] = useState(0);
  const [numChangesSleevesBack, setNumChangesSleevesBack] = useState(0);
  const [numChangesBody, setNumChangesBody] = useState(0);
  const [numChangesBodyFront, setNumChangesBodyFront] = useState(0);
  const [numChangesBodyBack, setNumChangesBodyBack] = useState(0);
  const [numChangesHead, setNumChangesHead] = useState(0);
  const [numChangesFeet, setNumChangesFeet] = useState(0);
  const [numChangesOther, setNumChangesOther] = useState(0);

  setNumChangesTabBaseShapeFabric(
    numChangesSleeves +
      numChangesBody +
      numChangesHead +
      numChangesFeet +
      numChangesOther
  );

  const frontSleevesHasChanged =
    hasChanged.right_sleeve_start_front ||
    hasChanged.right_sleeve_end_front ||
    hasChanged.left_sleeve_start_front ||
    hasChanged.left_sleeve_end_front;

  const backSleevesHasChanged =
    hasChanged.right_sleeve_start_back ||
    hasChanged.right_sleeve_end_back ||
    hasChanged.left_sleeve_start_back ||
    hasChanged.left_sleeve_end_back;

  const sleevesHasChanged =
    frontSleevesHasChanged ||
    backSleevesHasChanged ||
    hasChanged.sleeves_front_back_is_same ||
    hasChanged.sleeves_is_symmetrical;

  const frontBodyHasChanged =
    hasChanged.right_body_start_front ||
    hasChanged.right_body_end_front ||
    hasChanged.left_body_start_front ||
    hasChanged.left_body_end_front;

  const backBodyHasChanged =
    hasChanged.right_body_start_back ||
    hasChanged.right_body_end_back ||
    hasChanged.left_body_start_back ||
    hasChanged.left_body_end_back;

  const bodyHasChanged =
    frontBodyHasChanged ||
    backBodyHasChanged ||
    hasChanged.body_front_back_is_same ||
    hasChanged.body_is_symmetrical;

  let height = 550;
  switch (laptopSizePreset) {
    case LaptopSizePreset.MacBookPro16:
      // height = 550;
      break;
    case LaptopSizePreset.MacBookPro13:
      height = 454;
      break;
  }

  return (
    <Row
      style={{ marginTop: 16, overflowY: 'scroll', height }}
      id="ModalModalBundles"
      className="ModalModalBundles"
    >
      <Col span={5} style={{ paddingLeft: 4 }}>
        <Anchor
          // affix={false}
          // @ts-ignore
          getContainer={() =>
            document.querySelectorAll('.ModalModalBundles')[0]
          }
        >
          <Link
            title={
              <FrameInputLabel
                text={`Sleeves${
                  numChangesSleeves > 0 ? ` (${numChangesSleeves})` : ''
                }`}
                hasChanged={sleevesHasChanged}
                noColumn
              />
            }
            href={'#' + BaseShapeAndFabricTabAnchor.Sleeves}
          >
            <Link
              title={
                <FrameInputLabel
                  text={`Front${
                    numChangesSleevesFront > 0
                      ? ` (${numChangesSleevesFront})`
                      : ''
                  }`}
                  hasChanged={frontSleevesHasChanged}
                  noColumn
                />
              }
              href={'#' + BaseShapeAndFabricTabAnchor.Sleeves_Front}
            />
            <Link
              title={
                <FrameInputLabel
                  text={`Back${
                    numChangesSleevesBack > 0
                      ? ` (${numChangesSleevesBack})`
                      : ''
                  }`}
                  hasChanged={backSleevesHasChanged}
                  noColumn
                />
              }
              href={'#' + BaseShapeAndFabricTabAnchor.Sleeves_Back}
            />
          </Link>
          <Link
            title={
              <FrameInputLabel
                text={`Body${numChangesBody > 0 ? ` (${numChangesBody})` : ''}`}
                hasChanged={bodyHasChanged}
                noColumn
              />
            }
            href={'#' + BaseShapeAndFabricTabAnchor.Body}
          >
            <Link
              title={
                <FrameInputLabel
                  text={`Front${
                    numChangesBodyFront > 0 ? ` (${numChangesBodyFront})` : ''
                  }`}
                  hasChanged={frontBodyHasChanged}
                  noColumn
                />
              }
              href={'#' + BaseShapeAndFabricTabAnchor.Body_Front}
            />
            <Link
              title={
                <FrameInputLabel
                  text={`Back${
                    numChangesBodyBack > 0 ? ` (${numChangesBodyBack})` : ''
                  }`}
                  hasChanged={backBodyHasChanged}
                  noColumn
                />
              }
              href={'#' + BaseShapeAndFabricTabAnchor.Body_Back}
            />
          </Link>
          <Link
            title={`Feet${numChangesFeet > 0 ? ` (${numChangesFeet})` : ''}`}
            href={'#' + BaseShapeAndFabricTabAnchor.Feet}
          />
          <Link
            title={`Head${numChangesHead > 0 ? ` (${numChangesHead})` : ''}`}
            href={'#' + BaseShapeAndFabricTabAnchor.Head}
          />
          <Link
            title={`Other${numChangesOther > 0 ? ` (${numChangesOther})` : ''}`}
            href={'#' + BaseShapeAndFabricTabAnchor.Other}
          />
        </Anchor>
      </Col>
      <Col span={19}>
        <Collapse defaultActiveKey={['1']} style={style.collapse}>
          {/* @ts-ignore */}
          <Panel
            header={
              <div>
                <FrameInputLabel
                  text="Sleeves"
                  hasChanged={sleevesHasChanged}
                  noColumn
                />
                <HeaderTabLinkCountBadge count={numChangesSleeves} />
              </div>
            }
            key="1"
            // @ts-ignore
            style={style.notClickable}
            id={BaseShapeAndFabricTabAnchor.Sleeves}
          >
            <GroupSectionSleeves
              editedClothingSegmentsData={editedClothingSegmentsData}
              setEditedClothingSegmentsData={setEditedClothingSegmentsData}
              setNumChangesSleeves={setNumChangesSleeves}
              setNumChangesSleevesFront={setNumChangesSleevesFront}
              setNumChangesSleevesBack={setNumChangesSleevesBack}
              hasChanged={hasChanged}
              frontSleevesHasChanged={frontSleevesHasChanged}
              backSleevesHasChanged={backSleevesHasChanged}
              disabled={disabled}
            />
          </Panel>
        </Collapse>
        <Collapse defaultActiveKey={['2']} style={style.collapse}>
          <Panel
            header={
              <div>
                Body
                <HeaderTabLinkCountBadge count={numChangesBody} />
              </div>
            }
            key="2"
            // @ts-ignore
            style={style.notClickable}
            id={BaseShapeAndFabricTabAnchor.Body}
          >
            <GroupSectionBody
              editedClothingSegmentsData={editedClothingSegmentsData}
              setEditedClothingSegmentsData={setEditedClothingSegmentsData}
              setNumChangesBody={setNumChangesBody}
              setNumChangesBodyFront={setNumChangesBodyFront}
              setNumChangesBodyBack={setNumChangesBodyBack}
              hasChanged={hasChanged}
              frontBodyHasChanged={frontBodyHasChanged}
              backBodyHasChanged={backBodyHasChanged}
              disabled={disabled}
            />
          </Panel>
        </Collapse>
        <Collapse style={style.collapse}>
          <Panel
            header="Feet"
            key="3"
            // @ts-ignore
            style={style.notClickable}
            id={BaseShapeAndFabricTabAnchor.Feet}
          >
            <p>2</p>
          </Panel>
        </Collapse>
        <Collapse style={style.collapse}>
          <Panel
            header="Head"
            key="4"
            // @ts-ignore
            style={style.notClickable}
            id={BaseShapeAndFabricTabAnchor.Head}
          >
            <p>2</p>
          </Panel>
        </Collapse>
        <Collapse style={style.collapse}>
          <Panel
            header="Other"
            key="5"
            // @ts-ignore
            style={style.notClickable}
            id={BaseShapeAndFabricTabAnchor.Other}
          >
            <p>2</p>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
}

export { BaseShapeAndFabricTab };
