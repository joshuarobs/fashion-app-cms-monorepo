import React, { useState } from 'react';
import {
  Button,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Col,
  Typography,
  Select,
  Divider,
  Tooltip,
} from 'antd';
import { ItemFilterValuesBool } from '../../../framework/itemFilterValuesBool';
import { FabricLayerType } from '@joshuarobs/clothing-framework';
import { AddedColourMixPartsTable } from './AddedColourMixPartsTable';
import { ExperimentOutlined, WarningFilled } from '@ant-design/icons';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Get_Colour_Mix_Parts_Multiple_By_Ids } from '../../../queries/colour_mix_parts/getColourMixPartsMultipleByIds';
import _ from 'lodash';
import { ErrorTooltipContent } from '../../common/ErrorTooltipContent';
import { red } from '@ant-design/colors';
import { TotalPercentRow } from './TotalPercentRow';
import { Fabric_Layer_Details_Frame } from '../../../strings';

const { Option } = Select;
const { Text, Title } = Typography;

const styles = {
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
  radioStyle: {
    display: 'block',
    height: '32px',
    lineHeight: '32px',
  },
};

const VALUES = Array.from(ItemFilterValuesBool.Map.values());

interface NewEntryModalProps {
  showModal: boolean;
  onCancel: (e: React.MouseEvent) => void;
  onSubmit: (e: React.MouseEvent) => void;
  inputRef: any;
  fabricLayerType: FabricLayerType;
  setFabricLayerType: Function;
  colourPattern: string;
  setColourPattern: Function;
  notes: string;
  setNotes: Function;
  thickness: number;
  setThickness: Function;
  insulationPoints: number;
  setInsulationPoints: Function;
  density: number;
  setDensity: Function;
  permeability: number;
  setPermeability: Function;
  colourMixParts: string[];
  setColourMixParts: Function;
  onClickSelectColourMixPartsModal: (e: React.MouseEvent) => void;
  loading: boolean;
  colourMixPartsData: any;
  loadingSelectColours: boolean;
}

function NewEntryModal({
  showModal,
  onCancel,
  onSubmit,
  inputRef,
  fabricLayerType,
  setFabricLayerType,
  colourPattern,
  setColourPattern,
  notes,
  setNotes,
  thickness,
  setThickness,
  insulationPoints,
  setInsulationPoints,
  density,
  setDensity,
  permeability,
  setPermeability,
  colourMixParts,
  setColourMixParts,
  onClickSelectColourMixPartsModal,
  loading,
  colourMixPartsData = {
    getColourMixPartsMultipleByIds: [],
  },
  loadingSelectColours,
}: NewEntryModalProps) {
  const addButtonDisabled = false;

  // const {
  //   loading: loadingGetSetColours,
  //   error: errorGetSetColours,
  //   data: dataGetSetColours,
  // } = useLazyQuery(Get_Colour_Mix_Parts_Multiple_By_Ids, {
  //   variables: {
  //     ids: colourMixParts,
  //   },
  // });

  const actualColourMixPartsData =
    colourMixPartsData.getColourMixPartsMultipleByIds;
  console.error('actualColourMixPartsData:', actualColourMixPartsData);

  let totalPercent = 0;
  // @ts-ignore
  actualColourMixPartsData.forEach(({ percent }) => (totalPercent += percent));

  const percentIsNot100 = totalPercent !== 1;
  const totalPercentError =
    actualColourMixPartsData.length > 0 && percentIsNot100;

  return (
    <Modal
      visible={showModal}
      title="Add New Fabric Layer"
      onCancel={onCancel}
      onOk={onSubmit}
      style={{
        minWidth: 996,
        // Default values for a MacBook Pro 16
        top: 16,
      }}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={onSubmit}
          disabled={totalPercentError}
        >
          Submit
        </Button>,
      ]}
    >
      <div
        style={{
          marginLeft: 24,
          marginRight: 24,
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <Row style={styles.sectionTitle}>
          <Title level={5} type="secondary">
            General Information
          </Title>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Text strong>Fabric Layer Type</Text>
          </Col>
          <Col span={6}>
            <Text strong>Colour Pattern</Text>
          </Col>
          <Col span={12}>
            <Text strong>Notes</Text>
          </Col>
        </Row>
        <Row
          gutter={16}
          style={{
            marginTop: 4,
          }}
        >
          <Col span={6}>
            <Select
              defaultValue={FabricLayerType.Shell}
              style={{ width: '100%' }}
              // @ts-ignore
              onChange={(value) => setFabricLayerType(value)}
            >
              <Option value={FabricLayerType.Shell}>Shell</Option>
              <Option value={FabricLayerType.Fill}>Fill</Option>
              <Option value={FabricLayerType.Interlining}>Lining</Option>
              <Option value={FabricLayerType.Lining}>Interlining</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              defaultValue="solid"
              style={{ width: '100%' }}
              // onChange={(e) => setColourPattern(e.target.value)}
            >
              <Option value="solid">Solid</Option>
            </Select>
          </Col>
          <Col span={12}>
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Col>
        </Row>
        <Divider />
        <Row style={styles.sectionTitle}>
          <Title level={5} type="secondary">
            Thermal Attributes
          </Title>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Text strong>Thickness (mm)</Text>
          </Col>
          <Col span={6}>
            <Text strong>Insulation Points</Text>
          </Col>
          <Col span={6}>
            <Text strong>Density (?)</Text>
          </Col>
          <Col span={6}>
            <Text strong>Permeability</Text>
          </Col>
        </Row>
        <Row
          gutter={16}
          style={{
            marginTop: 4,
          }}
        >
          <Col span={6}>
            <InputNumber
              value={thickness}
              min={0}
              max={10000}
              step={0.1}
              onChange={(value) => setThickness(value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={6}>
            <InputNumber
              value={insulationPoints}
              min={0}
              max={1000}
              step={1}
              precision={0}
              onChange={(value) => setInsulationPoints(value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={6}>
            <InputNumber
              value={density}
              min={0}
              max={10000}
              step={0.1}
              onChange={(value) => setDensity(value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={6}>
            <InputNumber
              value={permeability}
              min={0}
              max={10000}
              step={0.1}
              onChange={(value) => setPermeability(value)}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
        <Divider />
        <Row style={styles.sectionTitle}>
          <Title level={5} type="secondary">
            Colour Mix Parts
          </Title>
        </Row>
        <Row>
          <AddedColourMixPartsTable
            data={actualColourMixPartsData}
            loading={loadingSelectColours}
            isPopup
          />
        </Row>
        <Row style={styles.sectionTitle}>
          <TotalPercentRow
            totalPercent={totalPercent}
            totalPercentError={totalPercentError}
          />
        </Row>
        <Row style={styles.sectionTitle}>
          <Button
            style={{ width: '100%' }}
            icon={<ExperimentOutlined />}
            onClick={onClickSelectColourMixPartsModal}
          >
            {Fabric_Layer_Details_Frame.Select_Colour_Mix_Parts}
          </Button>
        </Row>
      </div>
    </Modal>
  );
}

export { NewEntryModal };
