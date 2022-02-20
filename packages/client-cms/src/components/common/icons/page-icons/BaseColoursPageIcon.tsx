import React from 'react';
import { Avatar } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';
import { red } from '@ant-design/colors';

function BaseColoursPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<BgColorsOutlined />}
      style={{
        backgroundColor: red[3],
      }}
    />
  );
}

export { BaseColoursPageIcon };
