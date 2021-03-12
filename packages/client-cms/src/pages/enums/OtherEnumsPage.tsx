import React, { useState } from 'react';
import { HeaderFrame } from '../../components/enums/other-enums/HeaderFrame';
import { Footer } from '../../components/app-shell/Footer';
import { ItemTypesFrame } from '../../components/enums/other-enums/ItemTypesFrame';
import { GendersFrame } from '../../components/enums/other-enums/GendersFrame';
import { pageStyles } from '../pageStyles';

function OtherEnumsPage() {
  return (
    <>
      <HeaderFrame />
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <ItemTypesFrame />
      </div>
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <GendersFrame />
      </div>
      <Footer />
    </>
  );
}

export { OtherEnumsPage };
