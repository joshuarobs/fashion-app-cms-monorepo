import React from 'react';
import { Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';

const { Text } = Typography;

interface DateLastUpdatedAgoProps {
  text: string;
}

function DateLastUpdatedAgo({ text }: DateLastUpdatedAgoProps) {
  return (
    <Tooltip title={dayjs(text).format('YYYY-MM-DD' + ' (HH:mm:ss)')}>
      <Text
        type="secondary"
        style={{
          borderBottom: '1px dotted #AAA',
          paddingBottom: 2,
          // marginRight: 16
        }}
      >
        {/*{`${formatDistanceToNow(new Date(text))} ago`}*/}
        {dayjs().to(dayjs(text))}
      </Text>
    </Tooltip>
  );
}

export { DateLastUpdatedAgo };
