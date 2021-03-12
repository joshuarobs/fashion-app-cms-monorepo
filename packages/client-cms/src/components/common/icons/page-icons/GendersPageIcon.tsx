import React from 'react';
import { Avatar } from 'antd';
import { ManOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';

function GendersPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<ManOutlined />}
      style={{
        backgroundColor: blue[3],
      }}
    />
  );
}

export { GendersPageIcon };
