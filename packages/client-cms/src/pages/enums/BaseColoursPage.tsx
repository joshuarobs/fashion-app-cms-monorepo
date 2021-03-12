import React, { useState } from 'react';
import { HeaderFrame } from '../../components/enums/base-colours/HeaderFrame';
import { Footer } from '../../components/app-shell/Footer';
import { PrimaryFrame } from '../../components/enums/base-colours/PrimaryFrame/_PrimaryFrame';
import { pageStyles } from '../pageStyles';

function BaseColoursPage() {
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

export { BaseColoursPage };
