import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ColumnOfFrames } from '../../components/common/frames/ColumnOfFrames';
import { LocalisationSidebar } from '../../components/common/localisation/LocalisationSidebar/_LocalisationSidebar';
import { useLocation, useParams } from 'react-router-dom';
import { getSomePartsOfUrl } from '../../utils/getSomePartsOfUrl';
import qs from 'qs';
import { getRouteTab } from '../../utils/getRouteTab';
import { LocalisationDashboardTab } from '../../components/company/localisations/LocalisationDashboardTab/_LocalisationDashboardTab';
import { LocalisationContentTab } from '../../components/company/localisations/LocalisationContentTab/_LocalisationContentTab';
import { Insert_Company_Translation_Revision } from '../../queries/company_translation_revisions/insertCompanyTranslationRevision';
import { Insert_Company_Translation_Revision_Change } from '../../queries/company_translation_revision_changes/insertCompanyTranslationRevisionChange';
import { Insert_Company_Translation_Blank_Draft } from '../../queries/company_translations/insertCompanyTranslationBlankDraft';
import { Update_Item_Updated_At } from '../../queries/items/updateItemUpdatedAt';
import { Get_Company_Translation_Revisions } from '../../queries/company_translation_revisions/getCompanyTranslationRevisions';

function LocalisationsTab() {
  const Url_Number_Of_Parts = 5;

  const location = useLocation();
  // console.error("location:", location.pathname);

  const optionalParams = qs.parse(location.search, { ignoreQueryPrefix: true });
  const paramsRevision = optionalParams.rev
    ? optionalParams.rev.toString()
    : '1';
  const paramsIsRelease = optionalParams.release
    ? optionalParams.release.toString()
    : 'false';

  const [showPopupAddLocale, setShowPopupAddLocale] = useState(false);
  // The tab's url path of this localisations page, initialised only once at
  // the start of this page's creation (needs to be once only otherwise
  // navigation between the dashboard and locale pages fail)
  const [tabPath] = useState(
    getSomePartsOfUrl(location.pathname, Url_Number_Of_Parts)
  );

  const [hasChangesMade, setHasChangesMade] = useState(false);
  // @ts-ignore
  const { id } = useParams();

  const { loading, error, data, refetch: refetchCompanyTransRevs } = useQuery(
    Get_Company_Translation_Revisions,
    {
      variables: { id: Number.parseInt(id) },
    }
  );

  if (loading) return <div />;
  if (error) return <div>Error! ${JSON.stringify(error, null, 2)}</div>;
  console.log('data 2:', data);

  // Convert the latest translations map object into an array
  const latestTranslationRevisions = data.getCompanyTranslationRevisions.map(
    (translationRevision: any) => {
      console.log('translationRevision:', translationRevision);
      const {
        id,
        locale_code,
        revision,
        company_translations,
      } = translationRevision;
      // Create a url that we can load the latest revision with
      // const pathNoRelease = `${tabPath}/${locale_code}/?id=${id}&rev=${revision}&release=`;
      const pathNoRelease = `${tabPath}/${locale_code}/?rev=${revision}&release=`;
      // Set is release to either its actual value (true or false), or if we
      // can't find it, play it safe and assume that it would be false (a
      // revision SHOULD have at least a draft version, i.e. is_release = false)
      // We are selecting the first item (array index 0), typically is the
      // most latest version (i.e. the release version)
      const path = `${pathNoRelease}${
        company_translations.length > 0
          ? company_translations[0].is_release
          : false
      }`;
      // console.log("Path:", path);
      return { ...translationRevision, path, pathNoRelease };
    }
  );
  console.log('latestTranslationRevisions:', latestTranslationRevisions);

  // Get the locales data from each most latest translation to display in
  // the sidebar
  const translationLocales: any[] = [];
  latestTranslationRevisions.forEach((translation: any) => {
    // console.log("translation 1:", translation);
    const { locale, path, state, company_translations } = translation;

    translationLocales.push({
      ...locale,
      path,
      state,
      numberOfTranslations: company_translations.length,
    });
  });
  console.log('translationLocales:', translationLocales);

  const currentTab = getRouteTab(location.pathname, Url_Number_Of_Parts);

  const currentRevision = latestTranslationRevisions.find(
    // @ts-ignore
    ({ locale_code }) => locale_code.toString() === currentTab
  );

  return (
    <>
      <ColumnOfFrames freeWidth>
        <LocalisationSidebar
          entryId={id}
          tabPath={tabPath}
          urlNumberOfParts={Url_Number_Of_Parts}
          locales={translationLocales}
          refetchTranslationRevisions={refetchCompanyTransRevs}
          invalidPath={!currentRevision}
          mutationInsertTranslationRevision={
            Insert_Company_Translation_Revision
          }
          mutationInsertTranslationRevisionChange={
            Insert_Company_Translation_Revision_Change
          }
          mutationInsertTranslationBlankDraft={
            Insert_Company_Translation_Blank_Draft
          }
          mutationUpdateDataEntryUpdatedAt={Update_Item_Updated_At}
        />
      </ColumnOfFrames>
      {currentTab === '/' || !currentRevision ? (
        <LocalisationDashboardTab
          companyId={id}
          latestTranslations={latestTranslationRevisions}
          tabPath={tabPath}
          urlNumberOfParts={Url_Number_Of_Parts}
        />
      ) : (
        <LocalisationContentTab
          companyId={id}
          currentTab={currentTab}
          // currentRevision={currentRevision}
          // @ts-ignore
          setHasChangesMade={setHasChangesMade}
          paramsRevision={paramsRevision}
          paramsIsRelease={paramsIsRelease}
          location={location}
          refetchCompanyTransRevs={refetchCompanyTransRevs}
        />
      )}
    </>
  );
}

export { LocalisationsTab };
