import React from 'react';
import { Avatar } from 'antd';
import { ContainerOutlined } from '@ant-design/icons';
import { grey } from '@ant-design/colors';

function OtherEnumsPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<ContainerOutlined />}
      style={{
        backgroundColor: grey[2],
      }}
    />
  );
}

export { OtherEnumsPageIcon };
