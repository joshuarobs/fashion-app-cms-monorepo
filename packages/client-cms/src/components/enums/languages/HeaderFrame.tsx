/**
 * Figma reference:
 * Components/Framework/Header Frame
 */

import React from 'react';
import { PageHeader } from 'antd';
import { App_Shell, Table_Descriptions } from '../../../strings';
import { LanguagesPageIcon } from '../../common/icons/page-icons/LanguagesPageIcon';

function HeaderFrame() {
  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        backgroundColor: '#fff',
      }}
      title={
        <div>
          <LanguagesPageIcon />
          <span>{App_Shell.Sidebar.Pages.Languages}</span>
        </div>
      }
    >
      {Table_Descriptions.Languages}
    </PageHeader>
  );
}

export { HeaderFrame };
