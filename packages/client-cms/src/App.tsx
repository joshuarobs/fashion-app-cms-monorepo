import React, { ReactElement, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Sidebar } from './components/app-shell/Sidebar';
import { ScrollToTop } from './utils/ScrollToTop';
import { AppShellHeader } from './components/app-shell/Header';
import { Routes } from './routes';
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

const client = new ApolloClient({
  uri: 'http://localhost:8090/v1/graphql',
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

  return (
    <ApolloProvider client={client}>
      <Router>
        <ScrollToTop />
        <Layout>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
            <AppShellHeader />
            <Switch>
              <Route
                path={Routes.Clothing_Shells__Clothing_Shell + Routes.Var_Id}
                component={ClothingShellPage}
              />
              <Route
                path={Routes.Items__Clothing__Item + Routes.Var_Id}
                component={ItemPage}
              />
              <Route
                path={Routes.Companies__Company + Routes.Var_Id}
                component={CompanyPage}
              />
              <Route
                path={Routes.Heuristic_Items__Clothing__Item + Routes.Var_Id}
                component={HeuristicItemPage}
              />
              <Route
                path={Routes.Clothing_Shells}
                component={ClothingShellsPage}
              />
              <Route path={Routes.Fabric_Layers} component={FabricLayersPage} />
              <Route path={Routes.Items} component={ItemsPage} />
              <Route path={Routes.Companies} component={CompaniesPage} />
              <Route path={Routes.Body_Segments} component={BodySegmentsPage} />
              <Route path={Routes.Base_Colours} component={BaseColoursPage} />
              <Route path={Routes.Mask_Shapes} component={MaskShapesPage} />
              <Route path={Routes.Countries} component={CountriesPage} />
              <Route path={Routes.Languages} component={LanguagesPage} />
              <Route path={Routes.Fabric_Types} component={FabricTypesPage} />
              <Route path={Routes.Materials} component={MaterialsPage} />
              <Route path={Routes.Other_Enums} component={OtherEnumsPage} />
              <Route
                path={Routes.Heuristic_Items}
                component={HeuristicItemsPage}
              />
              <Route
                path={Routes.Localisations}
                component={LocalisationsPage}
              />
              <Route path={Routes.Users} component={UsersPage} />
              <Route path={Routes.Home} component={HomePage} />
              <Route path="*" component={Exception404Page} />
            </Switch>
          </Layout>
        </Layout>
      </Router>
    </ApolloProvider>
  );
};

export { App };
