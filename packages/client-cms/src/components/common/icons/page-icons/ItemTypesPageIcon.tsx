import React from 'react';
import { Avatar } from 'antd';
import { SkinOutlined } from '@ant-design/icons';
import { green } from '@ant-design/colors';

function ItemTypesPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<SkinOutlined />}
      style={{
        backgroundColor: green[3],
      }}
    />
  );
}

export { ItemTypesPageIcon };
