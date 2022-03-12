/**
 * Figma reference:
 * Components/Framework/Header Frame
 */

import React from 'react';
import { PageHeader } from 'antd';
import { BaseColoursPageIcon } from '../common/icons/page-icons/BaseColoursPageIcon';
import { App_Shell, Table_Descriptions } from '../../strings';

function HeaderFrame() {
  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        backgroundColor: '#fff',
      }}
      title={
        <div>
          <BaseColoursPageIcon />
          {App_Shell.Sidebar.Pages.Colours}
        </div>
      }
    >
      {Table_Descriptions.Colours}
    </PageHeader>
  );
}

export { HeaderFrame };
