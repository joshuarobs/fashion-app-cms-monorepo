import React from 'react';
import { Col, Row, Select } from 'antd';
import { FrameInputLabel } from '../../../../typography/FrameInputLabel';
import { ClothingSegmentBounds } from '@joshuarobs/clothing-framework/build/enums';
import { FabricLayerDisplay } from '../../../../../clothing-shell/overview/DetailsFrame/FabricLayerDisplay';
import { ClothingSegmentsData } from '@joshuarobs/clothing-framework';
import { Clothing_Segment_Bounds } from '../../../../../../strings';
import { ClothingSegmentDataHasChangedProps } from '../../../../../clothing-shell/overview/ClothingSegmentDataHasChangedProps';

const { Option } = Select;

const styles = {
  sectionTitle: {
    marginTop: 4,
    marginBottom: 8,
  },
};

const options = (
  <>
    {/* @ts-ignore */}
    <Option value={null} />
    <Option value={ClothingSegmentBounds.Arms_410_Top_Shoulder_Sleeve}>
      {Clothing_Segment_Bounds.Bounds_410.Simple}
    </Option>
    <Option value={ClothingSegmentBounds.Arms_420_Shoulder_55}>
      {Clothing_Segment_Bounds.Bounds_420.Simple}
    </Option>
    <Option value={ClothingSegmentBounds.Arms_430_Biceps_Triceps_15}>
      {Clothing_Segment_Bounds.Bounds_430.Simple}
    </Option>
    <Option value={ClothingSegmentBounds.Arms_440_Elbow}>
      {Clothing_Segment_Bounds.Bounds_440.Simple}
    </Option>
    <Option value={ClothingSegmentBounds.Arms_450_Forearm_50}>
      {Clothing_Segment_Bounds.Bounds_450.Simple}
    </Option>
    <Option value={ClothingSegmentBounds.Arms_460_Forearm_85}>
      {Clothing_Segment_Bounds.Bounds_460.Simple}
    </Option>
    <Option value={ClothingSegmentBounds.Arms_470_Wrist}>
      {Clothing_Segment_Bounds.Bounds_470.Simple}
    </Option>
  </>
);

interface FrontBackOfSleevesSectionProps {
  isSymmetrical: boolean;
  editedClothingSegmentsData: ClothingSegmentsData;
  setEditedClothingSegmentsData: Function;
  hasChanged: ClothingSegmentDataHasChangedProps;
  disabled?: boolean;
  isFront?: boolean;
}

