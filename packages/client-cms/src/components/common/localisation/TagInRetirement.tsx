import React from 'react';
import { Tag } from 'antd';
import { Common } from '../../../strings';

interface TagInRetirementProps {
  showShortText?: boolean;
  notClickable?: boolean;
}

function TagInRetirement({
  showShortText = false,
  notClickable,
}: TagInRetirementProps) {
  return (
    <Tag
      style={{
        cursor: notClickable ? 'auto' : 'pointer',
        marginRight: 0,
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
