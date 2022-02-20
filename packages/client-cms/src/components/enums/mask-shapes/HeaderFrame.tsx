/**
 * Figma reference:
 * Components/Framework/Header Frame
 */

import React from 'react';
import { PageHeader } from 'antd';
import { App_Shell, Table_Descriptions } from '../../../strings';
import { BaseColoursPageIcon } from '../../common/icons/page-icons/BaseColoursPageIcon';
import { MaskShapesPageIcon } from '../../common/icons/page-icons/MaskShapesPageIcon';

function HeaderFrame() {
  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        backgroundColor: '#fff',
      }}
      title={
        <div>
          <MaskShapesPageIcon />
          <span>{App_Shell.Sidebar.Pages.Mask_Shapes}</span>
        </div>
      }
    >
      {Table_Descriptions.Mask_Shapes}
    </PageHeader>
  );
}

export { HeaderFrame };
