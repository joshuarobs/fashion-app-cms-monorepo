import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { DataState } from '@joshuarobs/clothing-enums';
import { StateFrame } from '../../../common/frames/StateFrame/_StateFrame';
import { Layout, message } from 'antd';
import { Common } from '../../../../strings';
import { useHistory } from 'react-router-dom';
import { Insert_Company_Translation_Revision } from '../../../../queries/company_translation_revisions/insertCompanyTranslationRevision';
import { Insert_Company_Translation_Revision_Change } from '../../../../queries/company_translation_revision_changes/insertCompanyTranslationRevisionChange';
import { Insert_Company_Translation_Blank_Draft } from '../../../../queries/company_translations/insertCompanyTranslationBlankDraft';
import { Insert_Company_Translation_Draft } from '../../../../queries/company_translations/insertCompanyTranslation';
import { Update_Company_Translation_Revision_To_Retired } from '../../../../queries/company_translation_revisions/updateCompanyTranslationRevisionToRetired';
import { Get_Company_Translation_Revision_Changes_Promos_Only } from '../../../../queries/company_translation_revision_changes/getCompanyTranslationRevisionChangesPromosOnly';
import { Update_Company_Translation_Revision_To_Review } from '../../../../queries/company_translation_revisions/updateCompanyTranslationRevisionToReview';
import { Insert_Company_Translation_Revision_Change_Promo_Review } from '../../../../queries/company_translation_revision_changes/insertCompanyTranslationRevisionChangePromoReview';
import { Insert_Company_Translation_Revision_Change_Promo_Production } from '../../../../queries/company_translation_revision_changes/insertCompanyTranslationRevisionChangePromoProduction';
import { Update_Company_Translation_Revision_To_Production } from '../../../../queries/company_translation_revisions/updateCompanyTranslationRevisionToProduction';
import { Insert_Company_Translation_Revision_Change_Promo_Retired } from '../../../../queries/company_translation_revision_changes/insertCompanyTranslationRevisionChangePromoRetired';

const { Content } = Layout;

const key = 'state-localisations';

interface CompanyLocalisationStateFrameProps {
  companyId: number;
  currentTab: string;
  paramsRevision: string;
  refetchTranslations?: Function;
  refetchCompanyTransRevs: Function;
  uniqueRevisions: any;
  translations: any;
}

