import React from 'react';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Row, Typography } from 'antd';

const { Text, Link } = Typography;

const styles = {
  buttonIcon: {
    margin: 'auto',
    marginLeft: 8,
    marginRight: 0,
  },
};

function ProfileDropdownMenu() {
  return (
    <Menu style={{ minWidth: 200 }}>
      <Menu.Item>
        <div style={{ textAlign: 'center' }}>
          <Row
            style={{
              justifyContent: 'center',
            }}
          >
            <Avatar
              style={{
                ...styles.buttonIcon,
                fontSize: 14,
                cursor: 'pointer',
              }}
              icon={<UserOutlined />}
            />
          </Row>
          <Row
            style={{
              justifyContent: 'center',
            }}
          >
            <Text>John Doe</Text>
          </Row>
          <Row
            style={{
              justifyContent: 'center',
            }}
          >
            <Text>johndoe@gmail.com</Text>
          </Row>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<SettingOutlined />}>Settings</Menu.Item>
      <Menu.Item icon={<LogoutOutlined />}>
        <a href="/logout">Logout</a>
      </Menu.Item>
    </Menu>
  );
}

export { ProfileDropdownMenu };
