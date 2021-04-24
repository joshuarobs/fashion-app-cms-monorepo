import React, { useState } from 'react';
import { Button, Input, Modal, Radio, Row, Typography, Alert } from 'antd';
import { ItemFilterValuesItemType } from '../../../framework/itemFilterValuesItemType';
import { ItemType } from '@joshuarobs/clothing-framework/build/enums';
import { Common } from '../../../strings';
import { NewEntryModalProps } from './NewEntryModalProps';

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

// console.log('ItemFilterValuesItemType.Map:', ItemFilterValuesItemType.Map);
const VALUES = Array.from(ItemFilterValuesItemType.Map.values());

function NewEntryModalForItemRelatedEntry({
  title,
  showModal,
  onCancel,
  onSubmit,
  inputRef,
  name,
  setName,
  itemType,
  setItemType,
  loading,
  showTestingPurposeWarning,
}: NewEntryModalProps) {
  return (
    <Modal
      visible={showModal}
      title={title}
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
          disabled={!name}
        >
          Add
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
        {showTestingPurposeWarning && (
          <Alert
            message={Common.New_Item_Related.Warning_Usage}
            type="warning"
            showIcon
          />
        )}
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
            onChange={(e) => setName(e.target.value)}
            // @ts-ignore
            onPressEnter={onSubmit}
            autoComplete="new-password"
          />
        </Row>
        <Row style={styles.sectionTitle}>
          <Text strong>Item Type</Text>
        </Row>
        <Row
          style={{
            marginTop: 4,
            userSelect: 'none',
          }}
        >
          <Radio.Group
            onChange={(e) => setItemType(e.target.value)}
            value={itemType}
          >
            {VALUES.map((value) => {
              return (
                <Radio
                  style={styles.radioStyle}
                  value={value.id}
                  key={value.id}
                >
                  {value.name}
                </Radio>
              );
            })}
          </Radio.Group>
        </Row>
      </div>
    </Modal>
  );
}

export { NewEntryModalForItemRelatedEntry };
// export type { NewEntryModalProps };
