import React from 'react';
import { Avatar } from 'antd';
import { SkinOutlined } from '@ant-design/icons';
import { geekblue } from '@ant-design/colors';

function HeuristicItemsPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<SkinOutlined />}
      style={{
        backgroundColor: geekblue[2],
      }}
    />
  );
}

export { HeuristicItemsPageIcon };
