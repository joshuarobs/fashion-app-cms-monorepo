import React from 'react';
import { Col, Row, Select } from 'antd';
import { FrameInputLabel } from '../../../../typography/FrameInputLabel';
import { ClothingSegmentBounds } from '@joshuarobs/clothing-enums';
import { FabricLayerDisplay } from '../../../../../clothing-shell/overview/DetailsFrame/FabricLayerDisplay';
import { ClothingSegmentsData } from '@joshuarobs/clothing-framework';
import { Clothing_Segment_Bounds } from '../../../../../../strings';
import { ClothingSegmentDataHasChangedProps } from '../../../../../clothing-shell/overview/ClothingSegmentDataHasChangedProps';

const { Option, OptGroup } = Select;

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
    <OptGroup label="Neck">
      <Option value={ClothingSegmentBounds.Body_10_Top_Of_Neck}>
        {Clothing_Segment_Bounds.Bounds_10.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_20_Middle_Of_Neck}>
        {Clothing_Segment_Bounds.Bounds_20.Simple}
      </Option>
    </OptGroup>
    <OptGroup label="Torso">
      <Option value={ClothingSegmentBounds.Body_30_Above_Upper_Chest}>
        {Clothing_Segment_Bounds.Bounds_30.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_40_Upper_Chest_60}>
        {Clothing_Segment_Bounds.Bounds_40.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_50_Above_Lower_Chest}>
        {Clothing_Segment_Bounds.Bounds_50.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_60_Lower_Chest_30}>
        {Clothing_Segment_Bounds.Bounds_60.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_70_Lower_Chest_85}>
        {Clothing_Segment_Bounds.Bounds_70.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_80_Above_Upper_Abdomen}>
        {Clothing_Segment_Bounds.Bounds_80.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_90_Upper_Abdomen_20}>
        {Clothing_Segment_Bounds.Bounds_90.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_100_Upper_Abdomen_60}>
        {Clothing_Segment_Bounds.Bounds_100.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_110_Upper_Abdomen_95}>
        {Clothing_Segment_Bounds.Bounds_110.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_120_Waist}>
        {Clothing_Segment_Bounds.Bounds_120.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_130_Lower_Abdomen_10}>
        {Clothing_Segment_Bounds.Bounds_130.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_140_Lower_Abdomen_33}>
        {Clothing_Segment_Bounds.Bounds_140.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_150_Lower_Abdomen_67}>
        {Clothing_Segment_Bounds.Bounds_150.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_160_Lower_Abdomen_80}>
        {Clothing_Segment_Bounds.Bounds_160.Simple}
      </Option>
    </OptGroup>
    <OptGroup label="Legs">
      <Option value={ClothingSegmentBounds.Body_170_Hips}>
        {Clothing_Segment_Bounds.Bounds_170.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_180_Hip_Area_60}>
        {Clothing_Segment_Bounds.Bounds_180.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_190_Below_Groin}>
        {Clothing_Segment_Bounds.Bounds_190.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_200_Upper_Thigh_55}>
        {Clothing_Segment_Bounds.Bounds_200.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_210_Thigh_5}>
        {Clothing_Segment_Bounds.Bounds_210.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_220_Thigh_25}>
        {Clothing_Segment_Bounds.Bounds_220.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_230_Thigh_80}>
        {Clothing_Segment_Bounds.Bounds_230.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_240_Knee}>
        {Clothing_Segment_Bounds.Bounds_240.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_250_Calf_15}>
        {Clothing_Segment_Bounds.Bounds_250.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_260_Calf_50}>
        {Clothing_Segment_Bounds.Bounds_260.Simple}
      </Option>
      <Option value={ClothingSegmentBounds.Body_270_Ankle}>
        {Clothing_Segment_Bounds.Bounds_270.Simple}
      </Option>
    </OptGroup>
  </>
);

