/**
 * Figma reference:
 * Components/Framework/Header Frame
 */

import React from 'react';
import { PageHeader } from 'antd';
import { App_Shell, Table_Descriptions } from '../../../strings';
import { CountriesPageIcon } from '../../common/icons/page-icons/CountriesPageIcon';

function HeaderFrame() {
  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        backgroundColor: '#fff',
      }}
      title={
        <div>
          <CountriesPageIcon />
          <span>{App_Shell.Sidebar.Pages.Countries}</span>
        </div>
      }
    >
      {Table_Descriptions.Countries}
    </PageHeader>
  );
}

export { HeaderFrame };
