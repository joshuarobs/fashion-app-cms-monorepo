import React from 'react';
import { Layout } from 'antd';
import { ClothingShellMoreDetails } from './ClothingShellOverviewFrame/ClothingShellMoreDetails';

const { Content } = Layout;

function ClothingShellDetailsMoreFrame() {
  return (
    <Content
      style={{
        minHeight: 280,
        maxWidth: 412,
        marginBottom: 24,
      }}
    >
      <div
        style={{
          padding: 16,
          background: '#fff',
          borderRadius: 4,
        }}
      >
        <ClothingShellMoreDetails
          currentDefaultShellLayerId={null}
          currentDefaultLiningLayerId={null}
        />
      </div>
    </Content>
  );
}

export { ClothingShellDetailsMoreFrame };
