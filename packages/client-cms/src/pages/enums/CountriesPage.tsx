import React, { useState } from 'react';
import { HeaderFrame } from '../../components/enums/countries/HeaderFrame';
import { Footer } from '../../components/app-shell/Footer';
import { PrimaryFrame } from '../../components/enums/countries/PrimaryFrame/_PrimaryFrame';
import { pageStyles } from '../pageStyles';

function CountriesPage() {
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

export { CountriesPage };
