import React from 'react';
import { Button, Input, Modal, Row, Typography } from 'antd';
import { Popup_New_Entry } from '../../../strings';

const { Text } = Typography;

const styles = {
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
};

interface NewEntryModalProps {
  showModal: boolean;
  onCancel: React.MouseEventHandler;
  onSubmit: any;
  inputRef: any;
  name: string | null;
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
      title={Popup_New_Entry.Add_New_Clothing_Shell}
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
            onPressEnter={onSubmit}
            autoComplete="new-password"
          />
        </Row>
      </div>
    </Modal>
  );
}

export { NewEntryModal };
