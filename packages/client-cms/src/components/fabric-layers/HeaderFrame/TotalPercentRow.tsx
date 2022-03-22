import React from 'react';
import _ from 'lodash';
import { Tooltip, Typography } from 'antd';
import { WarningFilled } from '@ant-design/icons';
import { red } from '@ant-design/colors';

const { Text } = Typography;

interface TotalPercentRowProps {
  totalPercentError: boolean;
  totalPercent: number;
}

function TotalPercentRow({
  totalPercentError,
  totalPercent,
}: TotalPercentRowProps) {
  return totalPercentError ? (
    <>
      <Text strong type="danger">
        Total Percent: {_.round(totalPercent * 100, 2)}%
      </Text>
      <Tooltip title="The total percent must be equal to 100%.">
        <WarningFilled
          style={{
            color: red[3],
            marginRight: 1,
            padding: 4,
            paddingRight: 8,
          }}
        />
      </Tooltip>
    </>
  ) : (
    <Text>Total Percent: {_.round(totalPercent * 100, 2)}%</Text>
  );
}

export { TotalPercentRow };
