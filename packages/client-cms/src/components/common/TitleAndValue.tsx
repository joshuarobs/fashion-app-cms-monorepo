import React, { useState } from 'react';
import { Typography, Tooltip, Row, Button } from 'antd';
import dayjs from 'dayjs';

const { Text } = Typography;

const cssStyles = {
  toolTip: {
    borderBottom: '1px dotted #AAA',
    paddingBottom: 2,
  },
};

interface TitleAndValueProps {
  title: string;
  value: any;
  isDate?: boolean;
  isCode?: boolean;
  isRevealCode?: boolean;
}

function TitleAndValue({
  title,
  value,
  isDate,
  isCode,
  isRevealCode,
}: TitleAndValueProps) {
  const [reveal, setReveal] = useState(false);

  let element = value;
  if (isDate) {
    element = (
      <Tooltip title={dayjs(value).format('YYYY-MM-DD' + ' (HH:mm:ss)')}>
        <span style={cssStyles.toolTip}>{dayjs().to(dayjs(value))}</span>
      </Tooltip>
    );
  } else if (isCode) {
    element = <Text code>{value}</Text>;
  } else if (isRevealCode) {
    // element = <Text code>{value}</Text>;
    if (!reveal) {
      element = (
        <Button size="small" onClick={() => setReveal(true)}>
          Show
        </Button>
      );
    } else {
      element = <Text code>{value}</Text>;
    }
  }
  return (
    <div>
      <Row>
        <Text strong>{title}</Text>
      </Row>
      <Row>{element}</Row>
    </div>
  );
}

export { TitleAndValue };
