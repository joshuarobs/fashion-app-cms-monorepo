import React from 'react';
import { Empty, Button, Typography, Tooltip } from 'antd';
import { WarningFilled } from '@ant-design/icons';
import { red } from '@ant-design/colors';

const { Title } = Typography;

interface ErrorPleaseFixThisProps {
  message: JSX.Element | string;
  buttonText?: string;
  onClick: Function;
  isDelete?: boolean;
}

function ErrorPleaseFixThis({
  message,
  buttonText = 'Delete',
  onClick,
  isDelete = true,
}: ErrorPleaseFixThisProps) {
  return (
    <Empty
      style={{
        padding: 16,
        margin: 'auto',
      }}
      description={
        <div>
          <Title level={4}>Error!</Title>
          <WarningFilled
            style={{
              color: red[3],
              marginRight: 6,
            }}
          />
          <span>{message}</span>
        </div>
      }
    >
      {/** @ts-ignore **/}
      <Button type="primary" danger={isDelete} onClick={onClick}>
        {buttonText}
      </Button>
    </Empty>
  );
}

export { ErrorPleaseFixThis };
