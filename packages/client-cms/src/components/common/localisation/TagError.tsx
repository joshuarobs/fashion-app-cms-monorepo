import React from 'react';
import { Tag } from 'antd';
import { Common } from '../../../strings';

interface TagErrorProps {
  showShortText?: boolean;
  notClickable?: boolean;
}

function TagError({ showShortText = false, notClickable }: TagErrorProps) {
  return (
    <Tag
      color="red"
      style={{
        cursor: notClickable ? 'auto' : 'pointer',
        marginRight: 0,
      }}
    >
      <strong>{Common.State_Related.Error}</strong>
    </Tag>
  );
}

export { TagError };
