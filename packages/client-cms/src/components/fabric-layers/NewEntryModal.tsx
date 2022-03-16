import React, { useState } from 'react';
import { Button, Input, Modal, Radio, Row, Typography } from 'antd';
import { ItemFilterValuesBool } from '../../framework/itemFilterValuesBool';
import { FabricLayerType } from '@joshuarobs/clothing-framework';

const { Text } = Typography;

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
          <Text strong>Name</Text>
        </Row>
        <Row
          style={{
            marginTop: 4,
          }}
        >
          <Input
            autoFocus
            ref={inputRef}
            // @ts-ignore
            value={name}
            onChange={(e) => setNotes(e.target.value)}
            // @ts-ignore
            onPressEnter={onSubmit}
            autoComplete="new-password"
          />
        </Row>
        <Row style={styles.sectionTitle}>
          <Text strong>Website URL</Text>
        </Row>
      </div>
    </Modal>
  );
}

export { NewEntryModal };
