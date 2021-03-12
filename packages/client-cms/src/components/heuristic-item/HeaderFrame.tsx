/**
 * Figma reference:
 * Components/Item/Header Frame
 */

import React from 'react';
import { PageHeader, Typography } from 'antd';

const { Text } = Typography;

interface HeaderFrameProps {
  data: object | undefined;
}

function HeaderFrame({ data }: HeaderFrameProps) {
  // @ts-ignore
  const { name, id } = data;

  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        backgroundColor: '#fff',
      }}
      title={name ? name : <Text type="danger">No set name!</Text>}
      avatar={{
        src:
          'https://pm1.narvii.com/6923/24e9471327fea2908547acc8593d945e06b7e1e9r1-620-435v2_128.jpg',
        shape: 'square',
      }}
      subTitle={'id: ' + id}
    />
  );
}

export { HeaderFrame };