interface FrontBackOfBodySectionProps {
  isSymmetrical: boolean;
  editedClothingSegmentsData: ClothingSegmentsData;
  setEditedClothingSegmentsData: Function;
  hasChanged: ClothingSegmentDataHasChangedProps;
  disabled?: boolean;
  isFront?: boolean;
}

function FrontBackOfBodySection({
  isSymmetrical,
  editedClothingSegmentsData,
  setEditedClothingSegmentsData,
  hasChanged,
  disabled,
  isFront,
}: FrontBackOfBodySectionProps) {
  // const hasChanged = {
  //   right_body_start: false,
  //   right_body_end: false,
  // };

  return (
    <>
      <Row gutter={12}>
        <Col span={12}>
          <Row style={styles.sectionTitle}>
            <FrameInputLabel
              text="Right Body Start"
              hasChanged={
                isFront
                  ? hasChanged.right_body_start_front
                  : hasChanged.right_body_start_back
              }
            />
          </Row>
          <Row>
            <Select
              showSearch
              // @ts-ignore
              value={
                isFront
                  ? editedClothingSegmentsData.right_body_start_front
                  : editedClothingSegmentsData.right_body_start_back
              }
              onChange={(value) => {
                if (isFront) {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    right_body_start_front: value,
                  });
                } else {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    right_body_start_back: value,
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
              text="Right Body End"
              hasChanged={
                isFront
                  ? hasChanged.right_body_end_front
                  : hasChanged.right_body_end_back
              }
            />
          </Row>
          <Row>
            <Select
              showSearch
              // @ts-ignore
              value={
                isFront
                  ? editedClothingSegmentsData.right_body_end_front
                  : editedClothingSegmentsData.right_body_end_back
              }
              onChange={(value) => {
                if (isFront) {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    right_body_end_front: value,
                  });
                } else {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    right_body_end_back: value,
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
              text="Left Body Start"
              hasChanged={
                isFront
                  ? hasChanged.left_body_start_front
                  : hasChanged.left_body_start_back
              }
            />
          </Row>
          <Row>
            <Select
              showSearch
              // @ts-ignore
              value={
                isFront
                  ? editedClothingSegmentsData.left_body_start_front
                  : editedClothingSegmentsData.left_body_start_back
              }
              onChange={(value) => {
                if (isFront) {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    left_body_start_front: value,
                  });
                } else {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    left_body_start_back: value,
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
              text="Left Body End"
              hasChanged={
                isFront
                  ? hasChanged.left_body_end_front
                  : hasChanged.left_body_end_back
              }
            />
          </Row>
          <Row>
            <Select
              showSearch
              // @ts-ignore
              value={
                isFront
                  ? editedClothingSegmentsData.left_body_end_front
                  : editedClothingSegmentsData.left_body_end_back
              }
              onChange={(value) => {
                if (isFront) {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    left_body_end_front: value,
                  });
                } else {
                  setEditedClothingSegmentsData({
                    ...editedClothingSegmentsData,
                    left_body_end_back: value,
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
        <FrameInputLabel text="Right Body Fabric Layers" span={12} />
        <FrameInputLabel text="Left Body Fabric Layers" span={12} />
      </Row>
      {/* ----- Shell ----- */}
      <Row gutter={12} style={styles.sectionTitle}>
        <FrameInputLabel
          text="Shell"
          // hasChanged={hasChanged.right_body_start}
          span={12}
        />
        <FrameInputLabel
          text="Shell"
          // hasChanged={hasChanged.right_body_end}
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
          // hasChanged={hasChanged.right_body_start}
          span={12}
        />
        <FrameInputLabel
          text="Lining"
          // hasChanged={hasChanged.right_body_end}
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
          // hasChanged={hasChanged.right_body_start}
          span={12}
        />
        <FrameInputLabel
          text="Fill"
          // hasChanged={hasChanged.right_body_end}
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
          // hasChanged={hasChanged.right_body_start}
          span={12}
        />
        <FrameInputLabel
          text="Interlining"
          // hasChanged={hasChanged.right_body_end}
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

export { FrontBackOfBodySection };
