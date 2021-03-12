import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

function RevisionsFrame() {
  return (
    <Content
      style={{
        padding: 16,
        background: '#fff',
        minHeight: 280,
        maxWidth: 412,
      }}
    ></Content>
  );
}

export { RevisionsFrame };
