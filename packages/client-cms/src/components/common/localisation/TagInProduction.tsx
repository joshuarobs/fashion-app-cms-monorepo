import React from 'react';
import { Tag } from 'antd';
import { Common } from '../../../strings';

interface TagInProductionProps {
  showShortText?: boolean;
  notClickable?: boolean;
}

function TagInProduction({
  showShortText = false,
  notClickable,
}: TagInProductionProps) {
  return (
    <Tag
      color="green"
      style={{
        cursor: notClickable ? 'auto' : 'pointer',
        marginRight: 0,
      }}
    >
      <strong>
        {showShortText
          ? Common.State_Related.Prod_Short
          : Common.State_Related.Production_Upper}
      </strong>
    </Tag>
  );
}

export { TagInProduction };
