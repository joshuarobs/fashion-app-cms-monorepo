import React from 'react';
import { Tag } from 'antd';
import { Common } from '../../../strings';

interface TagInReviewProps {
  showShortText?: boolean;
  notClickable?: boolean;
  notSelectable?: boolean;
}

function TagInReview({
  showShortText = false,
  notClickable,
  notSelectable = false,
}: TagInReviewProps) {
  return (
    <Tag
      color="purple"
      style={{
        cursor: notClickable ? 'auto' : 'pointer',
        marginRight: 0,
        userSelect: notSelectable ? 'none' : 'initial',
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
