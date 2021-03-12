import React from 'react';
import { HeaderFrame } from '../../components/enums/materials/HeaderFrame';
import { Footer } from '../../components/app-shell/Footer';
import { PrimaryFrame } from '../../components/enums/materials/PrimaryFrame/_PrimaryFrame';
import { pageStyles } from '../pageStyles';

function MaterialsPage() {
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

export { MaterialsPage };
