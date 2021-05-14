import React from 'react';
import { Tag } from 'antd';
import { Common } from '../../../strings';

interface TagInRetirementProps {
  showShortText?: boolean;
  notClickable?: boolean;
  notSelectable?: boolean;
}

function TagInRetirement({
  showShortText = false,
  notClickable,
  notSelectable = false,
}: TagInRetirementProps) {
  return (
    <Tag
      style={{
        cursor: notClickable ? 'auto' : 'pointer',
        marginRight: 0,
        userSelect: notSelectable ? 'none' : 'initial',
      }}
    >
      <strong>
        {showShortText
          ? Common.State_Related.Retired_Upper
          : Common.State_Related.Retired_Upper}
      </strong>
    </Tag>
  );
}

export { TagInRetirement };
