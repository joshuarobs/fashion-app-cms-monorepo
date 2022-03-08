import React, { useContext } from 'react';
import {
  AppstoreOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Input, Row, Col, Avatar, Button, Badge, Dropdown } from 'antd';
import { ProfileDropdownMenu } from './ProfileDropdownMenu';
import { UserContext } from '../../UserContext';
import { UserAvatar } from '../common/UserAvatar';

const { Header } = Layout;
const { Search } = Input;

const styles = {
  buttonIcons: {
    margin: 'auto',
    marginLeft: 0,
    marginRight: 0,
    fontSize: 22,
  },
  buttonIcon: {
    margin: 'auto',
    marginLeft: 8,
    marginRight: 0,
  },
};

const headerHeight = 54;

function AppShellHeader() {
  // @ts-ignore
  const { userData, setUserData } = useContext(UserContext);
  console.log('userData:', userData);

  const profileMenuItems = ProfileDropdownMenu(userData);

  const userProfileLetter = userData && userData.name ? userData.name[0] : null;

  return (
    <Header style={{ background: '#fff', padding: 0, height: headerHeight }}>
      <Row
        style={{
          height: headerHeight,
        }}
      >
        <Col span={8} />
        <Col
          span={8}
          style={{
            textAlign: 'center',
            height: 'inherit',
            display: 'flex',
          }}
        >
          <Search
            placeholder="Search"
            onSearch={(value) => console.log(value)}
            style={{
              maxWidth: 400,
              margin: 'auto',
            }}
          />
        </Col>
        <Col
          span={8}
          style={{
            textAlign: 'right',
            height: 'inherit',
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '24px',
          }}
        >
          <Button
            style={styles.buttonIcon}
            shape="circle"
            icon={<AppstoreOutlined />}
          />
          <Button
            style={styles.buttonIcon}
            shape="circle"
            icon={<QuestionCircleOutlined />}
          />
          <Button
            style={styles.buttonIcon}
            shape="circle"
            icon={<BellOutlined />}
          />
          <Badge
            count={0}
            style={{
              marginTop: '14px',
              marginRight: '4px',
            }}
          >
            <div />
          </Badge>
          <Dropdown overlay={profileMenuItems} placement="bottomRight">
            <UserAvatar
              userData={userData}
              overrideStyles={{ marginLeft: 8 }}
            />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}

export { AppShellHeader };
