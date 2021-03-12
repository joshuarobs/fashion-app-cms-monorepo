import React from 'react';
import { Avatar } from 'antd';
import { LayoutOutlined } from '@ant-design/icons';
import { purple } from '@ant-design/colors';

function FabricTypesPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<LayoutOutlined />}
      style={{
        backgroundColor: purple[3],
      }}
    />
  );
}

export { FabricTypesPageIcon };
