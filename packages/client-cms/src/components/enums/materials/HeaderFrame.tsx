/**
 * Figma reference:
 * Components/Framework/Header Frame
 */

import React from 'react';
import { PageHeader } from 'antd';
import { App_Shell, Table_Descriptions } from '../../../strings';
import { MaterialsPageIcon } from '../../common/icons/page-icons/MaterialsPageIcon';

function HeaderFrame() {
  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        backgroundColor: '#fff',
      }}
      title={
        <div>
          <MaterialsPageIcon />
          <span>{App_Shell.Sidebar.Pages.Materials}</span>
        </div>
      }
    >
      {Table_Descriptions.Materials}
    </PageHeader>
  );
}

export { HeaderFrame };
