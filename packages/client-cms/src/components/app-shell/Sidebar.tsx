/**
 * Figma reference:
 * Components/App Shell/Sidebar
 */

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ClusterOutlined,
  FolderOpenOutlined,
  GoldOutlined,
  HomeOutlined,
  LayoutOutlined,
  SettingOutlined,
  ShopOutlined,
  SkinOutlined,
  SolutionOutlined,
  UserOutlined,
  BlockOutlined,
  ProfileOutlined,
  TranslationOutlined,
  GlobalOutlined,
  BgColorsOutlined,
  GatewayOutlined,
  ManOutlined,
  AimOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import { Col, Layout, Menu } from 'antd';
import { App_Shell } from '../../strings';
import { Routes } from '../../routes';
import { ExpandCollapseSidebarButton } from './ExpandCollapseSidebarButton';
import { useHotkeys } from 'react-hotkeys-hook';
// import {useLocation} from "react-router";
import { SidebarProps } from './SidebarProps';

const { Sider } = Layout;
const { SubMenu } = Menu;

const styles = {
  menuItemGroupNotFirst: {
    marginTop: 8,
  },
  menuItem: {
    margin: 0,
  },
};

function getBaseRouteWithoutForwardSlash(str: string) {
  const result = str.split('/')[1].replace('/', '');
  if (result !== '') {
    return result;
  } else {
    return '/!!';
  }
  // return string.split("/")[1].replace("/", "");
}

