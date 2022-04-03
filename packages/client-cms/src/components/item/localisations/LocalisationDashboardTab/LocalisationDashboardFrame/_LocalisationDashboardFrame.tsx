import React, { useEffect, useState } from 'react';
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
import { AssociatedMediaSectionView } from './AssociatedMediaSectionView';
import { UnsavedChangesCard } from '../../../../common/UnsavedChangesCard';

const { Content } = Layout;

interface LocalisationDashboardFrameProps {
  id: number;
  latestTranslations: any;
  // mediaItemAssociated: [];
  defaultMediaItemAssociated: [];
  // refetchMediaItemAssociated: Function;
  tabPath: string;
  // setMediaItemIds: Function;
}

function LocalisationDashboardFrame({
  id,
  latestTranslations,
  defaultMediaItemAssociated,
  // mediaItemAssociated,
  // refetchMediaItemAssociated,
  tabPath,
}: // setMediaItemIds,
LocalisationDashboardFrameProps) {
  console.log('defaultMediaItemAssociated:', defaultMediaItemAssociated);
  const [mediaItemIds, setMediaItemIds] = useState<string[]>([]);
  const [prevMediaItemIds, setPrevMediaItemIds] = useState<string[]>([]);

  useEffect(() => {
    const ids = defaultMediaItemAssociated.map(({ id }) => id);
    setMediaItemIds(ids);
    setPrevMediaItemIds(ids);
  }, [defaultMediaItemAssociated]);

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

  interface changesProps {
    associatedMediaIds?: boolean | null;
  }

  // An object tracking the changes amongst all variables
  // If the frame and its buttons are disabled, then changes are ignored so
  // that there aren't any visual changes (if any changes were to actually
  // occur)
  const hasChanged: changesProps = {
    associatedMediaIds: mediaItemIds !== prevMediaItemIds,
  };

  // Do not count changes if this frame and its buttons are disabled
  // This is so that the save changes popup on the bottom of the screen
  // won't ever appear (if frame is disabled)
  let numberOfChanges = 0;
  // if (translationRelease && translationRelease.revision !== latestRevision) {
  Object.keys(hasChanged).forEach((key) => {
    // @ts-ignore
    if (hasChanged[key]) {
      numberOfChanges++;
    }
  });

  const discardChanges = () => {
    setMediaItemIds(prevMediaItemIds);
  };

  const saveChanges = async () => {};

  return (
    <>
      <UnsavedChangesCard
        numberOfChanges={numberOfChanges}
        discardChanges={discardChanges}
        saveChanges={saveChanges}
      />
      <Content
        style={{
          padding: 16,
          background: '#fff',
        }}
      >
        <FrameTitle text="Localisation Dashboard" />
        <LocalisationsTable
          item_translations={sortedLocales}
          tabPath={tabPath}
        />
        <p />
        {/*<FrameTitleLevel2 text="Associated Media" />*/}
        <AssociatedMediaSectionView
          id={id}
          defaultMediaItemAssociated={defaultMediaItemAssociated}
          mediaItemIds={mediaItemIds}
          prevMediaItemIds={prevMediaItemIds}
          // mediaItemAssociated={mediaItemAssociated}
          // refetchMediaItemAssociated={refetchMediaItemAssociated}
          setMediaItemIds={setMediaItemIds}
        />
      </Content>
    </>
  );
}

export { LocalisationDashboardFrame };
