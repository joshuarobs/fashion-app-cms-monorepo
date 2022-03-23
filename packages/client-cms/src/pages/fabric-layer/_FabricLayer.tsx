import React from 'react';
import { HeaderFrame } from '../../components/fabric-layer/HeaderFrame';
import { Footer } from '../../components/app-shell/Footer';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ColumnOfFrames } from '../../components/common/frames/ColumnOfFrames';
import { pageStyles } from '../pageStyles';
import { OverviewTab } from './OverviewTab';
import { Button, Result } from 'antd';
import { RouteStrings } from '../../routeStrings';
import { Get_Revisions_For_Clothing_Shell_BB } from '../../queries/clothing_shell_maindata_revisions/getRevisionsForClothingShellBB';
import { Get_Clothing_Shell_Base_Data_By_Pk } from '../../queries/clothing_shells/getClothingShellBaseDataByPk';
import { ClothingShellSettingsTab } from './SettingsTab';
import { Get_Fabric_Layer_By_Pk } from '../../queries/fabric_layers/getFabricLayerByPk';

function FabricLayerPage() {
  const { id } = useParams();
  console.log('id:', id);

  const {
    loading: loadingBaseData,
    error: errorBaseData,
    data: dataBaseData,
    refetch: refetchBaseData,
  } = useQuery(Get_Fabric_Layer_By_Pk, {
    variables: { id: Number.parseInt(String(id)) },
  });

  if (loadingBaseData) return <div />;
  if (errorBaseData)
    return (
      <div>Error! (BaseData) ${JSON.stringify(errorBaseData, null, 2)}</div>
    );

  const fabricLayerData = dataBaseData.getFabricLayerByPk;
  // const uniqueRevisions = dataRevisions.getRevisionsForClothingShellBarebones;
  // console.log('uniqueRevisions:', uniqueRevisions);

  // 404 result if item doesn't exist in the database
  if (!fabricLayerData) {
    return (
      <Result
        status="404"
        title="404"
        subTitle={`Sorry, a clothing shell with id "${id}" does not exist.`}
        extra={
          <Link to={RouteStrings.Clothing_Shells__Clothing_Shell}>
            <Button type="primary">Back to Clothing Shells</Button>
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
      <HeaderFrame data={fabricLayerData} />
      {/* @ts-ignore */}
      <div style={pageStyles.content}>
        <Routes>
          <Route
            path={''}
            element={<OverviewTab fabricLayer={fabricLayerData} />}
          />
          {/*<Route exact path={path + Routes.Items_Implemented_In}>*/}
          {/*  <ColumnOfFrames>Items implemented in</ColumnOfFrames>*/}
          {/*</Route>*/}
          <Route
            path={RouteStrings.Items_Implemented_In}
            element={<ColumnOfFrames>Items implemented in</ColumnOfFrames>}
          />
          <Route
            path={RouteStrings.Change_History + RouteStrings.Wildcard}
            element={<ColumnOfFrames>Change history</ColumnOfFrames>}
          />
          <Route
            path={RouteStrings.Settings}
            element={<ClothingShellSettingsTab headerData={fabricLayerData} />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export { FabricLayerPage };
