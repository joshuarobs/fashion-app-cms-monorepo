import React from 'react';
import { Tag } from 'antd';
import { Common } from '../../../strings';

interface TagInProductionProps {
  showShortText?: boolean;
  notClickable?: boolean;
  notSelectable?: boolean;
}

function TagInProduction({
  showShortText = false,
  notClickable,
  notSelectable = false,
}: TagInProductionProps) {
  return (
    <Tag
      color="green"
      style={{
        cursor: notClickable ? 'auto' : 'pointer',
        marginRight: 0,
        userSelect: notSelectable ? 'none' : 'initial',
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
