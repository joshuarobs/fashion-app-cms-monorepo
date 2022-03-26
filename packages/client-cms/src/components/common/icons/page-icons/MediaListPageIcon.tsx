import React from 'react';
import { Avatar } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { magenta } from '@ant-design/colors';

function MediaListPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<PictureOutlined />}
      style={{
        backgroundColor: magenta[2],
      }}
    />
  );
}

export { MediaListPageIcon };
