import React, { useState } from 'react';
import { HeaderFrame } from '../../components/enums/mask-shapes/HeaderFrame';
import { Footer } from '../../components/app-shell/Footer';
import { PrimaryFrame } from '../../components/enums/mask-shapes/PrimaryFrame/_PrimaryFrame';
import { pageStyles } from '../pageStyles';

function MaskShapesPage() {
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

export { MaskShapesPage };
