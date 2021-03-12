import React, { useState } from 'react';
import { Alert, Button, Input, Modal, Radio, Row, Typography } from 'antd';
import { Common } from '../../../strings';

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

interface ConfirmDeleteModalProps {
  title: string;
  targetText: string;
  messages: any[];
  deleteText?: string;
  showModal: boolean;
  onCancel: Function;
  onSubmit: Function;
  inputRef: any;
}

function ConfirmDeleteModal({
  title,
  targetText = '',
  messages = [],
  deleteText = Common.Delete,
  showModal,
  onCancel,
  onSubmit,
  inputRef,
}: ConfirmDeleteModalProps) {
  // const [text, setText] = useState("");
  // Shortcut so that you don't have to type the name
  // Be sure to delete this in production
  const [text, setText] = useState(targetText);

  return (
    <Modal
      visible={showModal}
      title={title}
      // @ts-ignore
      onCancel={onCancel}
      // @ts-ignore
      onOk={onSubmit}
      footer={[
        // @ts-ignore
        <Button key="back" onClick={onCancel}>
          {Common.Cancel}
        </Button>,
        <Button
          key="submit"
          type="primary"
          // @ts-ignore
          onClick={onSubmit}
          disabled={text !== targetText}
          danger
        >
          {deleteText}
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
        {messages.map((message, index) => {
          return (
            <Alert
              message={message.message}
              type={message.type}
              showIcon
              style={{
                marginTop: index > 0 ? 12 : 0,
              }}
              key={index}
            />
          );
        })}
        <Row
          style={{
            marginTop: 12,
          }}
        >
          <Input
            autoFocus
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            // @ts-ignore
            onPressEnter={onSubmit}
            autoComplete="new-password"
            placeholder={targetText}
          />
        </Row>
      </div>
    </Modal>
  );
}

export { ConfirmDeleteModal };