function CompanyLocalisationStateFrame({
  companyId,
  currentTab,
  paramsRevision,
  refetchTranslations,
  refetchCompanyTransRevs,
  uniqueRevisions,
  translations,
}: CompanyLocalisationStateFrameProps) {
  const history = useHistory();
  console.log('STATE - history:', history);

  const [currentRevision, setCurrentRevision] = useState(uniqueRevisions[0]);
  const [state, setState] = useState(null);
  const [revision_id, setRevisionId] = useState(null);

  useEffect(() => {
    const matchingRevision = uniqueRevisions.find(
      // @ts-ignore
      ({ revision }) => revision === Number.parseInt(paramsRevision)
    );
    setCurrentRevision(matchingRevision);
    // setState(currentRevision ? currentRevision.state : null);
    setState(matchingRevision.state);
    setRevisionId(matchingRevision.id);
    console.log(
      'SET CURRENT REVISION:',
      currentRevision,
      '\nParams:',
      paramsRevision,
      '\nMatching revision:',
      matchingRevision,
      '\nUnique revs:',
      uniqueRevisions
    );
  }, [currentTab, paramsRevision]);

  //======================================================================
  // Hooks for GraphQL queries
  //======================================================================
  const { loading, error, data } = useQuery(
    Get_Company_Translation_Revision_Changes_Promos_Only,
    {
      variables: {
        companyId,
        localeCode: currentTab,
        revision: Number.parseInt(paramsRevision),
      },
    }
  );

  const [
    insertCompanyTranslationIsRelease,
    { loading: loadingInsertRelease, error: errorInsertRelease },
  ] = useMutation(Insert_Company_Translation_Draft, {
    onCompleted() {
      // TODO: Get the refetch from the content frame that loads all
      //  revisions and then call it
      // refetchTranslations();
      // const variables = {
      //   revisionId: currentRevision.id,
      //   userId: 1
      // };
      // insertItemTranslationRevisionChangeActUpdate({ variables }).then(r => {});
    },
    notifyOnNetworkStatusChange: true,
  });

  //==================================================
  // PROMOTE TO REVIEW
  //==================================================
  const [
    updateCompanyTranslationRevisionToReview,
    { loading: loadingUpdateRevisionReview, error: errorUpdateRevisionReview },
  ] = useMutation(Update_Company_Translation_Revision_To_Review, {
    onCompleted() {
      // Redirect to the page
      // history.push(`${pathNoRelease}true`);
      // message.success({
      //   content: COMMON.STATE_RELATED.PROMOTED_TO_REVIEW,
      //   key
      // });
    },
  });

  const [
    insertCompanyTranslationRevisionChangePromoReview,
    { loading: loadingChangePromoReview, error: errorChangePromoReview },
  ] = useMutation(Insert_Company_Translation_Revision_Change_Promo_Review, {
    onCompleted() {
      // Redirect to the page
      // history.push(`${pathNoRelease}true`);
      history.push(
        history.location.pathname +
          `?rev=${currentRevision.revision}&release=true`
      );
      message
        .success({
          content: Common.State_Related.Promoted_To_Review,
          key,
        })
        .then();
    },
  });

  //==================================================
  // PROMOTE TO PRODUCTION
  //==================================================
  const [
    updateCompanyTranslationRevisionToProduction,
    {
      loading: loadingUpdateRevisionProduction,
      error: errorUpdateRevisionProduction,
    },
  ] = useMutation(Update_Company_Translation_Revision_To_Production, {
    onCompleted() {
      // Refresh the page
      history.go(0);
      message
        .success({
          content: Common.State_Related.Promoted_To_Production,
          key,
        })
        .then();
    },
  });

  const [
    insertCompanyTranslationRevisionChangePromoProduction,
    {
      loading: loadingChangePromoProduction,
      error: errorChangePromoProduction,
    },
  ] = useMutation(Insert_Company_Translation_Revision_Change_Promo_Production, {
    onCompleted() {},
  });

  //==================================================
  // PROMOTE TO RETIRED
  //==================================================
  const [
    updateCompanyTranslationRevisionToRetired,
    {
      loading: loadingUpdateRevisionRetired,
      error: errorUpdateRevisionRetired,
    },
  ] = useMutation(Update_Company_Translation_Revision_To_Retired, {
    onCompleted() {},
  });

  const [
    insertCompanyTranslationRevisionChangePromoRetired,
    { loading: loadingChangePromoRetired, error: errorChangePromoRetired },
  ] = useMutation(Insert_Company_Translation_Revision_Change_Promo_Retired, {
    onCompleted() {},
  });

  //==================================================
  // NEW REVISION
  //==================================================
  // const [
  //   insertCompanyTranslationBlankDraft,
  //   { loading: loadingInsertTransBlank, error: errorInsertTransBlank },
  // ] = useMutation(Insert_Company_Translation_Blank_Draft, {
  //   onCompleted() {},
  // });

  const [
    insertCompanyTranslationRevisionChangePromoDevelopment,
    {
      loading: loadingChangePromoDevelopment,
      error: errorChangePromoDevelopment,
    },
  ] = useMutation(Insert_Company_Translation_Revision_Change, {
    onCompleted() {},
  });

  const [
    insertCompanyTranslationRevision,
    {
      loading: loadingInsertTransRev,
      error: errorInsertTransRev,
      data: dataInsertTransRev,
    },
  ] = useMutation(Insert_Company_Translation_Revision, {
    notifyOnNetworkStatusChange: true,
    onCompleted({ insert_company_translation_revisions_one }) {
      const {
        id,
        locale_code,
        revision,
      } = insert_company_translation_revisions_one;

      // console.log("!!!translationDraft:", translationDraft);
      // console.log("!!!translationRelease:", translationRelease);
      // 1. Create a release translation version
      // Somehow we're getting the previous version's release from the
      // "draft" variable, but that's just how it works
      const { stylised_name, short_name, bio } = translationDraft;
      // insertItemTranslationIsRelease({

      const variables = {
        revision_id: id,
        is_release: false,
        stylised_name,
        short_name,
        bio,
      };
      refetchCompanyTransRevs();
      insertCompanyTranslationIsRelease({ variables }).then(() => {
        const variables = {
          revisionId: id,
          userId: 1,
        };
        insertCompanyTranslationRevisionChangePromoDevelopment({
          variables,
        }).then(() => {
          // Redirect to the next revision
          history.push(
            history.location.pathname +
              `?rev=${currentRevision.revision + 1}&release=false`
          );
          message
            .success(
              {
                content: Common.State_Related.Created_New_Revision,
                key,
              },
              2
            )
            .then();
        });
      });
    },
  });

  if (!currentRevision) {
    return <StateFrame />;
  }

  console.log('Current Revision:', currentRevision);
  const translationDraft = currentRevision.company_translations[0];
  const translationRelease = currentRevision.company_translations[1];

  // const { pathNoRelease } = currentRevision;
  // console.log("REDIRECT TO:", pathNoRelease);

  const promoteToReview = () => {
    message
      .loading({ content: Common.State_Related.Promoting_To_Review, key })
      .then();
    // 1. Create a release translation version
    const { stylised_name, short_name, bio } = translationDraft;
    insertCompanyTranslationIsRelease({
      variables: {
        revision_id: currentRevision.id,
        is_release: true,
        stylised_name,
        short_name,
        bio,
      },
    }).then(() => {
      // 2. Update the company translation revision state to REVIEW
      updateCompanyTranslationRevisionToReview({
        variables: {
          revisionId: currentRevision.id,
        },
      }).then(() => {
        // 3. Create an activity entry
        insertCompanyTranslationRevisionChangePromoReview({
          variables: {
            revisionId: currentRevision.id,
            userId: 1,
          },
        }).then(() => {
          // Refresh the page
          history.go(0);
          console.log('!!!translationDraft:', translationDraft);
          console.log('!!!translationRelease:', translationRelease);
          console.log('translations:', translations);
        });
      });
    });
  };

  const promoteToProduction = () => {
    message
      .loading({
        content: Common.State_Related.Promoting_To_Production,
        key,
      })
      .then();
    // 1. Update the company translation revision state to PRODUCTION
    updateCompanyTranslationRevisionToProduction({
      variables: {
        revisionId: currentRevision.id,
      },
    })
      .then(() => {
        // 2. If there is a previous revision, retire it
        const matchingPreviousRevision = uniqueRevisions.find(
          // @ts-ignore
          ({ revision }) => revision === Number.parseInt(paramsRevision) - 1
        );
        console.log('matchingPreviousRevision:', matchingPreviousRevision);
        if (matchingPreviousRevision) {
          updateCompanyTranslationRevisionToRetired({
            variables: {
              revisionId: matchingPreviousRevision.id,
            },
          }).then();
          insertCompanyTranslationRevisionChangePromoRetired({
            variables: {
              revisionId: matchingPreviousRevision.id,
              userId: 1,
            },
          }).then();
        }
      })
      .then(() => {
        // 3. Create an activity entry
        insertCompanyTranslationRevisionChangePromoProduction({
          variables: {
            revisionId: currentRevision.id,
            userId: 1,
          },
        }).then();
      })
      .then(() => {
        // Refresh the page
        history.go(0);
      });
  };

  const newRevision = () => {
    message
      .loading({
        content: Common.State_Related.Creating_New_Revision,
        key,
      })
      .then();
    // console.log("currentRevision:", currentRevision);
    const { revision } = currentRevision;
    const variables = {
      localeCode: currentTab,
      entryId: companyId,
      revision: revision + 1,
    };
    insertCompanyTranslationRevision({ variables }).then();
  };

  if (loading) return <StateFrame />;
  if (error) return <div>Error! ${error}</div>;

  const { company_translation_revision_changes } = data;

  console.log(
    'company_translation_revision_changes:',
    company_translation_revision_changes
  );

  // Find each of the state's revision
  const changeToDevelopment = company_translation_revision_changes.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Development
  );
  const changeToReview = company_translation_revision_changes.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Review
  );
  const changeToProduction = company_translation_revision_changes.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Production
  );
  const changeToRetired = company_translation_revision_changes.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Retired
  );

  console.log('changeToDevelopment:', changeToDevelopment);
  console.log('changeToReview:', changeToReview);
  console.log('changeToProduction:', changeToProduction);
  console.log('changeToRetired:', changeToRetired);

  // Decide whether we hide the promote button regardless of state or not
  let overrideHidePromoteButton = false;
  // Disable it if there's a new revision already made, and we are in the
  // production state. No need to create another revision if there's already
  // an existing new one.
  const matchingNextRevision = uniqueRevisions.find(
    // @ts-ignore
    ({ revision }) => revision === Number.parseInt(paramsRevision) + 1
  );
  if (state === DataState.Production && matchingNextRevision) {
    overrideHidePromoteButton = true;
  }

  // Decide whether to force show the promote button regardless of state or not
  let overrideShowPromoteButton = false;
  // Enable the button if we have no new revision (maybe it was deleted
  // before) and we are in the retired state, to allow getting out of a
  // "stuck state"
  if (state === DataState.Retired && !matchingNextRevision) {
    overrideShowPromoteButton = true;
    console.log('OVERRIDE SHOW');
  }

  return (
    <StateFrame
      currentState={state}
      changeToDevelopment={changeToDevelopment}
      changeToReview={changeToReview}
      changeToProduction={changeToProduction}
      changeToRetired={changeToRetired}
      promoteToReview={promoteToReview}
      promoteToProduction={promoteToProduction}
      newRevision={newRevision}
      overrideHidePromoteButton={overrideHidePromoteButton}
      overrideShowPromoteButton={overrideShowPromoteButton}
    />
  );
}

export { CompanyLocalisationStateFrame };
