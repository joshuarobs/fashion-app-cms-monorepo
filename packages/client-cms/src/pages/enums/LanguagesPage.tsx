import React from 'react';
import { HeaderFrame } from '../../components/enums/languages/HeaderFrame';
import { Footer } from '../../components/app-shell/Footer';
import { PrimaryFrame } from '../../components/enums/languages/PrimaryFrame/_PrimaryFrame';
import { pageStyles } from '../pageStyles';

function LanguagesPage() {
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

export { LanguagesPage };
