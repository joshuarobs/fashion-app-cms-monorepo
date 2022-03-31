import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { ColumnOfFrames } from '../../components/common/frames/ColumnOfFrames';
import { LocalisationSidebar } from '../../components/common/localisation/LocalisationSidebar/_LocalisationSidebar';
import { useLocation, useParams } from 'react-router-dom';
import { getSomePartsOfUrl } from '../../utils/getSomePartsOfUrl';
import { useQuery } from '@apollo/client';
import { getRouteTab } from '../../utils/getRouteTab';
import { LocalisationDashboardTab } from '../../components/item/localisations/LocalisationDashboardTab/_LocalisationDashboardTab';
import { LocalisationContentTab } from '../../components/item/localisations/LocalisationContentTab/_LocalisationContentTab';
import { Insert_Item_Translation_Revision_Add_Locale } from '../../queries/item_translation_revisions/insertItemTranslationRevisionAddLocale';
import { Insert_Item_Translation_Revision_Change } from '../../queries/item_translation_revision_changes/insertItemTranslationRevisionChange';
import { Insert_Item_Translation_Blank_Draft } from '../../queries/item_translations/insertItemTranslationBlankDraft';
import { Update_Item_Updated_At } from '../../queries/items/updateItemUpdatedAt';
import { Get_Item_Translation_Revisions } from '../../queries/item_translation_revisions/getItemTranslationRevisions';
import { GlobalMediaTab } from '../../components/item/localisations/GlobalMediaTab/_GlobalMediaTab';
import { Get_Item_And_Media_Item_Associated_For_Item_Id } from '../../queries/item_and_media_item_associated/getItemAndMediaItemAssociatedForItemId';

// const GET_ITEM_TRANSLATIONS = gql`
//   query getItemTranslations($id: Int!) {
//     item_translations(where: { item_id: { _eq: $id } }) {
//       item_id
//       locale_code
//       is_release
//       revision
//       release_type
//       locale {
//         code
//         name
//         country {
//           description
//         }
//         language {
//           description
//         }
//       }
//       full_name
//       short_name
//       description
//     }
//   }
// `;

