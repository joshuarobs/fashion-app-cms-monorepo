import React from 'react';
import { ColumnOfFrames } from '../../../common/frames/ColumnOfFrames';
import { ItemGlobalMediaStateFrame } from './ItemGlobalMediaStateFrame';
import { GlobalMediaActivityFrame } from './GlobalMediaActivityFrame';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Layout } from 'antd';
import { StateFrame } from '../../../common/frames/StateFrame/_StateFrame';
import { GlobalMediaFrame } from './GlobalMediaFrame';
import { Get_Item_Translations_Given_Unique_Keys } from '../../../../queries/item_translations/getItemTranslationsGivenUniqueKeys';
import { Get_Item_Translation_Revisions_Given_Locale_Code } from '../../../../queries/item_translation_revisions/getItemTranslationRevisionsGivenLocaleCode';
import { Get_Item_Global_Media_Revisions_Given_Item_Id } from '../../../../queries/item_global_media_revisions/getItemGlobalMediaRevisionsGivenItemId';
import { Get_Item_Global_Media_Given_Unique_Keys } from '../../../../queries/item_global_media/getItemGlobalMediaGivenUniqueKeys';
import { Get_Media_Items_By_Ids } from '../../../../queries/media_items/getMediaItemsByIds';

const { Content } = Layout;

interface GlobalMediaTabProps {
  itemId?: string;
  currentTab: string;
  defaultMediaItemAssociated: [];
  // currentRevision: any;
  // setHasChangesMade: Function;
  paramsRevision: any;
  paramsIsRelease: string;
  location: any;
  refetchItemTransRevs: Function;
}

function GlobalMediaTab({
  itemId,
  currentTab,
  defaultMediaItemAssociated,
  // currentRevision,
  // setHasChangesMade,
  paramsRevision,
  paramsIsRelease,
  location,
  refetchItemTransRevs,
}: GlobalMediaTabProps) {
  // const {
  //   loading: loadingTranslations,
  //   error: errorTranslations,
  //   data: dataTranslations,
  //   refetch: refetchTranslations,
  // } = useQuery(Get_Item_Translations_Given_Unique_Keys, {
  //   variables: {
  //     // revisionId: paramsRevisionId
  //     revision: Number.parseInt(paramsRevision),
  //     itemId: Number.parseInt(String(itemId)),
  //     localeCode: currentTab,
  //   },
  // });
  //
  // const {
  //   loading: loadingRevisions,
  //   error: errorRevisions,
  //   data: dataRevisions,
  //   refetch: refetchRevisions,
  // } = useQuery(Get_Item_Translation_Revisions_Given_Locale_Code, {
  //   variables: {
  //     itemId: Number.parseInt(String(itemId)),
  //     localeCode: currentTab,
  //   },
  //   fetchPolicy: 'network-only',
  // });

  const {
    loading: loadingGlobalMedia,
    error: errorGlobalMedia,
    data: dataGlobalMedia,
    refetch: refetchGlobalMedia,
  } = useQuery(Get_Item_Global_Media_Given_Unique_Keys, {
    variables: {
      // revisionId: paramsRevisionId
      revision: Number.parseInt(paramsRevision),
      item_id: Number.parseInt(String(itemId)),
    },
  });

  const {
    loading: loadingRevisions,
    error: errorRevisions,
    data: dataRevisions,
    refetch: refetchRevisions,
  } = useQuery(Get_Item_Global_Media_Revisions_Given_Item_Id, {
    variables: {
      item_id: Number.parseInt(String(itemId)),
    },
    fetchPolicy: 'network-only',
  });

  const [
    getMediaItemsByIds,
    {
      loading: loadingMediaItemsByIds,
      error: errorMediaItemsByIds,
      data: dataMediaItemsByIds,
    },
  ] = useLazyQuery(Get_Media_Items_By_Ids, {
    // variables: { ids: mediaItemIds },
    fetchPolicy: 'network-only',
  });

  // const {
  //   loading: loadingMediaItemsByIds,
  //   error: errorMediaItemsByIds,
  //   data: dataMediaItemsByIds,
  //   refetch: refetchMediaItemsByIds,
  // } = useQuery(Get_Media_Items_By_Ids, {
  //   variables: { ids: mediaItemIds },
  //   fetchPolicy: 'network-only',
  //   // fetchPolicy: 'cache-and-network',
  // });

  let mainFrameToDisplay = null;
  let stateFrameToDisplay = null;

  if (loadingGlobalMedia || loadingRevisions) {
    mainFrameToDisplay = (
      <Content
        style={{
          background: '#fff',
          minWidth: 586,
          minHeight: 400,
        }}
      />
    );
    stateFrameToDisplay = <StateFrame />;
  } else if (errorGlobalMedia) {
    mainFrameToDisplay = (
      <div>{`Error! (Translations) ${JSON.stringify(
        errorGlobalMedia,
        null,
        2
      )}`}</div>
    );
  } else if (errorRevisions) {
    mainFrameToDisplay = (
      <div>{`Error! (Revisions)${JSON.stringify(
        errorRevisions,
        null,
        2
      )}`}</div>
    );
  } else {
    console.log('else');
    console.log('dataRevisions:', dataRevisions);
    console.log('dataGlobalMedia:', dataGlobalMedia);
    const globalMedia = dataGlobalMedia.getItemGlobalMediaGivenUniqueKeys;
    const uniqueRevisions =
      dataRevisions.getItemGlobalMediaRevisionsGivenItemId;

    // console.error("translations!:", translations);
    mainFrameToDisplay = (
      <GlobalMediaFrame
        // translation={translation}
        globalMediaDraft={globalMedia[0] ? globalMedia[0] : null}
        globalMediaRelease={globalMedia[1] ? globalMedia[1] : null}
        defaultMediaItemAssociated={defaultMediaItemAssociated}
        itemId={itemId}
        currentTab={currentTab}
        // currentRevision={currentRevision}
        location={location}
        translationRevision={uniqueRevisions[0] ? uniqueRevisions[0] : null}
        paramsRevision={paramsRevision}
        paramsIsRelease={paramsIsRelease}
        uniqueRevisions={uniqueRevisions}
        refetchRevisions={refetchRevisions}
        refetchTranslations={refetchGlobalMedia}
      />
      // <div>test</div>
    );
    stateFrameToDisplay = (
      <ItemGlobalMediaStateFrame
        currentTab={currentTab}
        // currentRevision={currentRevision}
        // translations={translations}
        itemId={itemId}
        paramsRevision={paramsRevision}
        refetchTranslations={refetchGlobalMedia}
        refetchItemTransRevs={refetchItemTransRevs}
        uniqueRevisions={[]}
        refetchUniqueRevisions={() => {}}
      />
    );
  }

  return (
    <>
      <ColumnOfFrames freeWidth>{mainFrameToDisplay}</ColumnOfFrames>
      <ColumnOfFrames>
        {stateFrameToDisplay}
        <GlobalMediaActivityFrame currentTab={currentTab} itemId={itemId} />
      </ColumnOfFrames>
    </>
  );
}

export { GlobalMediaTab };
