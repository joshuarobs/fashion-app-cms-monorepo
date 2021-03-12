import React from 'react';
import { HeaderFrame } from '../../components/enums/fabric-types/HeaderFrame';
import { Footer } from '../../components/app-shell/Footer';
import { PrimaryFrame } from '../../components/enums/fabric-types/PrimaryFrame/_PrimaryFrame';
import { pageStyles } from '../pageStyles';

function FabricTypesPage() {
  return (
    <>
      <HeaderFrame />
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <PrimaryFrame />
      </div>
      <Footer />
    </>
  );
}

export { FabricTypesPage };
