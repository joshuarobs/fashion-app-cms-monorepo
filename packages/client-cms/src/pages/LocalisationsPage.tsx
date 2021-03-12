import React from 'react';
import { HeaderFrame } from '../components/locales/HeaderFrame/_HeaderFrame';
import { Footer } from '../components/app-shell/Footer';
import { PrimaryFrame } from '../components/locales/PrimaryFrame/_PrimaryFrame';
import { pageStyles } from './pageStyles';

function LocalisationsPage() {
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

export { LocalisationsPage };
