import React from 'react';
import { HeaderFrame } from '../components/users/HeaderFrame/_HeaderFrame';
import { Footer } from '../components/app-shell/Footer';
import { PrimaryFrame } from '../components/users/PrimaryFrame/_PrimaryFrame';
import { pageStyles } from './pageStyles';

function UsersPage() {
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

export { UsersPage };