function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  let location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  useEffect(() => {
    setCurrentPath(getBaseRouteWithoutForwardSlash(location.pathname));
  }, [location]);

  useHotkeys('[', () => {
    setCollapsed((collapsed: boolean) => !collapsed);
  });

  // const [enumsSubmenuOpen, setEnumsSubmenuOpen] = useState(false);

  console.log(
    'getBaseRouteWithoutForwardSlash:',
    getBaseRouteWithoutForwardSlash(Routes.Home)
  );

  const renderThumb = ({ style, ...props }: any) => {
    // const { top } = this.state;
    const thumbStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: '4px',
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        paddingBottom: 48,
        transition: 'none',
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Scrollbars
        autoHide
        // autoHideDuration={0}
        renderThumbVertical={renderThumb}
        style={{
          width: collapsed ? 80 : 200,
          height: '100vh',
        }}
      >
        <div className="logo" style={{ minHeight: '48px' }}>
          <ExpandCollapseSidebarButton
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentPath]}
          defaultOpenKeys={[]}
        >
          {/* GENERAL */}
          <Menu.ItemGroup
            key="g1-general"
            title={App_Shell.Sidebar.Groups.General}
          >
            {/* -- HOME */}
            <Menu.Item
              key={getBaseRouteWithoutForwardSlash(Routes.Home)}
              style={styles.menuItem}
            >
              <Link to={Routes.Home}>
                <HomeOutlined />
                <span>{App_Shell.Sidebar.Pages.Home}</span>
              </Link>
            </Menu.Item>
            {/* -- MY TASKS */}
            <Menu.Item
              disabled
              key={getBaseRouteWithoutForwardSlash(Routes.My_Tasks)}
              style={styles.menuItem}
            >
              <Link to={Routes.My_Tasks}>
                <SolutionOutlined />
                <span>{App_Shell.Sidebar.Pages.My_Tasks}</span>
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          {/* CONTENT */}
          <Menu.ItemGroup
            key="g2-content"
            title={App_Shell.Sidebar.Groups.Content}
            // @ts-ignore
            style={styles.menuItemGroupNotFirst}
          >
            {/* -- ITEMS (CLOTHING) */}
            <Menu.Item
              key={getBaseRouteWithoutForwardSlash(Routes.Items__Clothing)}
              style={styles.menuItem}
            >
              <Link to={Routes.Items__Clothing}>
                <SkinOutlined />
                <span>{App_Shell.Sidebar.Pages.Items}</span>
              </Link>
            </Menu.Item>
            {/* -- ITEM FAMILIES */}
            <Menu.Item
              disabled
              key={getBaseRouteWithoutForwardSlash(Routes.Item_Families)}
              style={styles.menuItem}
            >
              <Link to={Routes.Item_Families}>
                <SkinOutlined />
                <span>{App_Shell.Sidebar.Pages.Item_Families}</span>
              </Link>
            </Menu.Item>
            {/* -- COMPANIES */}
            <Menu.Item
              key={getBaseRouteWithoutForwardSlash(Routes.Companies)}
              style={styles.menuItem}
            >
              <Link to={Routes.Companies}>
                <ShopOutlined />
                <span>{App_Shell.Sidebar.Pages.Companies}</span>
              </Link>
            </Menu.Item>
            {/* -- COLLECTIONS */}
            <Menu.Item
              disabled
              key={getBaseRouteWithoutForwardSlash(Routes.Collections)}
              style={styles.menuItem}
            >
              <Link to={Routes.Collections}>
                <FolderOpenOutlined />
                <span>{App_Shell.Sidebar.Pages.Collections}</span>
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          {/* FRAMEWORK */}
          <Menu.ItemGroup
            key="g3-framework"
            title={App_Shell.Sidebar.Groups.Framework}
            // @ts-ignore
            style={styles.menuItemGroupNotFirst}
          >
            {/* -- HEURISTIC ITEMS TODO: MOVE DOWN LATER TO ENUMS */}
            <Menu.Item
              key={getBaseRouteWithoutForwardSlash(Routes.Heuristic_Items)}
              style={styles.menuItem}
            >
              <Link to={Routes.Heuristic_Items}>
                <SkinOutlined />
                <span>{App_Shell.Sidebar.Pages.Heuristic_Items}</span>
              </Link>
            </Menu.Item>
            {/* -- CLOTHING SHELLS */}
            <Menu.Item
              key={getBaseRouteWithoutForwardSlash(Routes.Clothing_Shells)}
              style={styles.menuItem}
            >
              <Link to={Routes.Clothing_Shells}>
                <GoldOutlined />
                <span>{App_Shell.Sidebar.Pages.Clothing_Shells}</span>
              </Link>
            </Menu.Item>
            {/* -- FABRIC LAYERS */}
            <Menu.Item
              key={getBaseRouteWithoutForwardSlash(Routes.Fabric_Layers)}
              style={styles.menuItem}
            >
              <Link to={Routes.Fabric_Layers}>
                <BlockOutlined />
                <span>{App_Shell.Sidebar.Pages.Fabric_Layers}</span>
              </Link>
            </Menu.Item>
            {/* -- COLOURS */}
            <Menu.Item
              disabled
              key={getBaseRouteWithoutForwardSlash(Routes.Colours)}
              style={styles.menuItem}
            >
              <Link to={Routes.Colours}>
                <BgColorsOutlined />
                <span>{App_Shell.Sidebar.Pages.Colours}</span>
              </Link>
            </Menu.Item>
            {/* -- MATERIALS */}
            {/*<Menu.Item*/}
            {/*  disabled*/}
            {/*  key={getBaseRouteWithoutForwardSlash(Routes.MATERIALS)}*/}
            {/*  style={styles.menuItem}*/}
            {/*>*/}
            {/*  <Link to={Routes.MATERIALS}>*/}
            {/*    <GoldOutlined />*/}
            {/*    <span>{App_Shell.Sidebar.Pages.MATERIALS}</span>*/}
            {/*  </Link>*/}
            {/*</Menu.Item>*/}
            {/* -- TEMPLATES */}
            <Menu.Item
              disabled
              key={getBaseRouteWithoutForwardSlash(Routes.Templates)}
              style={styles.menuItem}
            >
              <Link to={Routes.Templates}>
                <LayoutOutlined />
                <span>{App_Shell.Sidebar.Pages.Templates}</span>
              </Link>
            </Menu.Item>
            {/* -- LOCALISATIONS */}
            <Menu.Item
              key={getBaseRouteWithoutForwardSlash(Routes.Localisations)}
              style={styles.menuItem}
            >
              <Link to={Routes.Localisations}>
                <GlobalOutlined />
                <span>{App_Shell.Sidebar.Pages.Localisations}</span>
              </Link>
            </Menu.Item>
            {/* -- ENUMS GROUP */}
            <SubMenu key="enums" icon={<ProfileOutlined />} title="Enums">
              {/* ---- BODY SEGMENTS */}
              <Menu.Item
                key={getBaseRouteWithoutForwardSlash(Routes.Body_Segments)}
                style={styles.menuItem}
              >
                <Link to={Routes.Body_Segments}>
                  <ClusterOutlined />
                  <span>{App_Shell.Sidebar.Pages.Body_Segments}</span>
                </Link>
              </Menu.Item>
              {/* ---- BASE COLOURS */}
              <Menu.Item
                key={getBaseRouteWithoutForwardSlash(Routes.Base_Colours)}
                style={styles.menuItem}
              >
                <Link to={Routes.Base_Colours}>
                  <BgColorsOutlined />
                  <span>{App_Shell.Sidebar.Pages.Base_Colours}</span>
                </Link>
              </Menu.Item>
              {/* ---- MASK SHAPES */}
              <Menu.Item
                key={getBaseRouteWithoutForwardSlash(Routes.Mask_Shapes)}
                style={styles.menuItem}
              >
                <Link to={Routes.Mask_Shapes}>
                  <GatewayOutlined />
                  <span>{App_Shell.Sidebar.Pages.Mask_Shapes}</span>
                </Link>
              </Menu.Item>
              {/* ---- FABRIC TYPES */}
              <Menu.Item
                key={getBaseRouteWithoutForwardSlash(Routes.Fabric_Types)}
                style={styles.menuItem}
              >
                <Link to={Routes.Fabric_Types}>
                  <LayoutOutlined />
                  <span>{App_Shell.Sidebar.Pages.Fabric_Types}</span>
                </Link>
              </Menu.Item>
              {/* ---- MATERIALS */}
              <Menu.Item
                key={getBaseRouteWithoutForwardSlash(Routes.Materials)}
                style={styles.menuItem}
              >
                <Link to={Routes.Materials}>
                  <GoldOutlined />
                  <span>{App_Shell.Sidebar.Pages.Materials}</span>
                </Link>
              </Menu.Item>
              {/* ---- COUNTRIES */}
              <Menu.Item
                key={getBaseRouteWithoutForwardSlash(Routes.Countries)}
                style={styles.menuItem}
              >
                <Link to={Routes.Countries}>
                  <GlobalOutlined />
                  <span>{App_Shell.Sidebar.Pages.Countries}</span>
                </Link>
              </Menu.Item>
              {/* ---- LANGUAGES */}
              <Menu.Item
                key={getBaseRouteWithoutForwardSlash(Routes.Languages)}
                style={styles.menuItem}
              >
                <Link to={Routes.Languages}>
                  <TranslationOutlined />
                  <span>{App_Shell.Sidebar.Pages.Languages}</span>
                </Link>
              </Menu.Item>
              {/* ---- ITEM FEATURES */}
              <Menu.Item
                disabled
                key={getBaseRouteWithoutForwardSlash(Routes.Item_Features)}
                style={styles.menuItem}
              >
                <Link to={Routes.Item_Features}>
                  <AimOutlined />
                  <span>{App_Shell.Sidebar.Pages.Item_Features}</span>
                </Link>
              </Menu.Item>
              {/* ---- OTHER */}
              <Menu.Item
                key={getBaseRouteWithoutForwardSlash(Routes.Other_Enums)}
                style={styles.menuItem}
              >
                <Link to={Routes.Other_Enums}>
                  <ContainerOutlined />
                  <span>{App_Shell.Sidebar.Pages.Other_Enums}</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu.ItemGroup>
          {/* ADMINISTRATIVE */}
          <Menu.ItemGroup
            key="g4-administrative"
            title={App_Shell.Sidebar.Groups.Administrative}
            // @ts-ignore
            style={styles.menuItemGroupNotFirst}
          >
            <Menu.Item
              disabled
              key={getBaseRouteWithoutForwardSlash(Routes.Settings)}
              style={styles.menuItem}
            >
              <Link to={Routes.Settings}>
                <SettingOutlined />
                <span>{App_Shell.Sidebar.Pages.Settings}</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              key={getBaseRouteWithoutForwardSlash(Routes.Users)}
              style={styles.menuItem}
            >
              <Link to={Routes.Users}>
                <UserOutlined />
                <span>{App_Shell.Sidebar.Pages.Users}</span>
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.Divider
            style={{
              opacity: 0.2,
            }}
          />
          <Menu.ItemGroup
            key="copyright"
            title="© 2020 FashionApp"
            // @ts-ignore
            style={{
              ...styles.menuItemGroupNotFirst,
              opacity: 0.65,
            }}
          />
        </Menu>
      </Scrollbars>
    </Sider>
  );
}

export { Sidebar };
