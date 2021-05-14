import React from 'react';
import { Tag } from 'antd';
import { Common } from '../../../strings';

interface TagInDevelopmentProps {
  showShortText?: boolean;
  notClickable?: boolean;
  notSelectable?: boolean;
}

function TagInDevelopment({
  showShortText = false,
  notClickable,
  notSelectable = false,
}: TagInDevelopmentProps) {
  return (
    <Tag
      color="orange"
      style={{
        cursor: notClickable ? 'auto' : 'pointer',
        marginRight: 0,
        userSelect: notSelectable ? 'none' : 'initial',
      }}
    >
      <strong>
        {showShortText
          ? Common.State_Related.Dev_Short
          : Common.State_Related.Development_Upper}
      </strong>
    </Tag>
  );
}

export { TagInDevelopment };
