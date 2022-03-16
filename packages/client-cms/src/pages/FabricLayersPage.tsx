import React from 'react';
import { HeaderFrame } from '../components/fabric-layers/HeaderFrame/HeaderFrame';
import { Footer } from '../components/app-shell/Footer';
import { pageStyles } from './pageStyles';
import { FabricLayersTableView } from '../components/common/table-views/FabricLayersTableView';

function FabricLayersPage() {
  return (
    <>
      <HeaderFrame />
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <FabricLayersTableView />
      </div>
      <Footer />
    </>
  );
}

export { FabricLayersPage };
