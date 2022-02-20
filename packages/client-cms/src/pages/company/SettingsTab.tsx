import React from 'react';
import { SettingsTabView } from '../../components/company/settings/SettingsTabView';
import { useQuery } from '@apollo/client';
import { Get_Latest_Production_Item_Maindata_Revision_By_Item_Id } from '../../queries/item_maindata_revisions/getLatestProdItemMaindataRevByItemId';
import { useParams } from 'react-router-dom';
import { companies } from '../../utils/gql-interfaces/companies';

interface CompanySettingsTabProps {
  company: companies;
}

function CompanySettingsTab({ company }: CompanySettingsTabProps) {
  // @ts-ignore
  const { id } = useParams();
  const itemId = id;

  return <SettingsTabView company={company} />;
}

export { CompanySettingsTab };
