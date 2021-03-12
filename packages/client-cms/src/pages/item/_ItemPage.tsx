import React from 'react';
import { HeaderFrame } from '../../components/item/HeaderFrame';
import { Footer } from '../../components/app-shell/Footer';
import {
  Route,
  Switch,
  useParams,
  useRouteMatch,
  Link,
} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Routes } from '../../routes';
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
  const { path } = useRouteMatch();

  // @ts-ignore
  const { id } = useParams();
  // console.log("id:", id);

  const {
    loading: loadingBaseData,
    error: errorBaseData,
    data: dataBaseData,
    refetch: refetchBaseData,
  } = useQuery(Get_Item_Base_Data_By_Pk, {
    variables: { id },
  });

  const {
    loading: loadingRevisions,
    error: errorRevisions,
    data: dataRevisions,
    refetch: refetchRevisions,
  } = useQuery(Get_Revisions_For_Item_BB, {
    variables: { id },
  });

  if (loadingRevisions || loadingBaseData) return <div />;
  if (errorRevisions) return <div>Error! ${errorRevisions}</div>;
  if (errorBaseData) return <div>Error! ${errorBaseData}</div>;
  // console.log("data:", data);
  // console.log("dataRevisions:", dataRevisions);
  // console.log("dataItemBaseData:", dataItemBaseData);

  // const item = data.items_by_pk;
  const headerData = dataBaseData.items_by_pk;
  const uniqueRevisions = dataRevisions.item_maindata_revisions;

  // 404 result if item doesn't exist in the database
  if (!headerData) {
    return (
      <Result
        status="404"
        title="404"
        subTitle={`Sorry, an item with id "${id}" does not exist.`}
        extra={
          <Link to={Routes.Items__Clothing__Item}>
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
        <Switch>
          <Route exact path={path}>
            <OverviewTab
              item={headerData}
              uniqueRevisions={uniqueRevisions}
              refetchRevisions={refetchRevisions}
              refetchItemBaseData={refetchBaseData}
            />
          </Route>
          {/*<Route path={path + Routes.BODY_SEGMENTS}>*/}
          {/*  <ColumnOfFrames>Body Segments</ColumnOfFrames>*/}
          {/*</Route>*/}
          <Route path={path + Routes.Localisations}>
            <LocalisationsTab />
          </Route>
          <Route path={path + Routes.Change_History}>
            <ChangeHistoryTab />
          </Route>
          <Route path={path + Routes.Settings}>
            <ItemSettingsTab headerData={headerData} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export { ItemPage };