function LocalisationsTab() {
  const Url_Number_Of_Parts = 6;

  const location = useLocation();

  console.log('BASE location:', location);

  const optionalParams = qs.parse(location.search, { ignoreQueryPrefix: true });
  const paramsRevision = optionalParams.rev ? optionalParams.rev : 1;
  const paramsIsRelease = optionalParams.release === 'true' ? 'true' : 'false';
  // console.log("paramsIsRelease:", paramsIsRelease);
  // console.log("test:", test);

  // const [showPopupAddLocale, setShowPopupAddLocale] = useState(false);

  // The tab's url path of this localisations page, initialised only once at
  // the start of this page's creation (needs to be once only otherwise
  // navigation between the dashboard and locale pages fail)
  // const [tabPath, setTabPath] = useState('');
  const [tabPath] = useState(
    getSomePartsOfUrl(location.pathname, Url_Number_Of_Parts)
  );

  // Dilemma: If we put this, it may fix some issues with bugged
  // reloading of localisation content, and redirection of page when
  // creating a new locale. But navigation between the locales will flash
  // the page and make it look annoying to look at.
  // Note 2: It flashes anyway with or without this
  // useEffect(() => {
  //   setTabPath(getSomePartsOfUrl(location.pathname, Url_Number_Of_Parts));
  // }, [tabPath]);

  const [hasChangesMade, setHasChangesMade] = useState(false);

  // @ts-ignore
  const { id } = useParams();
  // console.log("id:", id);

  const {
    loading: loadingTranslationRevisions,
    error: errorTranslationRevisions,
    data: dataTranslationRevisions,
    refetch: refetchItemTransRevs,
  } = useQuery(Get_Item_Translation_Revisions, {
    variables: { id: Number.parseInt(String(id)) },
    fetchPolicy: 'network-only',
  });

  const {
    loading: loadingMediaItemAssociated,
    error: errorMediaItemAssociated,
    data: dataMediaItemAssociated,
    refetch: refetchMediaItemAssociated,
  } = useQuery(Get_Item_And_Media_Item_Associated_For_Item_Id, {
    variables: { id: Number.parseInt(String(id)) },
    fetchPolicy: 'network-only',
  });

  if (loadingTranslationRevisions || loadingMediaItemAssociated) return <div />;
  if (errorTranslationRevisions) {
    return (
      <div>Error! ${JSON.stringify(errorTranslationRevisions, null, 2)}</div>
    );
  }

  if (errorMediaItemAssociated) {
    return (
      <div>Error! ${JSON.stringify(errorMediaItemAssociated, null, 2)}</div>
    );
  }
  console.log(
    'LocalisationsTab#dataTranslationRevisions:',
    dataTranslationRevisions,
    '| LocalisationsTab#dataMediaItemAssociated:',
    dataMediaItemAssociated
  );

  // const item_translation_revisions = data.item_translation_revisions;
  // console.log("item_translation_revisions:", item_translation_revisions);

  // Convert the latest translations map object into an array
  const latestTranslationRevisions =
    dataTranslationRevisions.getItemTranslationRevisions.map(
      (translationRevision: any) => {
        console.log('translationRevision:', translationRevision);
        const { locale_code, revision, item_translations } =
          translationRevision;
        // Create a url that we can load the latest revision with
        // const pathNoRelease = `${tabPath}/${locale_code}/?id=${id}&rev=${revision}&release=`;
        const pathNoRelease = `${tabPath}/${locale_code}/?rev=${revision}&release=`;
        // Set is release to either its actual value (true or false), or if we
        // can't find it, play it safe and assume that it would be false (a
        // revision SHOULD have at least a draft version, i.e. is_release = false)
        // We are selecting the first item (array index 0), typically is the
        // most latest version (i.e. the release version)
        const path = `${pathNoRelease}${
          item_translations.length > 0 ? item_translations[0].is_release : false
        }`;
        // console.log("Path:", path);
        return { ...translationRevision, path, pathNoRelease };
      }
    );
  console.log('latestTranslationRevisions:', latestTranslationRevisions);

  // Get the locales data from each most latest translation to display in
  // the sidebar
  const translationLocales: any = [];
  latestTranslationRevisions.forEach((translation: any) => {
    // console.log("translation 1:", translation);
    const { locale, path, state, item_translations } = translation;

    translationLocales.push({
      ...locale,
      path,
      state,
      numberOfTranslations: item_translations.length,
    });
  });
  console.log('translationLocales:', translationLocales);

  const currentTab = getRouteTab(location.pathname, Url_Number_Of_Parts);

  // Get the current translation group object for tbe current locale tab
  // (This is useless and doesn't apply if the user is on the dashboard page)
  // const [currentRevision, setCurrentRevision] = useState(null);
  // useEffect(() => {
  //   setCurrentRevision(
  //     latestTranslationRevisions.find(
  //       ({ locale_code }) => locale_code.toString() === currentTab
  //     )
  //   );
  // }, [currentTab]);

  // TODO: Cleaner version with ts
  // const currentRevision = latestTranslationRevisions.find((revision: any) => {
  //   const { locale_code } = revision;
  //   return locale_code.toString() === currentTab;
  // });

  const currentRevision = latestTranslationRevisions.find(
    // @ts-ignore
    ({ locale_code }) => locale_code.toString() === currentTab
  );

  // console.error(
  //   "currentRevision:",
  //   currentRevision,
  //   "\ncurrentTab:",
  //   currentTab
  // );

  // ------------------------------
  // Locale Dashboard
  // ------------------------------
  let contentToShow = (
    <LocalisationDashboardTab
      itemId={id}
      latestTranslations={latestTranslationRevisions}
      mediaItemAssociated={
        dataMediaItemAssociated.getItemAndMediaItemAssociatedForItemId
      }
      tabPath={tabPath}
      urlNumberOfParts={Url_Number_Of_Parts}
    />
  );

  // ------------------------------
  // Locales
  // ------------------------------
  if (currentTab !== '/' && currentRevision) {
    contentToShow = (
      <LocalisationContentTab
        itemId={id}
        currentTab={currentTab}
        // currentRevision={currentRevision}
        // setHasChangesMade={setHasChangesMade}
        paramsRevision={paramsRevision}
        paramsIsRelease={paramsIsRelease}
        location={location}
        refetchItemTransRevs={refetchItemTransRevs}
      />
    );
  }
  // ------------------------------
  // Global Media
  // ------------------------------
  else if (currentTab === 'global-media') {
    contentToShow = (
      <GlobalMediaTab
        itemId={id}
        currentTab={currentTab}
        paramsRevision={paramsRevision}
        paramsIsRelease={paramsIsRelease}
        location={location}
        refetchItemTransRevs={refetchItemTransRevs}
      />
    );
  }

  return (
    <>
      <ColumnOfFrames freeWidth>
        <LocalisationSidebar
          entryId={id}
          tabPath={tabPath}
          urlNumberOfParts={Url_Number_Of_Parts}
          locales={translationLocales}
          // @ts-ignore
          hasChangesMade={hasChangesMade}
          refetchTranslationRevisions={refetchItemTransRevs}
          invalidPath={!currentRevision}
          mutationInsertTranslationRevision={
            Insert_Item_Translation_Revision_Add_Locale
          }
        />
      </ColumnOfFrames>
      {contentToShow}
    </>
  );
}

export { LocalisationsTab };
