import React from 'react';
import { HeaderFrame } from '../components/items/HeaderFrame/_HeaderFrame';
import { Footer } from '../components/app-shell/Footer';
import { App_Shell } from '../strings';
import { ItemCategoriesMenu } from '../components/items/ItemCategoriesMenu';
import { PrimaryFrame } from '../components/items/PrimaryFrame/_PrimaryFrame';
import { pageStyles } from './pageStyles';
import { ColumnOfFrames } from '../components/common/frames/ColumnOfFrames';

function ItemsPage() {
  return (
    <>
      <HeaderFrame title={App_Shell.Sidebar.Pages.Items} />
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <ColumnOfFrames freeWidth>
          <ItemCategoriesMenu />
        </ColumnOfFrames>
        <ColumnOfFrames fullWidth>
          <PrimaryFrame />
        </ColumnOfFrames>
      </div>
      <Footer />
    </>
  );
}

export { ItemsPage };
