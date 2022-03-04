import React, { useContext } from 'react';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Row, Typography } from 'antd';
import { UserContext } from '../../UserContext';

const { Text, Link } = Typography;

const styles = {
  buttonIcon: {
    margin: 'auto',
    marginLeft: 8,
    marginRight: 0,
  },
};

function ProfileDropdownMenu(userData: any) {
  console.log('ProfileDropdownMenu#userData:', userData);
  // @ts-ignore
  // const { userData } = useContext(UserContext);

  const userProfileLetter = userData && userData.name ? userData.name[0] : null;

  return (
    <Menu style={{ minWidth: 200 }}>
      <Menu.Item key="1">
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
              icon={!userProfileLetter && <UserOutlined />}
            >
              {userProfileLetter}
            </Avatar>
          </Row>
          <Row
            style={{
              justifyContent: 'center',
            }}
          >
            <Text>{userData && userData.name}</Text>
          </Row>
          <Row
            style={{
              justifyContent: 'center',
            }}
          >
            <Text>{userData && userData.email}</Text>
          </Row>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<SettingOutlined />} key="2">
        Settings
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} key="3">
        <a href="/logout">Logout</a>
      </Menu.Item>
    </Menu>
  );
}

export { ProfileDropdownMenu };
