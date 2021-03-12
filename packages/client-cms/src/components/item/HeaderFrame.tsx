/**
 * Figma reference:
 * Components/Item/Header Frame
 */

import React from 'react';
import { PageHeader, Typography } from 'antd';
import { Routes } from '../../routes';
import { Link, useLocation } from 'react-router-dom';
import { HeaderFrameTabs } from '../common/HeaderFrameTabs';
import { getBaseRouteWithoutForwardSlash } from '../../utils/getBaseRouteWithoutForwardSlash';
import { getCurrentPageTabName } from '../../utils/getCurrentPageTabName';
import { OverviewTabIcon } from '../common/icons/tab-icons/OverviewTabIcon';
import { LocalisationsTabIcon } from '../common/icons/tab-icons/LocalisationsTabIcon';
import { ChangeHistoryTabIcon } from '../common/icons/tab-icons/ChangeHistoryTabIcon';
import { SettingsTabIcon } from '../common/icons/tab-icons/SettingsTabIcon';
import { Common } from '../../strings';

const { Text } = Typography;

const routes = [
  {
    path: Routes.Items__Clothing,
    breadcrumbName: 'Items',
  },
  {
    path: Routes.Items__Clothing + '/1',
    breadcrumbName: 'Clothes',
  },
  {
    path: Routes.Items__Clothing + '/2',
    breadcrumbName: 'Outerwear',
  },
  {
    path: Routes.Items__Clothing + '/3',
    breadcrumbName: 'Shoes',
  },
  {
    breadcrumbName: 'Last item',
  },
];

const cssStyles = {
  toolTip: {
    borderBottom: '1px dotted #AAA',
    paddingBottom: 2,
  },
};

interface HeaderFrameProps {
  data: any;
}

function HeaderFrame({ data }: HeaderFrameProps) {
  const { pathname } = useLocation();
  const currentTab = getCurrentPageTabName(pathname, 5);
  console.log('currentTab:', currentTab);

  const {
    id,
    item_maindata_revisions,
    item_translation_revisions_aggregate,
  } = data;

  const name =
    item_maindata_revisions[0] && item_maindata_revisions[0].item_maindata[0]
      ? item_maindata_revisions[0].item_maindata[0].name
      : null;

  // const latestRevision = item_maindata_revisions[0].revision;
  const latestRevision = item_maindata_revisions[0]
    ? item_maindata_revisions[0].revision
    : 1;

  // TODO: Put a red alert if there is some missing fields, e.g. the short_id
  function itemRender(route: any, params: any, routes: any, paths: any) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      // @ts-ignore
      <Text strong>{name}</Text>
    ) : (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    );
  }

  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        backgroundColor: '#fff',
      }}
      title={name ? name : <Text type="danger">{Common.No_Set_Name}</Text>}
      avatar={{
        src:
          'https://pm1.narvii.com/6923/24e9471327fea2908547acc8593d945e06b7e1e9r1-620-435v2_128.jpg',
        shape: 'square',
      }}
      subTitle={'id: ' + id}
      // @ts-ignore
      breadcrumb={{ routes, itemRender, separator: '>' }}
      footer={
        <HeaderFrameTabs
          currentTab={currentTab}
          tabs={[
            {
              to: `${Routes.Items__Clothing__Item}/${id}?rev=${latestRevision}`,
              icon: <OverviewTabIcon />,
              name: 'Overview',
              key: 1,
            },
            // {
            //   to: `${ROUTES.ITEMS__CLOTHING__ITEM}/${id}${ROUTES.BODY_SEGMENTS}`,
            //   icon: <BodySegmentsIcon />,
            //   name: "Body Segments",
            //   // count: clothing_shell_and_body_segment_masks.length,
            //   key: getBaseRouteWithoutForwardSlash(ROUTES.BODY_SEGMENTS)
            // },
            {
              to: `${Routes.Items__Clothing__Item}/${id}${Routes.Localisations}`,
              icon: <LocalisationsTabIcon />,
              name: 'Localisations',
              count: item_translation_revisions_aggregate.aggregate.count,
              key: getBaseRouteWithoutForwardSlash(Routes.Localisations),
            },
            {
              to: `${Routes.Items__Clothing__Item}/${id}${Routes.Change_History}`,
              icon: <ChangeHistoryTabIcon />,
              name: 'Change History',
              key: getBaseRouteWithoutForwardSlash(Routes.Change_History),
            },
            {
              to: `${Routes.Items__Clothing__Item}/${id}${Routes.Settings}`,
              icon: <SettingsTabIcon />,
              name: 'Settings',
              key: getBaseRouteWithoutForwardSlash(Routes.Settings),
            },
          ]}
        />
      }
    />
  );
}

export { HeaderFrame };
