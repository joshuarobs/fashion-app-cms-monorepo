import React, { useState } from 'react';
import { Layout } from 'antd';
import { FrameTitle } from '../../../../common/typography/FrameTitle';
import { LocalisationsTable } from './LocalisationsTable';
import { Locale_Sidebar_Order } from '../../../../common/localisation/LocalisationSidebar/localeSidebarOrders';
import { FrameTitleLevel2 } from '../../../../common/typography/FrameTitleLevel2';
import { AssociatedMediaSection } from './AssociatedMediaSection';
import { useQuery } from '@apollo/client';
import { Get_Item_Translation_Revisions } from '../../../../../queries/item_translation_revisions/getItemTranslationRevisions';
import { Get_Item_And_Media_Item_Associated_For_Item_Id } from '../../../../../queries/item_and_media_item_associated/getItemAndMediaItemAssociatedForItemId';
import { Simulate } from 'react-dom/test-utils';

const { Content } = Layout;

interface LocalisationDashboardFrameProps {
  id: number;
  latestTranslations: any;
  mediaItemAssociated: [];
  refetchMediaItemAssociated: Function;
  tabPath: string;
  // setMediaItemIds: Function;
}

function LocalisationDashboardFrame({
  id,
  latestTranslations,
  mediaItemAssociated,
  refetchMediaItemAssociated,
  tabPath,
}: // setMediaItemIds,
LocalisationDashboardFrameProps) {
  const [mediaItemIds, setMediaItemIds] = useState([]);

  // const {
  //   loading: loadingItemAndMediaItemAssociated,
  //   error: errorItemAndMediaItemAssociated,
  //   data: dataItemAndMediaItemAssociated,
  //   refetch: refetchItemAndMediaItemAssociated,
  // } = useQuery(Get_Item_And_Media_Item_Associated_For_Item_Id, {
  //   variables: { id },
  //   fetchPolicy: 'network-only',
  // });
  //
  // if (loadingItemAndMediaItemAssociated) return <div />;
  // if (errorItemAndMediaItemAssociated) {
  //   console.error(errorItemAndMediaItemAssociated);
  //   return <div>{errorItemAndMediaItemAssociated}</div>;
  // }

  // console.log(
  //   'dataItemAndMediaItemAssociated:',
  //   dataItemAndMediaItemAssociated
  // );

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
      <AssociatedMediaSection
        id={id}
        mediaItemAssociated={mediaItemAssociated}
        refetchMediaItemAssociated={refetchMediaItemAssociated}
        setMediaItemIds={setMediaItemIds}
      />
    </Content>
  );
}

export { LocalisationDashboardFrame };
