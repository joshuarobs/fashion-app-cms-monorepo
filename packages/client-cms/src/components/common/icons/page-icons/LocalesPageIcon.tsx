import React from 'react';
import { Avatar } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { geekblue } from '@ant-design/colors';

function LocalesPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<GlobalOutlined />}
      style={{
        backgroundColor: geekblue[3],
      }}
    />
  );
}

export { LocalesPageIcon };
