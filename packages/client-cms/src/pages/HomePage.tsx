import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

function HomePage() {
  return (
    <>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 280,
        }}
      >
        Home Page
      </Content>
    </>
  );
}

export { HomePage };
