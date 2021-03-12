import React from 'react';
import { Avatar } from 'antd';
import { GoldOutlined } from '@ant-design/icons';
import { lime } from '@ant-design/colors';

function MaterialsPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<GoldOutlined />}
      style={{
        backgroundColor: lime[4],
      }}
    />
  );
}

export { MaterialsPageIcon };
