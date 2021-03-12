import React from 'react';
import { ColumnOfFrames } from '../../../common/frames/ColumnOfFrames';
import { ItemLocalisationStateFrame } from './ItemLocalisationStateFrame';
import { LocalisationActivityFrame } from './LocalisationFrame/LocalisationActivityFrame';
import { useQuery } from '@apollo/client';
import { Layout } from 'antd';
import { StateFrame } from '../../../common/frames/StateFrame/_StateFrame';
import { LocalisationFrame } from './LocalisationFrame/_LocalisationFrame';
import { Get_Item_Translations_Given_Unique_Keys } from '../../../../queries/item_translations/getItemTranslationsGivenUniqueKeys';
import { Get_Item_Translation_Revisions_Given_Locale_Code } from '../../../../queries/item_translation_revisions/getItemTranslationRevisionsGivenLocaleCode';

const { Content } = Layout;

interface LocalisationContentTabProps {
  itemId: number;
  currentTab: string;
  // currentRevision: any;
  // setHasChangesMade: Function;
  paramsRevision: any;
  paramsIsRelease: string;
  location: any;
  refetchItemTransRevs: Function;
}

function LocalisationContentTab({
  itemId,
  currentTab,
  // currentRevision,
  // setHasChangesMade,
  paramsRevision,
  paramsIsRelease,
  location,
  refetchItemTransRevs,
}: LocalisationContentTabProps) {
  const {
    loading: loadingTranslations,
    error: errorTranslations,
    data: dataTranslations,
    refetch: refetchTranslations,
  } = useQuery(Get_Item_Translations_Given_Unique_Keys, {
    variables: {
      // revisionId: paramsRevisionId
      revision: paramsRevision,
      itemId,
      localeCode: currentTab,
    },
  });

  const {
    loading: loadingRevisions,
    error: errorRevisions,
    data: dataRevisions,
    refetch: refetchRevisions,
  } = useQuery(Get_Item_Translation_Revisions_Given_Locale_Code, {
    variables: {
      itemId,
      localeCode: currentTab,
    },
  });

  let mainFrameToDisplay = null;
  let stateFrameToDisplay = null;

  if (loadingTranslations || loadingRevisions) {
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
  } else if (errorTranslations) {
    mainFrameToDisplay = <div>{`Error! ${errorTranslations}`}</div>;
  } else if (errorRevisions) {
    mainFrameToDisplay = <div>{`Error! ${errorRevisions}`}</div>;
  } else {
    const translations = dataTranslations.item_translations;
    const uniqueRevisions = dataRevisions.item_translation_revisions;

    // console.error("translations!:", translations);
    mainFrameToDisplay = (
      // <LocalisationFrame
      //   translations={translations}
      //   itemId={itemId}
      //   currentTab={currentTab}
      //   currentRevision={currentRevision}
      //   setHasChangesMade={setHasChangesMade}
      //   location={location}
      //   paramsRevision={paramsRevision}
      //   paramsIsRelease={paramsIsRelease}
      // />
      <LocalisationFrame
        // translation={translation}
        translationDraft={translations[0] ? translations[0] : null}
        translationRelease={translations[1] ? translations[1] : null}
        itemId={itemId}
        currentTab={currentTab}
        // currentRevision={currentRevision}
        location={location}
        translationRevision={uniqueRevisions[0] ? uniqueRevisions[0] : null}
        paramsRevision={paramsRevision}
        paramsIsRelease={paramsIsRelease}
        uniqueRevisions={uniqueRevisions}
        refetchRevisions={refetchRevisions}
        refetchTranslations={refetchTranslations}
      />
    );
    stateFrameToDisplay = (
      <ItemLocalisationStateFrame
        currentTab={currentTab}
        // currentRevision={currentRevision}
        // translations={translations}
        itemId={itemId}
        paramsRevision={paramsRevision}
        refetchTranslations={refetchTranslations}
        refetchItemTransRevs={refetchItemTransRevs}
        uniqueRevisions={uniqueRevisions}
      />
    );
  }

  return (
    <>
      <ColumnOfFrames freeWidth>{mainFrameToDisplay}</ColumnOfFrames>
      <ColumnOfFrames>
        {stateFrameToDisplay}
        <LocalisationActivityFrame currentTab={currentTab} itemId={itemId} />
      </ColumnOfFrames>
    </>
  );
}

export { LocalisationContentTab };
