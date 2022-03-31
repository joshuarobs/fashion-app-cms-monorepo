import React from 'react';
import { Layout } from 'antd';
import { FrameTitle } from '../../../../common/typography/FrameTitle';
import { LocalisationsTable } from './LocalisationsTable';
import { Locale_Sidebar_Order } from '../../../../common/localisation/LocalisationSidebar/localeSidebarOrders';
import { FrameTitleLevel2 } from '../../../../common/typography/FrameTitleLevel2';
import { AssociatedMediaSection } from './AssociatedMediaSection';

const { Content } = Layout;

interface LocalisationDashboardFrameProps {
  latestTranslations: any;
  mediaItemAssociated: [];
  tabPath: string;
}

function LocalisationDashboardFrame({
  latestTranslations,
  mediaItemAssociated,
  tabPath,
}: LocalisationDashboardFrameProps) {
  // Sort the translations so they appear in order, like they do in the sidebar
  const sortedTranslations: any = [];
  latestTranslations.forEach((translation: any) => {
    const { locale_code } = translation;
    // console.log("translation 2:", translation);

    // Add a custom order for locales to sort them later in the sidebar
    // @ts-ignore
    const order = Locale_Sidebar_Order[locale_code];

    sortedTranslations.push({
      ...translation,
      order,
    });
  });

  // Sort the locales by their order
  const sortedLocales = sortedTranslations.sort((a: any, b: any) =>
    a.order > b.order ? 1 : -1
  );

  return (
    <Content
      style={{
        padding: 16,
        background: '#fff',
      }}
    >
      <FrameTitle text="Localisation Dashboard" />
      <LocalisationsTable item_translations={sortedLocales} tabPath={tabPath} />
      <p />
      {/*<FrameTitleLevel2 text="Associated Media" />*/}
      <AssociatedMediaSection mediaItemAssociated={mediaItemAssociated} />
    </Content>
  );
}

export { LocalisationDashboardFrame };