function FrontBackOfSleevesSection({
  isSymmetrical,
  editedClothingSegmentsData,
  setEditedClothingSegmentsData,
  hasChanged,
  disabled,
  isFront,
}: FrontBackOfSleevesSectionProps) {
  // const hasChanged = {
  //   right_sleeve_start: false,
  //   right_sleeve_end: false,
  // };

  return (
    <>
      <Row gutter={12}>
        <Col span={12}>
          <Row style={styles.sectionTitle}>
            <FrameInputLabel
              text="Right Sleeve Start"
              hasChanged={
                isFront
                  ? hasChanged.right_sleeve_start_front
                  : hasChanged.right_sleeve_start_back
              }
            />
          </Row>
          <Row>
            <Select
              showSearch
              // @ts-ignore
              value={
                isFront
                  ? editedClothingSegmentsData.right_sleeve_start_front
                  : editedClothingSegmentsData.right_sleeve_start_back
              }
              onChange={(value) => {
                if (isFront) {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    right_sleeve_start_front: value,
                  });
                } else {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    right_sleeve_start_back: value,
                  });
                }
              }}
              style={{ width: '100%' }}
              disabled={disabled}
            >
              {options}
            </Select>
          </Row>
          <Row style={styles.sectionTitle}>
            <FrameInputLabel
              text="Right Sleeve End"
              hasChanged={
                isFront
                  ? hasChanged.right_sleeve_end_front
                  : hasChanged.right_sleeve_end_back
              }
            />
          </Row>
          <Row>
            <Select
              showSearch
              // @ts-ignore
              value={
                isFront
                  ? editedClothingSegmentsData.right_sleeve_end_front
                  : editedClothingSegmentsData.right_sleeve_end_back
              }
              onChange={(value) => {
                if (isFront) {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    right_sleeve_end_front: value,
                  });
                } else {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    right_sleeve_end_back: value,
                  });
                }
              }}
              style={{ width: '100%' }}
              disabled={disabled}
            >
              {options}
            </Select>
          </Row>
        </Col>
        <Col span={12}>
          <Row style={styles.sectionTitle}>
            <FrameInputLabel
              text="Left Sleeve Start"
              hasChanged={
                isFront
                  ? hasChanged.left_sleeve_start_front
                  : hasChanged.left_sleeve_start_back
              }
            />
          </Row>
          <Row>
            <Select
              showSearch
              // @ts-ignore
              value={
                isFront
                  ? editedClothingSegmentsData.left_sleeve_start_front
                  : editedClothingSegmentsData.left_sleeve_start_back
              }
              onChange={(value) => {
                if (isFront) {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    left_sleeve_start_front: value,
                  });
                } else {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    left_sleeve_start_back: value,
                  });
                }
              }}
              style={{ width: '100%' }}
              disabled={disabled || isSymmetrical}
            >
              {options}
            </Select>
          </Row>
          <Row style={styles.sectionTitle}>
            <FrameInputLabel
              text="Left Sleeve End"
              hasChanged={
                isFront
                  ? hasChanged.left_sleeve_end_front
                  : hasChanged.left_sleeve_end_back
              }
            />
          </Row>
          <Row>
            <Select
              showSearch
              // @ts-ignore
              value={
                isFront
                  ? editedClothingSegmentsData.left_sleeve_end_front
                  : editedClothingSegmentsData.left_sleeve_end_back
              }
              onChange={(value) => {
                if (isFront) {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    left_sleeve_end_front: value,
                  });
                } else {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    left_sleeve_end_back: value,
                  });
                }
              }}
              style={{ width: '100%' }}
              disabled={disabled || isSymmetrical}
            >
              {options}
            </Select>
          </Row>
        </Col>
      </Row>
      <Row gutter={12} style={styles.sectionTitle}>
        <FrameInputLabel text="Right Sleeve Fabric Layers" span={12} />
        <FrameInputLabel text="Left Sleeve Fabric Layers" span={12} />
      </Row>
      {/* ----- Shell ----- */}
      <Row gutter={12} style={styles.sectionTitle}>
        <FrameInputLabel
          text="Shell"
          // hasChanged={hasChanged.right_sleeve_start}
          span={12}
        />
        <FrameInputLabel
          text="Shell"
          // hasChanged={hasChanged.right_sleeve_end}
          span={12}
        />
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <FabricLayerDisplay
            fabricLayerId={0}
            showPopup={() => {}}
            removeFabricLayer={() => {}}
            disabled={disabled}
          />
        </Col>
        <Col span={12}>
          <FabricLayerDisplay
            fabricLayerId={0}
            showPopup={() => {}}
            removeFabricLayer={() => {}}
            disabled={disabled || isSymmetrical}
          />
        </Col>
      </Row>
      {/* ----- Lining ----- */}
      <Row gutter={12} style={styles.sectionTitle}>
        <FrameInputLabel
          text="Lining"
          // hasChanged={hasChanged.right_sleeve_start}
          span={12}
        />
        <FrameInputLabel
          text="Lining"
          // hasChanged={hasChanged.right_sleeve_end}
          span={12}
        />
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <FabricLayerDisplay
            fabricLayerId={0}
            showPopup={() => {}}
            removeFabricLayer={() => {}}
            disabled={disabled}
          />
        </Col>
        <Col span={12}>
          <FabricLayerDisplay
            fabricLayerId={0}
            showPopup={() => {}}
            removeFabricLayer={() => {}}
            disabled={disabled || isSymmetrical}
          />
        </Col>
      </Row>
      {/* ----- Fill ----- */}
      <Row gutter={12} style={styles.sectionTitle}>
        <FrameInputLabel
          text="Fill"
          // hasChanged={hasChanged.right_sleeve_start}
          span={12}
        />
        <FrameInputLabel
          text="Fill"
          // hasChanged={hasChanged.right_sleeve_end}
          span={12}
        />
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <FabricLayerDisplay
            fabricLayerId={0}
            showPopup={() => {}}
            removeFabricLayer={() => {}}
            disabled={disabled}
          />
        </Col>
        <Col span={12}>
          <FabricLayerDisplay
            fabricLayerId={0}
            showPopup={() => {}}
            removeFabricLayer={() => {}}
            disabled={disabled || isSymmetrical}
          />
        </Col>
      </Row>
      {/* ----- Interlining ----- */}
      <Row gutter={12} style={styles.sectionTitle}>
        <FrameInputLabel
          text="Interlining"
          // hasChanged={hasChanged.right_sleeve_start}
          span={12}
        />
        <FrameInputLabel
          text="Interlining"
          // hasChanged={hasChanged.right_sleeve_end}
          span={12}
        />
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <FabricLayerDisplay
            fabricLayerId={0}
            showPopup={() => {}}
            removeFabricLayer={() => {}}
            disabled={disabled}
          />
        </Col>
        <Col span={12}>
          <FabricLayerDisplay
            fabricLayerId={0}
            showPopup={() => {}}
            removeFabricLayer={() => {}}
            disabled={disabled || isSymmetrical}
          />
        </Col>
      </Row>
    </>
  );
}

export { FrontBackOfSleevesSection };
