/**
 * Figma reference:
 * Components/Framework/Header Frame
 */

import React from 'react';
import { PageHeader } from 'antd';
import { App_Shell, Table_Descriptions } from '../../strings';
import { ColourMixPartsPageIcon } from '../common/icons/page-icons/ColourMixPartsPageIcon';

function HeaderFrame() {
  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        backgroundColor: '#fff',
      }}
      title={
        <div>
          <ColourMixPartsPageIcon />
          {App_Shell.Sidebar.Pages.Colour_Mix_Parts}
        </div>
      }
    >
      {Table_Descriptions.Colour_Mix_Parts}
    </PageHeader>
  );
}

export { HeaderFrame };
