import React from 'react';
import { Tag } from 'antd';
import { Common } from '../../../strings';

interface TagInReview {
  showShortText?: boolean;
  notClickable?: boolean;
}

function TagInReview({ showShortText = false, notClickable }: TagInReview) {
  return (
    <Tag
      color="purple"
      style={{
        cursor: notClickable ? 'auto' : 'pointer',
        marginRight: 0,
      }}
    >
      <strong>
        {showShortText
          ? Common.State_Related.Rev_Short
          : Common.State_Related.Review_Upper}
      </strong>
    </Tag>
  );
}

export { TagInReview };
