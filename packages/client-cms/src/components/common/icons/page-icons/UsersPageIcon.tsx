import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { orange } from '@ant-design/colors';

function UsersPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<UserOutlined />}
      style={{
        backgroundColor: orange[3],
      }}
    />
  );
}

export { UsersPageIcon };
