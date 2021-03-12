import React from 'react';
import { red } from '@ant-design/colors';
import { WarningFilled } from '@ant-design/icons';
import { Badge, Tooltip } from 'antd';
import { ErrorTooltipContent } from '../ErrorTooltipContent';
import { QuickErrorSetMessagesItemsPage } from '../../../utils/quick-error-gen/QuickErrorSetMessagesItemsPage';

interface RedWarningFilledIconProps {
  itemsPageErrors?: QuickErrorSetMessagesItemsPage;
  style?: any;
  numberOfErrors?: number;
}

function RedWarningFilledIcon({
  itemsPageErrors,
  style,
}: // numberOfErrors,
RedWarningFilledIconProps) {
  return (
    <Tooltip title={<ErrorTooltipContent itemsPageErrors={itemsPageErrors} />}>
      <WarningFilled
        style={{
          color: red[3],
          marginRight: 1,
          padding: 4,
          paddingRight: 8,
          ...style,
        }}
      />
    </Tooltip>
  );
}

export { RedWarningFilledIcon };
