import React from 'react';
import { Avatar } from 'antd';
import { ClusterOutlined } from '@ant-design/icons';
import { gold } from '@ant-design/colors';

function BodySegmentsPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<ClusterOutlined />}
      style={{
        backgroundColor: gold[3],
      }}
    />
  );
}

export { BodySegmentsPageIcon };
