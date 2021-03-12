import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Tooltip, Typography } from 'antd';

const { Text } = Typography;

interface DateLastUpdatedAgo {
  text: string;
}

function DateLastUpdatedAgo({ text }: DateLastUpdatedAgo) {
  return (
    <Tooltip title={format(new Date(text), 'yyyy-mm-dd (HH:mm:ss)')}>
      <Text
        type="secondary"
        style={{
          borderBottom: '1px dotted #AAA',
          paddingBottom: 2,
          // marginRight: 16
        }}
      >
        {`${formatDistanceToNow(new Date(text))} ago`}
      </Text>
    </Tooltip>
  );
}

export { DateLastUpdatedAgo };
