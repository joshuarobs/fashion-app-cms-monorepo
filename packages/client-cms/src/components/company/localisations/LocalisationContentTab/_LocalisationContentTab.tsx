import React from 'react';
import { ColumnOfFrames } from '../../../common/frames/ColumnOfFrames';
import { CompanyLocalisationStateFrame } from './CompanyLocalisationStateFrame';
import { LocalisationActivityFrame } from './LocalisationFrame/LocalisationActivityFrame';
import { gql, useQuery } from '@apollo/client';
import { Layout } from 'antd';
import { StateFrame } from '../../../common/frames/StateFrame/_StateFrame';
import { LocalisationFrame } from './LocalisationFrame/_LocalisationFrame';
import { Get_Company_Translations_Given_Unique_Keys } from '../../../../queries/company_translations/getCompanyTranslationsGivenUniqueKeys';
import { Get_Company_Translation_Revisions_By_Locale_Code } from '../../../../queries/company_translation_revisions/getCompanyTranslationRevisionsByLocaleCode';

const { Content } = Layout;

interface LocalisationContentTabProps {
  companyId: number;
  currentTab: string;
  currentRevision: number;
  paramsRevision: string;
  paramsIsRelease: string;
  location: any;
  refetchCompanyTransRevs: Function;
}

function LocalisationContentTab({
  companyId,
  currentTab,
  currentRevision,
  paramsRevision,
  paramsIsRelease,
  location,
  refetchCompanyTransRevs,
}: LocalisationContentTabProps) {
  const {
    loading: loadingTranslations,
    error: errorTranslations,
    data: dataTranslations,
    refetch: refetchTranslations,
  } = useQuery(Get_Company_Translations_Given_Unique_Keys, {
    variables: {
      // revisionId: paramsRevisionId
      revision: paramsRevision,
      companyId,
      localeCode: currentTab,
    },
  });

  const {
    loading: loadingRevisions,
    error: errorRevisions,
    data: dataRevisions,
    refetch: refetchRevisions,
  } = useQuery(Get_Company_Translation_Revisions_By_Locale_Code, {
    variables: {
      companyId,
      localeCode: currentTab,
    },
  });

  let mainFrameToDisplay;
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
    const translations = dataTranslations.company_translations;
    const uniqueRevisions = dataRevisions.company_translation_revisions;

    // console.error("translations!:", translations);
    mainFrameToDisplay = (
      <LocalisationFrame
        translationDraft={translations[0] ? translations[0] : null}
        translationRelease={translations[1] ? translations[1] : null}
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
      <CompanyLocalisationStateFrame
        currentTab={currentTab}
        // currentRevision={currentRevision}
        translations={translations}
        companyId={companyId}
        paramsRevision={paramsRevision}
        refetchTranslations={refetchTranslations}
        refetchCompanyTransRevs={refetchCompanyTransRevs}
        uniqueRevisions={uniqueRevisions}
      />
    );
  }

  return (
    <>
      <ColumnOfFrames freeWidth>{mainFrameToDisplay}</ColumnOfFrames>
      <ColumnOfFrames>
        {stateFrameToDisplay}
        <LocalisationActivityFrame
          currentTab={currentTab}
          companyId={companyId}
        />
      </ColumnOfFrames>
    </>
  );
}

export { LocalisationContentTab };
