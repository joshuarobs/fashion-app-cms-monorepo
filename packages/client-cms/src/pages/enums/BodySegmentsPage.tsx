import React, { useState } from 'react';
import { HeaderFrame } from '../../components/enums/body-segments/HeaderFrame';
import { Footer } from '../../components/app-shell/Footer';
import { PrimaryFrame } from '../../components/enums/body-segments/PrimaryFrame/_PrimaryFrame';
import { pageStyles } from '../pageStyles';

function BodySegmentsPage() {
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

export { BodySegmentsPage };
