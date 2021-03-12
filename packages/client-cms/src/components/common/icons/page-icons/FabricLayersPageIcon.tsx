import React from 'react';
import { Avatar } from 'antd';
import { BlockOutlined } from '@ant-design/icons';
import { magenta } from '@ant-design/colors';

function FabricLayersPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<BlockOutlined />}
      style={{
        backgroundColor: magenta[2],
      }}
    />
  );
}

export { FabricLayersPageIcon };
