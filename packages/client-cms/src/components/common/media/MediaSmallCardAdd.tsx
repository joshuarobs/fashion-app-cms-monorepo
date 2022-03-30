import React, { MouseEventHandler } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Row } from 'antd';

interface MediaSmallCardAddProps {
  onClick: MouseEventHandler<HTMLDivElement>;
}

const width = 126;

function MediaSmallCardAdd({ onClick }: MediaSmallCardAddProps) {
  return (
    <div
      style={{
        width,
        height: 160,
        border: '1px dashed #C4C4C4',
        borderRadius: 8,
        cursor: 'pointer',
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.1)',
      }}
      onClick={onClick}
    >
      <Row>
        <PlusOutlined
          style={{
            margin: '0 auto',
            marginTop: 48,
            fontSize: 32,
            opacity: 0.6,
          }}
        />
      </Row>
      <Row>
        <span
          style={{
            margin: '0 auto',
            marginTop: 16,
            userSelect: 'none',
          }}
        >
          Add Media
        </span>
      </Row>
    </div>
  );
}

export { MediaSmallCardAdd };
