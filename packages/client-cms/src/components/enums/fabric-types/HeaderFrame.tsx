/**
 * Figma reference:
 * Components/Framework/Header Frame
 */

import React from 'react';
import { PageHeader } from 'antd';
import { App_Shell, Table_Descriptions } from '../../../strings';
import { FabricTypesPageIcon } from '../../common/icons/page-icons/FabricTypesPageIcon';

function HeaderFrame() {
  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        backgroundColor: '#fff',
      }}
      title={
        <div>
          <FabricTypesPageIcon />
          <span>{App_Shell.Sidebar.Pages.Fabric_Types}</span>
        </div>
      }
    >
      {Table_Descriptions.Fabric_Types}
    </PageHeader>
  );
}

export { HeaderFrame };
