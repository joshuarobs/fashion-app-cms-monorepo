import React from 'react';
import { Avatar } from 'antd';
import { SkinOutlined } from '@ant-design/icons';
import { red } from '@ant-design/colors';

function ItemsPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<SkinOutlined />}
      style={{
        backgroundColor: red[2],
      }}
    />
  );
}

export { ItemsPageIcon };
