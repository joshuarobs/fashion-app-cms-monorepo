import React, { useState } from 'react';
import { Button, Input, Modal, Radio, Row, Typography } from 'antd';
import { ItemFilterValuesBool } from '../../framework/itemFilterValuesBool';

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
  name: string | null;
  setName: Function;
  websiteUrl: string;
  setWebsiteUrl: Function;
  isReseller: boolean;
  setIsReseller: Function;
  loading: boolean;
}

function NewEntryModal({
  showModal,
  onCancel,
  onSubmit,
  inputRef,
  name,
  setName,
  websiteUrl,
  setWebsiteUrl,
  isReseller,
  setIsReseller,
  loading,
}: NewEntryModalProps) {
  return (
    <Modal
      visible={showModal}
      title="Add New Company"
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
            onChange={(e) => setName(e.target.value)}
            // @ts-ignore
            onPressEnter={onSubmit}
            autoComplete="new-password"
          />
        </Row>
        <Row style={styles.sectionTitle}>
          <Text strong>Website URL</Text>
        </Row>
        <Row
          style={{
            marginTop: 4,
          }}
        >
          <Input
            // autoFocus
            // ref={inputRef}
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            // @ts-ignore
            onPressEnter={onSubmit}
            autoComplete="new-password"
          />
        </Row>
        <Row style={styles.sectionTitle}>
          <Text strong>Is Reseller?</Text>
        </Row>
        <Row
          style={{
            marginTop: 4,
          }}
        >
          <Radio.Group
            onChange={(e) => setIsReseller(e.target.value)}
            value={isReseller}
          >
            <Radio value={false}>False</Radio>
            <Radio value={true}>True</Radio>
          </Radio.Group>
        </Row>
      </div>
    </Modal>
  );
}

export { NewEntryModal };
