import React from 'react';
import { HeaderFrame } from '../components/heuristic-items/HeaderFrame';
import { Footer } from '../components/app-shell/Footer';
import { ItemCategoriesMenu } from '../components/items/ItemCategoriesMenu';
import { PrimaryFrame } from '../components/heuristic-items/PrimaryFrame/_PrimaryFrame';
import { pageStyles } from './pageStyles';
import { ColumnOfFrames } from '../components/common/frames/ColumnOfFrames';

function HeuristicItemsPage() {
  return (
    <>
      <HeaderFrame />
      {/** @ts-ignore **/}
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

export { HeuristicItemsPage };
