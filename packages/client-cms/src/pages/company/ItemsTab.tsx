import React from 'react';
import { pageStyles } from '../pageStyles';
import { ItemCategoriesMenu } from '../../components/items/ItemCategoriesMenu';
import { PrimaryFrame } from '../../components/items/PrimaryFrame/_PrimaryFrame';
import { Footer } from '../../components/app-shell/Footer';

function ItemsTab() {
  return (
    <>
      {/*<HeaderFrame title={APP_SHELL.SIDEBAR.PAGES.ITEMS} />*/}
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <ItemCategoriesMenu />
        <PrimaryFrame />
      </div>
      <Footer />
    </>
  );
}

export { ItemsTab };
