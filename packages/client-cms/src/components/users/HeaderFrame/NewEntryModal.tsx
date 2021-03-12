import React from 'react';
import { Button, Input, Modal, Row, Typography } from 'antd';

const { Text } = Typography;

const styles = {
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
};

interface NewEntryModalProps {
  showModal: boolean;
  onCancel: Function;
  onSubmit: Function;
  inputRef: any;
  name?: string;
  setName: Function;
  loading: boolean;
}

function NewEntryModal({
  showModal,
  onCancel,
  onSubmit,
  inputRef,
  name,
  setName,
  loading,
}: NewEntryModalProps) {
  return (
    <Modal
      visible={showModal}
      title="Add New Clothing Shell"
      // @ts-ignore
      onCancel={onCancel}
      // @ts-ignore
      onOk={onSubmit}
      footer={[
        // @ts-ignore
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          // @ts-ignore
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            // @ts-ignore
            onPressEnter={onSubmit}
            autoComplete="new-password"
          />
        </Row>
      </div>
    </Modal>
  );
}

export { NewEntryModal };
