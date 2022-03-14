import React from 'react';
import { Avatar } from 'antd';
import { ExperimentOutlined } from '@ant-design/icons';
import { grey } from '@ant-design/colors';

function ColourMixPartsPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<ExperimentOutlined />}
      style={{
        backgroundColor: grey[2],
      }}
    />
  );
}

export { ColourMixPartsPageIcon };
