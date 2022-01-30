import React, { useState } from 'react';
// import ItemChangeHistoryFrame from "../../components/item/change-history";
import { gql, useQuery } from '@apollo/client';
import { AllActivityFrame } from '../../components/common/activity/AllActivityFrame';
import { Layout, Tabs } from 'antd';
import { ColumnOfFrames } from '../../components/common/frames/ColumnOfFrames';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  FileSyncOutlined,
  GlobalOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import { HeaderTabLinkCountBadge } from '../../components/common/HeaderTabLinkCountBadge';
import { RouteStrings } from '../../routeStrings';
import { getRouteTab } from '../../utils/getRouteTab';
import { Get_Item_Revision_Changes_Aggregates } from '../../queries/getItemRevisionChangesAggregates';
import { Get_Item_Maindata_Revision_Changes } from '../../queries/item_maindata_revision_changes/getItemMaindataRevisionChanges';
import { Get_Item_Translation_Revision_Changes } from '../../queries/item_translation_revision_changes/getItemTranslationRevisionChanges';

const { TabPane } = Tabs;

enum Tab {
  All = 'All',
  Maindata = 'Maindata',
  Localisations = 'Localisations',
}

function ChangeHistoryTab() {
  const Url_Number_Of_Parts = 6;
  const limit = 50;
  const navigate = useNavigate();
  const location = useLocation();

  // @ts-ignore
  const { id } = useParams();
  const itemId = id ?? '';
  // console.log("id:", id);

  const currentTab = getRouteTab(location.pathname, Url_Number_Of_Parts);

  let keyFromCurrentTab = Tab.All;
  if (currentTab === RouteStrings.Main_Data.replace('/', '')) {
    keyFromCurrentTab = Tab.Maindata;
  } else if (currentTab === RouteStrings.Localisations.replace('/', '')) {
    keyFromCurrentTab = Tab.Localisations;
  }

  // console.log("BASE location:", location);
  console.log('currentTab:', currentTab);

  const {
    loading: loadingAggregates,
    error: errorAggregates,
    data: dataAggregates,
  } = useQuery(Get_Item_Revision_Changes_Aggregates, {
    variables: {
      itemId: parseInt(itemId),
    },
  });

  const {
    loading: loadingMaindata,
    error: errorMaindata,
    data: dataMaindata,
  } = useQuery(Get_Item_Maindata_Revision_Changes, {
    variables: {
      id: parseInt(itemId),
      limit,
    },
  });

  const {
    loading: loadingTranslations,
    error: errorTranslations,
    data: dataTranslations,
  } = useQuery(Get_Item_Translation_Revision_Changes, {
    variables: {
      id: parseInt(itemId),
      limit,
    },
  });

  if (loadingAggregates || loadingMaindata || loadingTranslations)
    return <div />;
  if (errorAggregates)
    return (
      <div>Error! (Aggregates) ${JSON.stringify(errorAggregates, null, 2)}</div>
    );
  if (errorMaindata)
    return (
      <div>Error! (Maindata) ${JSON.stringify(errorMaindata, null, 2)}</div>
    );
  if (errorTranslations)
    return (
      <div>
        Error! (Translations) ${JSON.stringify(errorTranslations, null, 2)}
      </div>
    );

  console.log('dataAggregates:', dataAggregates);
  const { getItemMaindataRevisionChanges } = dataMaindata;
  const { getItemTranslationRevisionChanges } = dataTranslations;
  const {
    item_maindata_revision_changes_aggregate,
    item_translation_revision_changes_aggregate,
  } = dataAggregates.getItemRevisionChangesAggregates;

  const maindataCount =
    item_maindata_revision_changes_aggregate.aggregate.count;
  const translationCount =
    item_translation_revision_changes_aggregate.aggregate.count;

  // console.log(
  //   "Activity - item_maindata_revision_changes:",
  //   item_maindata_revision_changes
  // );
  // console.log(
  //   "Activity - item_translation_revision_changes:",
  //   item_translation_revision_changes
  // );

  const allChanges = [
    ...getItemMaindataRevisionChanges,
    ...getItemTranslationRevisionChanges,
  ].sort((a, b) => (a.date < b.date ? 1 : -1));
  console.log('allChanges:', allChanges);

  const onChange = (key: string) => {
    // console.log("key:", key);
    switch (key) {
      case Tab.All:
        navigate(
          `${RouteStrings.Items__Clothing__Item}/${itemId}${RouteStrings.Change_History}`
        );
        break;
      case Tab.Maindata:
        navigate(
          `${RouteStrings.Items__Clothing__Item}/${itemId}${RouteStrings.Change_History}${RouteStrings.Main_Data}`
        );
        break;
      case Tab.Localisations:
        navigate(
          `${RouteStrings.Items__Clothing__Item}/${itemId}${RouteStrings.Change_History}${RouteStrings.Localisations}`
        );
        break;
    }
  };

  return (
    <>
      <ColumnOfFrames freeWidth>
        <Tabs
          activeKey={keyFromCurrentTab}
          tabPosition={'left'}
          style={{
            background: '#fff',
            paddingTop: 16,
            paddingBottom: 32,
          }}
          onChange={onChange}
        >
          <TabPane
            tab={
              <a className="page-tab-link">
                <FileSyncOutlined />
                All Activity
                <HeaderTabLinkCountBadge
                  count={maindataCount + translationCount}
                />
              </a>
            }
            key={Tab.All}
          />
          <TabPane
            tab={
              <a className="page-tab-link">
                <ProjectOutlined />
                Maindata
                <HeaderTabLinkCountBadge count={maindataCount} />
              </a>
            }
            key={Tab.Maindata}
            disabled={maindataCount === 0}
          />
          <TabPane
            tab={
              <a className="page-tab-link">
                <GlobalOutlined />
                Localisations
                <HeaderTabLinkCountBadge count={translationCount} />
              </a>
            }
            key={Tab.Localisations}
            disabled={translationCount === 0}
          />
        </Tabs>
      </ColumnOfFrames>
      <ColumnOfFrames fullWidth>
        {keyFromCurrentTab === Tab.All && (
          <AllActivityFrame changes={allChanges} showType isAllActivity />
        )}
        {keyFromCurrentTab === Tab.Maindata && (
          <AllActivityFrame
            changes={getItemMaindataRevisionChanges}
            showType
            isAllActivity
          />
        )}
        {keyFromCurrentTab === Tab.Localisations && (
          <AllActivityFrame
            changes={getItemTranslationRevisionChanges}
            showType
            isAllActivity
          />
        )}
      </ColumnOfFrames>
    </>
  );
}

export { ChangeHistoryTab };
