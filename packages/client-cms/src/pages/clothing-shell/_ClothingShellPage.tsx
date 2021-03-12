import React from 'react';
import { HeaderFrame } from '../../components/clothing-shell/HeaderFrame';
import { Footer } from '../../components/app-shell/Footer';
import {
  Switch,
  Route,
  useParams,
  useRouteMatch,
  Link,
} from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { ColumnOfFrames } from '../../components/common/frames/ColumnOfFrames';
import { pageStyles } from '../pageStyles';
import { OverviewTab } from './OverviewTab';
import { BodySegmentsTab } from './BodySegmentsTab';
import { Button, Result } from 'antd';
import { Routes } from '../../routes';
import { Get_Clothing_Shell } from '../../queries/clothing_shells/getClothingShell';
import { Get_Revisions_For_Clothing_Shell_BB } from '../../queries/clothing_shell_maindata_revisions/getRevisionsForClothingShellBB';
import { Get_Item_Base_Data_By_Pk } from '../../queries/items/getItemBaseDataByPk';
import { Get_Clothing_Shell_Base_Data_By_Pk } from '../../queries/clothing_shells/getClothingShellBaseDataByPk';
import { ItemSettingsTab } from '../item/SettingsTab';
import { ClothingShellSettingsTab } from './SettingsTab';

function ClothingShellPage() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  // @ts-ignore
  const { id } = useParams();
  console.log('id:', id);

  const {
    loading: loadingBaseData,
    error: errorBaseData,
    data: dataBaseData,
    refetch: refetchBaseData,
  } = useQuery(Get_Clothing_Shell_Base_Data_By_Pk, {
    variables: { id },
  });

  const {
    loading: loadingRevisions,
    error: errorRevisions,
    data: dataRevisions,
    refetch: refetchRevisions,
  } = useQuery(Get_Revisions_For_Clothing_Shell_BB, {
    variables: { id },
  });

  if (loadingRevisions || loadingBaseData) return <div />;
  if (errorRevisions) return <div>Error! ${errorRevisions}</div>;
  if (errorBaseData) return <div>Error! ${errorBaseData}</div>;

  const clothingShell = dataBaseData.clothing_shells_by_pk;
  const uniqueRevisions = dataRevisions.clothing_shell_maindata_revisions;
  console.log('uniqueRevisions:', uniqueRevisions);

  // 404 result if item doesn't exist in the database
  if (!clothingShell) {
    return (
      <Result
        status="404"
        title="404"
        subTitle={`Sorry, a clothing shell with id "${id}" does not exist.`}
        extra={
          <Link to={Routes.Clothing_Shells__Clothing_Shell}>
            <Button type="primary">Back to Clothing Shells</Button>
          </Link>
        }
        style={{
          paddingTop: 96,
        }}
      />
    );
  }

  console.log('path:', path);

  return (
    <>
      <HeaderFrame data={clothingShell} />
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <Switch>
          <Route exact path={path}>
            <OverviewTab
              clothingShell={clothingShell}
              uniqueRevisions={uniqueRevisions}
              refetchRevisions={refetchRevisions}
              refetchClothingShellBaseData={refetchBaseData}
            />
          </Route>
          {/*<Route exact path={path + Routes.Body_Segments}>*/}
          {/*  <BodySegmentsTab clothingShell={clothingShell} />*/}
          {/*</Route>*/}
          <Route exact path={path + Routes.Items_Implemented_In}>
            <ColumnOfFrames>Items implemented in</ColumnOfFrames>
          </Route>
          <Route exact path={path + Routes.Items_Implemented_In}>
            <ColumnOfFrames>Items implemented in</ColumnOfFrames>
          </Route>
          <Route exact path={path + Routes.Change_History}>
            <ColumnOfFrames>Change history</ColumnOfFrames>
          </Route>
          <Route exact path={path + Routes.Settings}>
            <ClothingShellSettingsTab headerData={clothingShell} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export { ClothingShellPage };
