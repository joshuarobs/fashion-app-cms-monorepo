import React, { ReactElement, useState } from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Sidebar } from './components/app-shell/Sidebar';
import { ScrollToTop } from './utils/ScrollToTop';
import { AppShellHeader } from './components/app-shell/Header';
import { RouteStrings as RouteStrings } from './routeStrings';
import { ItemsPage } from './pages/ItemsPage';
import { ItemPage } from './pages/item/_ItemPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { FabricLayersPage } from './pages/FabricLayersPage';
import { HeuristicItemsPage } from './pages/HeuristicItemsPage';
import { ClothingShellsPage } from './pages/ClothingShellsPage';
import { BaseColoursPage } from './pages/enums/BaseColoursPage';
import { BodySegmentsPage } from './pages/enums/BodySegmentsPage';
import { MaskShapesPage } from './pages/enums/MaskShapesPage';
import { FabricTypesPage } from './pages/enums/FabricTypesPage';
import { MaterialsPage } from './pages/enums/MaterialsPage';
import { LanguagesPage } from './pages/enums/LanguagesPage';
import { CountriesPage } from './pages/enums/CountriesPage';
import { OtherEnumsPage } from './pages/enums/OtherEnumsPage';
import { HeuristicItemPage } from './pages/HeuristicItemPage';
import { ClothingShellPage } from './pages/clothing-shell/_ClothingShellPage';
import { UsersPage } from './pages/UsersPage';
import { CompanyPage } from './pages/company/_CompanyPage';
import { Exception404Page } from './pages/Exception404Page';
import { HomePage } from './pages/HomePage';
import { LocalisationsPage } from './pages/LocalisationsPage';
import { LoginPage } from './pages/LoginPage';

const client = new ApolloClient({
  uri: process.env.REACT_APP_DB_ENDPOINT || 'http://localhost:3001/graphql',
  // cache: new InMemoryCache()
  cache: new InMemoryCache({
    typePolicies: {
      fabric_layer_and_colour_mix_part: {
        keyFields: ['colour_mix_part_id', 'fabric_layer_id'],
      },
      // item_translations: {
      //   keyFields: ["revision_id", "is_release"]
      // }
    },
  }),
});

const App = (): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [isLoginPage] = useState(location.pathname === RouteStrings.Login);
  // console.log('location:', location);

  return (
    <ApolloProvider client={client}>
      <ScrollToTop />
      {isLoginPage && <LoginPage />}
      {!isLoginPage && (
        <Layout>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
            <AppShellHeader />
            <Routes>
              <Route
                path={
                  RouteStrings.Clothing_Shells__Clothing_Shell +
                  RouteStrings.Var_Id +
                  RouteStrings.Wildcard
                }
                element={<ClothingShellPage />}
              />
              <Route
                path={
                  RouteStrings.Items__Clothing__Item +
                  RouteStrings.Var_Id +
                  RouteStrings.Wildcard
                }
                element={<ItemPage />}
              />
              <Route
                path={
                  RouteStrings.Companies__Company +
                  RouteStrings.Var_Id +
                  RouteStrings.Wildcard
                }
                element={<CompanyPage />}
              />
              <Route
                path={
                  RouteStrings.Heuristic_Items__Clothing__Item +
                  RouteStrings.Var_Id
                }
                element={<HeuristicItemPage />}
              />
              <Route
                path={RouteStrings.Clothing_Shells}
                element={<ClothingShellsPage />}
              />
              <Route
                path={RouteStrings.Fabric_Layers}
                element={<FabricLayersPage />}
              />
              <Route
                path={RouteStrings.Items__Clothing}
                element={<ItemsPage />}
              />
              <Route
                path={RouteStrings.Companies}
                element={<CompaniesPage />}
              />
              <Route
                path={RouteStrings.Body_Segments}
                element={<BodySegmentsPage />}
              />
              <Route
                path={RouteStrings.Base_Colours}
                element={<BaseColoursPage />}
              />
              <Route
                path={RouteStrings.Mask_Shapes}
                element={<MaskShapesPage />}
              />
              <Route
                path={RouteStrings.Countries}
                element={<CountriesPage />}
              />
              <Route
                path={RouteStrings.Languages}
                element={<LanguagesPage />}
              />
              <Route
                path={RouteStrings.Fabric_Types}
                element={<FabricTypesPage />}
              />
              <Route
                path={RouteStrings.Materials}
                element={<MaterialsPage />}
              />
              <Route
                path={RouteStrings.Other_Enums}
                element={<OtherEnumsPage />}
              />
              <Route
                path={RouteStrings.Heuristic_Items}
                element={<HeuristicItemsPage />}
              />
              <Route
                path={RouteStrings.Localisations}
                element={<LocalisationsPage />}
              />
              <Route path={RouteStrings.Users} element={<UsersPage />} />
              <Route path={RouteStrings.Home} element={<HomePage />} />
              <Route path={RouteStrings.Login} element={<LoginPage />} />
              <Route path="*" element={<Exception404Page />} />
            </Routes>
          </Layout>
        </Layout>
      )}
    </ApolloProvider>
  );
};

export { App };
