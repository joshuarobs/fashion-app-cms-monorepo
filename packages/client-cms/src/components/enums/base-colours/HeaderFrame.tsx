/**
 * Figma reference:
 * Components/Framework/Header Frame
 */

import React from 'react';
import { PageHeader } from 'antd';
import { App_Shell, Table_Descriptions } from '../../../strings';
import { BaseColoursPageIcon } from '../../common/icons/page-icons/BaseColoursPageIcon';

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
          <span>{App_Shell.Sidebar.Pages.Base_Colours}</span>
        </div>
      }
    >
      {Table_Descriptions.Base_Colours}
    </PageHeader>
  );
}

export { HeaderFrame };
