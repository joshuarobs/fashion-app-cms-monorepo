/**
 * Figma reference:
 * Components/Framework/Header Frame
 */

import React from 'react';
import { PageHeader } from 'antd';
import { App_Shell, Table_Descriptions } from '../../../strings';

function HeaderFrame() {
  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        backgroundColor: '#fff',
      }}
      title={App_Shell.Sidebar.Pages.Other_Enums}
    >
      {Table_Descriptions.Other_Enums}
    </PageHeader>
  );
}

export { HeaderFrame };
