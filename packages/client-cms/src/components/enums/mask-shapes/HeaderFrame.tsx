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
      title={App_Shell.Sidebar.Pages.Mask_Shapes}
    >
      {Table_Descriptions.Mask_Shapes}
    </PageHeader>
  );
}

export { HeaderFrame };
