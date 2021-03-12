import React from 'react';
import { Avatar } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { red } from '@ant-design/colors';

function DangerZonePageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<WarningOutlined />}
      style={{
        backgroundColor: red[2],
      }}
    />
  );
}

export { DangerZonePageIcon };
