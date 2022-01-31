import React from 'react';
import { HeaderFrame } from '../../components/item/HeaderFrame';
import { Footer } from '../../components/app-shell/Footer';
import { Route, Routes, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { RouteStrings } from '../../routeStrings';
import { pageStyles } from '../pageStyles';
import { OverviewTab } from './OverviewTab';
import { LocalisationsTab } from './LocalisationsTab';
import { ChangeHistoryTab } from './ChangeHistoryTab';
import { ItemSettingsTab } from './SettingsTab';
import { Get_Revisions_For_Item_BB } from '../../queries/item_maindata_revisions/getRevisionsForItemBB';
import { Get_Item_Base_Data_By_Pk } from '../../queries/items/getItemBaseDataByPk';
import { Button, Result } from 'antd';

function ItemPage() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.

  // @ts-ignore
  const { id } = useParams();
  console.log('id:', id);

  const {
    loading: loadingBaseData,
    error: errorBaseData,
    data: dataBaseData,
    refetch: refetchBaseData,
  } = useQuery(Get_Item_Base_Data_By_Pk, {
    variables: { id: Number.parseInt(String(id)) },
  });

  const {
    loading: loadingRevisions,
    error: errorRevisions,
    data: dataRevisions,
    refetch: refetchRevisions,
  } = useQuery(Get_Revisions_For_Item_BB, {
    variables: { id: Number.parseInt(String(id)) },
  });

  if (loadingRevisions || loadingBaseData) return <div />;
  if (errorRevisions) {
    console.error('errorRevisions:', errorRevisions);
    return <div>Error! ${JSON.stringify(errorRevisions, null, 2)}</div>;
  }
  if (errorBaseData) {
    console.error('errorBaseData:', errorBaseData);
    return <div>Error! ${errorBaseData}</div>;
  }
  // console.log('dataBaseData:', dataBaseData);
  // console.log('dataRevisions:', dataRevisions);
  // console.log("dataItemBaseData:", dataItemBaseData);

  // const item = data.items_by_pk;
  const headerData = dataBaseData.getItemBaseDataByPk;
  const uniqueRevisions = dataRevisions.getRevisionsForItemBarebones;

  // 404 result if item doesn't exist in the database
  if (!headerData) {
    return (
      <Result
        status="404"
        title="404"
        subTitle={`Sorry, an item with id "${id}" does not exist.`}
        extra={
          <Link to={RouteStrings.Items__Clothing__Item}>
            <Button type="primary">Back to Items</Button>
          </Link>
        }
        style={{
          paddingTop: 96,
        }}
      />
    );
  }

  return (
    <>
      <HeaderFrame data={headerData} />
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <Routes>
          <Route
            path={''}
            element={
              <OverviewTab
                item={headerData}
                uniqueRevisions={uniqueRevisions}
                refetchRevisions={refetchRevisions}
                refetchItemBaseData={refetchBaseData}
              />
            }
          />
          <Route
            path={RouteStrings.Localisations + RouteStrings.Wildcard}
            element={<LocalisationsTab />}
          />
          <Route
            path={RouteStrings.Change_History + RouteStrings.Wildcard}
            element={<ChangeHistoryTab />}
          />
          <Route
            path={RouteStrings.Settings}
            element={<ItemSettingsTab headerData={headerData} />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export { ItemPage };
