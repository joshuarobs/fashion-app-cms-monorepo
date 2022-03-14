import React from 'react';
import { HeaderFrame } from '../components/colour-mix-parts/HeaderFrame';
import { Footer } from '../components/app-shell/Footer';
import { pageStyles } from './pageStyles';
import { ColourMixPartsTableView } from '../components/common/table-views/ColourMixPartsTableView';

function ColourMixPartsPage() {
  return (
    <>
      <HeaderFrame />
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <ColourMixPartsTableView />
      </div>
      <Footer />
    </>
  );
}

export { ColourMixPartsPage };
