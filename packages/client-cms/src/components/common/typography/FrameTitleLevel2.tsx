import React from 'react';
import { Col, Typography } from 'antd';
import { HeaderTabLinkCountBadge } from '../HeaderTabLinkCountBadge';

const { Title } = Typography;

interface FrameTitleLevel2Props {
  text: string;
  count?: number;
  span?: number;
  noMargin?: boolean;
  typeIsSecondary?: boolean;
}

function FrameTitleLevel2({
  text,
  count,
  span = 16,
  noMargin,
  typeIsSecondary,
}: FrameTitleLevel2Props) {
  // console.log("count:", count);
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
      {typeIsSecondary ? (
        <Title style={titleStyle} level={5} type="secondary">
          {text}
        </Title>
      ) : (
        <Title style={titleStyle} level={5}>
          {text}
        </Title>
      )}
      {count && count > 0 && (
        <HeaderTabLinkCountBadge count={count} adjustY={4} />
      )}
    </Col>
  );
}

export { FrameTitleLevel2 };
