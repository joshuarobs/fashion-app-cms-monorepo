/**
 * Figma reference:
 * Components/Framework/Header Frame
 */

import React from 'react';
import { PageHeader } from 'antd';
import { App_Shell, Table_Descriptions } from '../../../strings';
import { BodySegmentsPageIcon } from '../../common/icons/page-icons/BodySegmentsPageIcon';

function HeaderFrame() {
  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        backgroundColor: '#fff',
      }}
      title={
        <div>
          <BodySegmentsPageIcon />
          <span>{App_Shell.Sidebar.Pages.Body_Segments}</span>
        </div>
      }
    >
      {Table_Descriptions.Body_Segments}
    </PageHeader>
  );
}

export { HeaderFrame };
