/**
 * Figma reference:
 * Components/Items/Header Frame
 */

import React from 'react';
import { PageHeader, Typography } from 'antd';
import { RouteStrings } from '../../routeStrings';
import { NavLink, useLocation } from 'react-router-dom';
import { getCurrentPageTabName } from '../../utils/getCurrentPageTabName';
import { getBaseRouteWithoutForwardSlash } from '../../utils/getBaseRouteWithoutForwardSlash';
import { HeaderFrameTabs } from '../common/HeaderFrameTabs';
import { OverviewTabIcon } from '../common/icons/tab-icons/OverviewTabIcon';
import { BodySegmentsTabIcon } from '../common/icons/tab-icons/BodySegmentsTabIcon';
import { ItemsTabIcon } from '../common/icons/tab-icons/ItemsTabIcon';
import { ChangeHistoryTabIcon } from '../common/icons/tab-icons/ChangeHistoryTabIcon';
import { SettingsTabIcon } from '../common/icons/tab-icons/SettingsTabIcon';
import { Common } from '../../strings';

const { Text } = Typography;

interface HeaderFrameProps {
  data: any;
}

function HeaderFrame({ data }: HeaderFrameProps) {
  const { pathname } = useLocation();
  const currentTab = getCurrentPageTabName(pathname);
  console.log('currentTab:', currentTab);

  const {
    id,
    clothing_shell_maindata_revisions,
    clothing_shell_translation_revisions_aggregate,
  } = data;

  const name =
    clothing_shell_maindata_revisions[0] &&
    clothing_shell_maindata_revisions[0].clothing_shell_maindata[0]
      ? clothing_shell_maindata_revisions[0].clothing_shell_maindata[0].name
      : null;

  const latestRevision = clothing_shell_maindata_revisions[0]
    ? clothing_shell_maindata_revisions[0].revision
    : 1;

  const logo_url =
    'https://pm1.narvii.com/6923/24e9471327fea2908547acc8593d945e06b7e1e9r1-620-435v2_128.jpg';
  const counts = {
    clothing_shell_count: 0,
  };

  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        backgroundColor: '#fff',
      }}
      title={name ? name : <Text type="danger">{Common.No_Set_Name}</Text>}
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
              to: `${RouteStrings.Clothing_Shells__Clothing_Shell}/${id}?rev=${latestRevision}`,
              icon: <OverviewTabIcon />,
              name: 'Overview',
              key: 1,
            },
            // {
            //   to: `${Routes.Clothing_Shells__Clothing_Shell}/${id}${Routes.Body_Segments}`,
            //   icon: <BodySegmentsTabIcon />,
            //   name: 'Body Segments',
            //   count: clothing_shell_and_body_segment_masks.length,
            //   key: getBaseRouteWithoutForwardSlash(Routes.Body_Segments),
            // },
            {
              to: `${RouteStrings.Clothing_Shells__Clothing_Shell}/${id}${RouteStrings.Items_Implemented_In}`,
              icon: <ItemsTabIcon />,
              name: 'Items Implemented In',
              count: counts ? counts.clothing_shell_count : 0,
              key: getBaseRouteWithoutForwardSlash(
                RouteStrings.Items_Implemented_In
              ),
            },
            {
              to: `${RouteStrings.Clothing_Shells__Clothing_Shell}/${id}${RouteStrings.Change_History}`,
              icon: <ChangeHistoryTabIcon />,
              name: 'Change History',
              key: getBaseRouteWithoutForwardSlash(RouteStrings.Change_History),
            },
            {
              to: `${RouteStrings.Clothing_Shells__Clothing_Shell}/${id}${RouteStrings.Settings}`,
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
