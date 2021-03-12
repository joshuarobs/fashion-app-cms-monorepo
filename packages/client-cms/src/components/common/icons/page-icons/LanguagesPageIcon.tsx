import React from 'react';
import { Avatar } from 'antd';
import { TranslationOutlined } from '@ant-design/icons';
import { orange } from '@ant-design/colors';

function LanguagesPageIcon() {
  return (
    <Avatar
      shape="square"
      icon={<TranslationOutlined />}
      style={{
        backgroundColor: orange[3],
      }}
    />
  );
}

export { LanguagesPageIcon };
