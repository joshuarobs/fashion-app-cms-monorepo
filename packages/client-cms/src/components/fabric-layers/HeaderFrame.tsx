/**
 * Figma reference:
 * Components/Framework/Header Frame
 */

import React from 'react';
import { PageHeader } from 'antd';
import { FabricLayersPageIcon } from '../common/icons/page-icons/FabricLayersPageIcon';
import { App_Shell } from '../../strings';

function HeaderFrame() {
  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        backgroundColor: '#fff',
      }}
      title={
        <div>
          <FabricLayersPageIcon />
          {App_Shell.Sidebar.Pages.Fabric_Layers}
        </div>
      }
    />
  );
}

export { HeaderFrame };
