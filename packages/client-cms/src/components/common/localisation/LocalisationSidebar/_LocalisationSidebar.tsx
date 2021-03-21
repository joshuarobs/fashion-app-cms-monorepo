import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
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
import { getRouteTab } from '../../../../utils/getRouteTab';
import { Locale_Sidebar_Order } from './localeSidebarOrders';
import { PopupSelectLocale } from './PopupSelectLocale';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Common } from '../../../../strings';
import { DataChangeType, DataState } from '@joshuarobs/clothing-enums';
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
  },
};

const key = 'item-localisations-sidebar';

interface LocalisationSidebarProps {
  entryId: number;
  tabPath: string;
  urlNumberOfParts: number;
  locales: any;
  refetchTranslationRevisions: any;
  invalidPath: any;
  mutationInsertTranslationRevision: any;
  mutationInsertTranslationRevisionChange: any;
  mutationInsertTranslationBlankDraft: any;
  mutationUpdateDataEntryUpdatedAt: any;
}

function LocalisationSidebar({
  entryId,
  tabPath,
  urlNumberOfParts = 6,
  locales,
  refetchTranslationRevisions,
  invalidPath,
  mutationInsertTranslationRevision,
  mutationInsertTranslationRevisionChange,
  mutationInsertTranslationBlankDraft,
  mutationUpdateDataEntryUpdatedAt,
}: LocalisationSidebarProps) {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  };

  console.log('MY TAB PATH:', tabPath);

  // Hooks for GraphQL queries
  const [updateItemUpdatedAt] = useMutation(mutationUpdateDataEntryUpdatedAt, {
    onCompleted() {},
  });

  const [
    insertTranslationBlankDraft,
    { loading: loadingInsertTransBlank, error: errorInsertTransBlank },
  ] = useMutation(mutationInsertTranslationBlankDraft, {
    onCompleted() {},
  });

  const [
    insertTranslationRevisionChange,
    {
      loading: loadingChangePromoDevelopment,
      error: errorChangePromoDevelopment,
    },
  ] = useMutation(mutationInsertTranslationRevisionChange, {
    onCompleted() {},
  });

  const [
    insertTranslationRevision,
    {
      loading: loadingInsertTransRev,
      error: errorInsertTransRev,
      data: dataInsertTransRev,
    },
  ] = useMutation(mutationInsertTranslationRevision, {
    notifyOnNetworkStatusChange: true,
    async onCompleted({
      insert_item_translation_revisions_one,
      insert_company_translation_revisions_one,
    }) {
      // const {
      //   id,
      //   locale_code,
      //   revision
      // } = insert_item_translation_revisions_one;
      let id, locale_code, revision;
      if (insert_item_translation_revisions_one) {
        id = insert_item_translation_revisions_one.id;
        locale_code = insert_item_translation_revisions_one.locale_code;
        revision = insert_item_translation_revisions_one.revision;
      } else if (insert_company_translation_revisions_one) {
        id = insert_company_translation_revisions_one.id;
        locale_code = insert_company_translation_revisions_one.locale_code;
        revision = insert_company_translation_revisions_one.revision;
      }
      await refetchTranslationRevisions();
      await insertTranslationBlankDraft({
        variables: {
          revisionId: id,
        },
      });
      // const variables = ;
      await insertTranslationRevisionChange({
        variables: {
          revisionId: id,
          userId: 1,
          changeType: DataChangeType.Promotion,
          toState: DataState.Development,
          // action: DATA_ACTIONS.CREATE
        },
      });

      await updateItemUpdatedAt({
        variables: {
          id: entryId,
        },
      });

      // Redirect to the page
      setShowModal(false);
      history.push(`${tabPath}/${locale_code}/?rev=${revision}&release=false`);
      message.success(
        {
          content: Common.Added_New_Locale,
          key,
        },
        2
      );
    },
  });

  const selectLocale = async (code: string) => {
    message.loading({ content: Common.Adding_New_Locale, key });
    const variables = {
      localeCode: code,
      entryId,
      revision: 1,
    };
    await insertTranslationRevision({ variables });
  };

  const onCancel = () => {
    setShowModal(false);
  };

  const location = useLocation();
  const [currentTab, setCurrentTab] = useState('');
  useEffect(() => {
    if (invalidPath) {
      setCurrentTab('/');
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
              >
                <Link to={`${tabPath}`}>Locale Dashboard</Link>
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
                    const {
                      name,
                      code,
                      path,
                      state,
                      numberOfTranslations,
                    } = locale;
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
                            {name}
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
              Add Locale
            </Button>
          </Row>
        </div>
      </Content>
    </>
  );
}

export { LocalisationSidebar };
