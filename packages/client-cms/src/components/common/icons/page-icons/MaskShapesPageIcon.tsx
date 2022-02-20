import React from 'react';
import { Avatar } from 'antd';
import { GatewayOutlined } from '@ant-design/icons';
import { grey } from '@ant-design/colors';

function MaskShapesPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<GatewayOutlined />}
      style={{
        backgroundColor: grey[2],
      }}
    />
  );
}

export { MaskShapesPageIcon };
