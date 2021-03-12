import React from 'react';
import { Layout } from 'antd';
import { FrameTitle } from '../../../../common/typography/FrameTitle';
import { LocalisationsTable } from './LocalisationsTable';
import { Locale_Sidebar_Order } from '../../../../common/localisation/LocalisationSidebar/localeSidebarOrders';

const { Content } = Layout;

interface LocalisationDashboardFrameProps {
  latestTranslations: any;
  tabPath: any;
}

function LocalisationDashboardFrame({
  latestTranslations,
  tabPath,
}: LocalisationDashboardFrameProps) {
  // Sort the translations so they appear in order, like they do in the sidebar
  const sortedTranslations: any[] = [];
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
  const sortedLocales = sortedTranslations.sort((a, b) =>
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
      <LocalisationsTable item_translations={sortedLocales} />
    </Content>
  );
}

export { LocalisationDashboardFrame };
