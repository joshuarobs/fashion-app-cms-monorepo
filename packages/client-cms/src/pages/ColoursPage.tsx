import React from 'react';
import { HeaderFrame } from '../components/colours/HeaderFrame';
import { Footer } from '../components/app-shell/Footer';
import { pageStyles } from './pageStyles';
import { ColoursTableView } from '../components/common/table-views/ColoursTableView';

function ColoursPage() {
  return (
    <>
      <HeaderFrame />
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <ColoursTableView />
      </div>
      <Footer />
    </>
  );
}

export { ColoursPage };
