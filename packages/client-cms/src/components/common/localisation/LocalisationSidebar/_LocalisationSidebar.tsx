import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  Layout,
  Menu,
  Tabs,
  Typography,
  message,
} from 'antd';
import { DashboardOutlined, PictureOutlined } from '@ant-design/icons';
import { getRouteTab } from '../../../../utils/getRouteTab';
import { Locale_Sidebar_Order } from './localeSidebarOrders';
import { PopupSelectLocale } from './PopupSelectLocale';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Common } from '../../../../strings';
import { LocaleStateDot } from '../LocaleStateDot';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Title, Text } = Typography;

const size = 'small';

const cssStyles = {
  menuTab: {
    // borderRadius: 3,
    userSelect: 'none',
    margin: 0,
    maxWidth: 223.5,
  },
};

const key = 'item-localisations-sidebar';

interface LocalisationSidebarProps {
  entryId?: string;
  tabPath: string;
  urlNumberOfParts: number;
  locales: any;
  latestGlobalMediaRevision: any;
  refetchTranslationRevisions: any;
  invalidPath: any;
  mutationInsertTranslationRevision: any;
}

function LocalisationSidebar({
  entryId,
  tabPath,
  urlNumberOfParts = 6,
  locales,
  latestGlobalMediaRevision,
  refetchTranslationRevisions,
  invalidPath,
  mutationInsertTranslationRevision,
}: LocalisationSidebarProps) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  };

  // console.log('MY TAB PATH:', tabPath);

  // Hooks for GraphQL queries
  const [
    insertTranslationRevision,
    {
      loading: loadingInsertTransRev,
      error: errorInsertTransRev,
      data: dataInsertTransRev,
    },
  ] = useMutation(mutationInsertTranslationRevision, {
    notifyOnNetworkStatusChange: true,
    async onCompleted() {},
  });

  const selectLocale = async (code: string) => {
    message.loading({ content: Common.Adding_New_Locale, key });
    const variables = {
      item_id: Number.parseInt(String(entryId)),
      locale_code: code,
      // revision: 1,
    };
    const data = await insertTranslationRevision({ variables });
    console.log('!!!data2:', data.data.insertItemTranslationRevisionAddLocale);
    // // Redirect to the page
    setShowModal(false);
    const { locale_code, revision } =
      data.data.insertItemTranslationRevisionAddLocale;
    console.error(
      'tab:',
      `${tabPath}/${locale_code}/?rev=${revision}&release=false`
    );
    navigate(`${tabPath}/${locale_code}/?rev=${revision}&release=false`);
    history.go(0);
    message.success(
      {
        content: Common.Added_New_Locale,
        key,
      },
      2
    );
  };

  const onCancel = () => {
    setShowModal(false);
  };

  const location = useLocation();
  const [currentTab, setCurrentTab] = useState('');
  useEffect(() => {
    if (invalidPath) {
      if (getRouteTab(location.pathname, urlNumberOfParts) === 'global-media') {
        setCurrentTab('/global-media');
      } else {
        setCurrentTab('/');
      }
    } else {
      setCurrentTab(getRouteTab(location.pathname, urlNumberOfParts));
    }
  }, [location]);
  // console.log("location:", location.pathname);
  //
  console.log('Current tab:', currentTab);
  console.log('tabPath:', tabPath);
  // console.error(
  //   getRouteTab(
  //     `${ROUTES.ITEMS__CLOTHING__ITEM}/${3}${ROUTES.LOCALISATIONS}/us`
  //   )
  // );

  const newLocales: any[] = [];
  locales.forEach((locale: any) => {
    const { code } = locale;

    // Add a custom order for locales to sort them later in the sidebar
    // @ts-ignore
    const order = Locale_Sidebar_Order[code];

    newLocales.push({
      ...locale,
      order,
    });
  });

  // Sort the locales by their order
  const sortedLocales = newLocales.sort((a, b) => (a.order > b.order ? 1 : -1));
  console.log('sortedLocales:', sortedLocales);

  return (
    <>
      <PopupSelectLocale
        visible={showModal}
        hidePopup={onCancel}
        locales={locales}
        selectLocale={selectLocale}
      />
      <Content
        style={{
          background: '#fff',
          maxWidth: '240px',
          // margin: "0px 12px 0px 12px"
        }}
      >
        <div
          style={{
            padding: 16,
            background: '#fff',
            borderRadius: 4,
          }}
        >
          <Row>
            <Col span={12}>
              <Text strong>General</Text>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: 8,
            }}
          >
            <Menu
              mode="inline"
              style={{ width: 240, border: 0 }}
              selectedKeys={[currentTab]}
            >
              <Menu.Item
                key={getRouteTab(`${tabPath}`, urlNumberOfParts)}
                // @ts-ignore
                style={cssStyles.menuTab}
                icon={<DashboardOutlined />}
              >
                <Link to={`${tabPath}`}>
                  {Common.Localisation_Related.Locale_Dashboard}
                </Link>
              </Menu.Item>
              <Menu.Item
                key={'/global-media'}
                // @ts-ignore
                style={cssStyles.menuTab}
                icon={<PictureOutlined />}
              >
                <Link to={`${latestGlobalMediaRevision.path}`}>
                  {Common.Localisation_Related.Global_Media}
                </Link>
              </Menu.Item>
            </Menu>
          </Row>
          {sortedLocales.length > 0 && (
            <>
              <Row
                style={{
                  marginTop: 12,
                }}
              >
                <Col span={12}>
                  <Text strong>Locales</Text>
                </Col>
              </Row>
              <Row>
                <Menu
                  mode="inline"
                  selectedKeys={[currentTab]}
                  style={{ width: 240, marginTop: 8, border: 0 }}
                >
                  {sortedLocales.map((locale) => {
                    const { name, code, path, state, numberOfTranslations } =
                      locale;
                    console.log('locale:', locale);
                    return (
                      // @ts-ignore
                      <Menu.Item key={code} style={cssStyles.menuTab}>
                        <div>
                          <Link to={path}>
                            <LocaleStateDot
                              state={state}
                              useTableCellStyling
                              isError={numberOfTranslations === 0}
                            />
                            <span style={{ marginRight: 8 }}>
                              {name.substring(0, 4)}
                            </span>
                            <span>{name.substring(5, name.length)}</span>
                          </Link>
                        </div>
                      </Menu.Item>
                    );
                  })}
                </Menu>
              </Row>
            </>
          )}
          <Row style={{ marginTop: 24 }}>
            <Button block onClick={onClick}>
              {Common.Localisation_Related.Add_Locale}
            </Button>
          </Row>
        </div>
      </Content>
    </>
  );
}

export { LocalisationSidebar };
