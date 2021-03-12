import React from 'react';
import { Layout, Row } from 'antd';
import { UsersTable } from './UsersTable';

const { Content } = Layout;

function PrimaryFrame() {
  return (
    <Content
      style={{
        padding: 24,
        background: '#fff',
        minHeight: 280,
        margin: '0px 12px 0px 12px',
      }}
    >
      <Row>
        <UsersTable />
      </Row>
    </Content>
  );
}

export { PrimaryFrame };
