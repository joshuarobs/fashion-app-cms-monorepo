/**
 * Figma reference:
 * Components/Items/Header Frame
 */

import React from 'react';
import { PageHeader } from 'antd';
import { HeuristicItemsPageIcon } from '../common/icons/page-icons/HeuristicItemsPageIcon';
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
          <HeuristicItemsPageIcon />
          {App_Shell.Sidebar.Pages.Heuristic_Items}
        </div>
      }
    />
  );
}

export { HeaderFrame };
