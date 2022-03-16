import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Radio,
  Row,
  Col,
  Typography,
  Select,
  Divider,
} from 'antd';
import { ItemFilterValuesBool } from '../../framework/itemFilterValuesBool';
import { FabricLayerType } from '@joshuarobs/clothing-framework';

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
  loading: boolean;
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
  loading,
}: NewEntryModalProps) {
  const addButtonDisabled = false;

  return (
    <Modal
      visible={showModal}
      title="Add New Fabric Layer"
      onCancel={onCancel}
      onOk={onSubmit}
      style={{
        minWidth: 996,
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
          disabled={addButtonDisabled}
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
              defaultValue="lucy"
              style={{ width: '100%' }}
              // @ts-ignore
              onChange={(e) => setFabricLayerType(e.target.value)}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
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
            <Input
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Input
              value={insulationPoints}
              onChange={(e) => setInsulationPoints(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Input
              value={density}
              onChange={(e) => setDensity(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Input
              value={permeability}
              onChange={(e) => setPermeability(e.target.value)}
            />
          </Col>
        </Row>
        <Divider />
        <Row style={styles.sectionTitle}>
          <Title level={5} type="secondary">
            Colour Mix Parts
          </Title>
        </Row>
      </div>
    </Modal>
  );
}

export { NewEntryModal };
