import React from 'react';
import { Avatar } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';

function CompaniesPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<ShopOutlined />}
      style={{
        backgroundColor: blue[2],
      }}
    />
  );
}

export { CompaniesPageIcon };
