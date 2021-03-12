import React from 'react';
import { Col, Typography } from 'antd';
import { HeaderTabLinkCountBadge } from '../HeaderTabLinkCountBadge';
import { Edit_Related } from '../../../strings';

const { Title } = Typography;

interface FrameTitleProps {
  text: any;
  count?: number;
  span?: number;
  noMargin?: boolean;
  hasChanged?: boolean;
}

function FrameTitle({
  text,
  count = 0,
  span = 16,
  noMargin,
  hasChanged,
}: FrameTitleProps) {
  // console.log('count:', count);
  const titleStyle = {};
  if (noMargin) {
    // @ts-ignore
    titleStyle.margin = 0;
  }
  return (
    <Col
      span={span}
      style={{
        display: 'inline-flex',
      }}
    >
      <Title style={titleStyle} level={4} mark={hasChanged}>
        {text}
        {hasChanged && Edit_Related.Asterisks_2}
      </Title>
      {count > 0 && <HeaderTabLinkCountBadge count={count} adjustY={4} />}
    </Col>
  );
}

export { FrameTitle };
