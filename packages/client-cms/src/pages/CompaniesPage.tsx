import React from 'react';
import { HeaderFrame } from '../components/companies/HeaderFrame';
import { Footer } from '../components/app-shell/Footer';
import { CompaniesTableView } from '../components/common/table-views/CompaniesTableView';
import { pageStyles } from './pageStyles';
import { TableType } from '../components/common/table-views/TableType';

function CompaniesPage() {
  return (
    <>
      <HeaderFrame />
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <CompaniesTableView type={TableType.All_List} />
      </div>
      <Footer />
    </>
  );
}

export { CompaniesPage };
