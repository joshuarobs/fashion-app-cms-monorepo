import React from 'react';
import { Col, Typography } from 'antd';
import { Edit_Related } from '../../../strings';

const { Text } = Typography;

interface FrameInputLabelProps {
  text: any;
  span?: number;
  hasChanged?: boolean;
  noColumn?: boolean;
  disabled?: boolean;
}

function FrameInputLabel({
  text,
  span,
  hasChanged,
  noColumn,
  disabled,
}: FrameInputLabelProps) {
  const textElement = (
    <Text mark={hasChanged} strong={hasChanged} disabled={disabled}>
      {text}
      {hasChanged && Edit_Related.Asterisks_2}
    </Text>
  );

  if (noColumn) {
    return textElement;
  } else {
    return <Col span={span}>{textElement}</Col>;
  }
}

export { FrameInputLabel };
