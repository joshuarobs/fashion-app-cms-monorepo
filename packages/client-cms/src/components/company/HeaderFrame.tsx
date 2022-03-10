/**
 * Figma reference:
 * Components/Items/Header Frame
 */

import React from 'react';
import { PageHeader } from 'antd';
import { useLocation } from 'react-router-dom';
import { RouteStrings } from '../../routeStrings';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getCurrentPageTabName } from '../../utils/getCurrentPageTabName';
import { HeaderFrameTabs } from '../common/HeaderFrameTabs';
import { getBaseRouteWithoutForwardSlash } from '../../utils/getBaseRouteWithoutForwardSlash';
import { OverviewTabIcon } from '../common/icons/tab-icons/OverviewTabIcon';
import { ItemsTabIcon } from '../common/icons/tab-icons/ItemsTabIcon';
import { CollectionsTabIcon } from '../common/icons/tab-icons/CollectionsTabIcon';
import { LocalisationsTabIcon } from '../common/icons/tab-icons/LocalisationsTabIcon';
import { ChangeHistoryTabIcon } from '../common/icons/tab-icons/ChangeHistoryTabIcon';
import { SettingsTabIcon } from '../common/icons/tab-icons/SettingsTabIcon';

dayjs.extend(relativeTime);

interface HeaderFrameProps {
  data: any;
}

function HeaderFrame({ data }: HeaderFrameProps) {
  const {
    id,
    name,
    logo_url,
    created_at,
    updated_at,
    counts,
    company_translation_revisions_aggregate,
    items_aggregate,
    collections_aggregate,
  } = data;

  const { pathname } = useLocation();
  const currentTab = getCurrentPageTabName(pathname);
  console.log('currentTab:', currentTab);

  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        backgroundColor: '#fff',
      }}
      title={name}
      avatar={{
        src: logo_url,
        shape: 'square',
      }}
      subTitle={'id: ' + id}
      footer={
        <HeaderFrameTabs
          currentTab={currentTab}
          tabs={[
            {
              to: `${RouteStrings.Companies__Company}/${id}`,
              icon: <OverviewTabIcon />,
              name: 'Overview',
              key: 1,
            },
            {
              to: `${RouteStrings.Companies__Company}/${id}${RouteStrings.Items}`,
              icon: <ItemsTabIcon />,
              name: 'Items',
              count: (counts && counts.item_count) ?? 0,
              key: getBaseRouteWithoutForwardSlash(RouteStrings.Items),
            },
            {
              to: `${RouteStrings.Companies__Company}/${id}${RouteStrings.Collections}`,
              icon: <CollectionsTabIcon />,
              name: 'Collections',
              count: collections_aggregate.aggregate.count,
              key: getBaseRouteWithoutForwardSlash(RouteStrings.Collections),
            },
            {
              to: `${RouteStrings.Companies__Company}/${id}${RouteStrings.Localisations}`,
              icon: <LocalisationsTabIcon />,
              name: 'Localisations',
              count: company_translation_revisions_aggregate.aggregate.count,
              key: getBaseRouteWithoutForwardSlash(RouteStrings.Localisations),
            },
            {
              to: `${RouteStrings.Companies__Company}/${id}${RouteStrings.Change_History}`,
              icon: <ChangeHistoryTabIcon />,
              name: 'Change History',
              key: getBaseRouteWithoutForwardSlash(RouteStrings.Change_History),
            },
            {
              to: `${RouteStrings.Companies__Company}/${id}${RouteStrings.Settings}`,
              icon: <SettingsTabIcon />,
              name: 'Settings',
              key: getBaseRouteWithoutForwardSlash(RouteStrings.Settings),
            },
          ]}
        />
      }
    />
  );
}

export { HeaderFrame };
