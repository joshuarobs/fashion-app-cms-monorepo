import React, { useState } from 'react';
import { HeaderFrame } from '../components/clothing-shells/HeaderFrame/_HeaderFrame';
import { Footer } from '../components/app-shell/Footer';
import { ItemCategoriesMenu } from '../components/items/ItemCategoriesMenu';
import { PrimaryFrame } from '../components/clothing-shells/PrimaryFrame/_PrimaryFrame';
import { pageStyles } from './pageStyles';
import { ColumnOfFrames } from '../components/common/frames/ColumnOfFrames';

function ClothingShellsPage() {
  console.log('Clothing shells page');
  // const state = {
  //   collapsed: false,
  // };
  //
  // const toggle = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // };

  return (
    <>
      <HeaderFrame />
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

export { ClothingShellsPage };
