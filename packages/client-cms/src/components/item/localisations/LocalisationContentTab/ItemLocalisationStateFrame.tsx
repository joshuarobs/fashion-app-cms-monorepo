import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DataState, DataChangeType } from '@joshuarobs/clothing-framework';
import { StateFrame } from '../../../common/frames/StateFrame/_StateFrame';
import { message } from 'antd';
import { Common } from '../../../../strings';
import { useNavigate, useLocation } from 'react-router-dom';
import { Get_Item_Translation_Revision_Changes_Promos_Only } from '../../../../queries/item_translation_revision_changes/getItemTranslationRevisionChangesPromosOnly';
import { Insert_Item_Translation_Promote_To_Review } from '../../../../queries/item_translations/insertItemTranslationPromoteToReview';
import { Update_Item_Translation_Revision_State_Promote_To_Production } from '../../../../queries/item_translation_revisions/updateItemTranslationRevisionStatePromoteToProduction';
import { Insert_Item_Translation_Revision_Promote_New_Revision } from '../../../../queries/item_translation_revisions/insertItemTranslationRevisionPromoteNewRevision';
import { Get_Item_Translation_Revision_Changes_For_Locale } from '../../../../queries/item_translation_revision_changes/getItemTranslationRevisionChangesForLocale';
import { Get_Item_Translation_Revisions_Given_Locale_Code } from '../../../../queries/item_translation_revisions/getItemTranslationRevisionsGivenLocaleCode';

const key = 'state-localisations';

interface ItemLocalisationStateFrameProps {
  itemId?: string;
  currentTab: string;
  paramsRevision: any;
  refetchTranslations: Function;
  refetchItemTransRevs: Function;
  refetchUniqueRevisions: Function;
  uniqueRevisions: any;
}

function ItemLocalisationStateFrame({
  itemId,
  currentTab,
  paramsRevision,
  refetchTranslations,
  refetchItemTransRevs,
  refetchUniqueRevisions,
  uniqueRevisions,
}: ItemLocalisationStateFrameProps) {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('STATE - history:', history);
  console.log('ItemLocalisationStateFrame > currentTab:', currentTab);

  const [currentRevision, setCurrentRevision] = useState(uniqueRevisions[0]);
  const [state, setState] = useState(null);
  const [revision_id, setRevisionId] = useState(null);
  const [buttonIsPromoting, setButtonIsPromoting] = useState(false);

  function setReactUseStateVars() {
    const matchingRevision = uniqueRevisions.find(
      // @ts-ignore
      ({ revision }) => revision === Number.parseInt(paramsRevision)
    );
    console.log('matchingRevision:', matchingRevision);
    if (matchingRevision) {
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
    }
  }

  useEffect(
    () => {
      setReactUseStateVars();
    },
    // Update UI state if:
    // 1. `currentTab` - The tab changes (e.g. from localisation to
    //    localisation or back to/from the Locale Dashboard
    // 2. `paramsRevision` - The url arg of `rev` changes (i.e. within a
    //    localisation and changing between revisions)
    // 3. `uniqueRevisions` - The passed in prop arg to this component
    [currentTab, paramsRevision, uniqueRevisions]
  );

  //======================================================================
  // Hooks for GraphQL queries
  //======================================================================
  // const [updateItemUpdatedAt] = useMutation(Update_Item_Updated_At, {
  //   onCompleted() {},
  // });

  const {
    loading: loadingPromoTranslationRevs,
    error: errorPromoTranslationRevs,
    data: dataPromoTranslationRevs,
    refetch: refetchPromoTranslationRevs,
  } = useQuery(Get_Item_Translation_Revision_Changes_Promos_Only, {
    variables: {
      itemId: Number.parseInt(String(itemId)),
      localeCode: currentTab,
      revision: Number.parseInt(paramsRevision),
    },
  });

  // const [
  //   insertItemTranslationIsRelease,
  //   { loading: loadingInsertRelease, error: errorInsertRelease },
  // ] = useMutation(Insert_Item_Translation, {
  //   onCompleted() {
  //     // TODO: Get the refetch from the content frame that loads all
  //     //  revisions and then call it
  //     // refetchTranslations();
  //     // const variables = {
  //     //   revisionId: currentRevision.id,
  //     //   userId: 1
  //     // };
  //     // insertItemTranslationRevisionChangeActUpdate({ variables }).then(r => {});
  //   },
  //   notifyOnNetworkStatusChange: true,
  // });

  const [
    insertItemTranslationPromoteToReview,
    {
      loading: loadingInsertItemTranslationPromoteToReview,
      error: errorInsertItemTranslationPromoteToReview,
    },
  ] = useMutation(Insert_Item_Translation_Promote_To_Review, {
    async onCompleted() {
      // TODO: Get the refetch from the content frame that loads all
      //  revisions and then call it
      // refetchTranslations();
      await refetchPromoTranslationRevs();
      await refetchTranslations();
      refetchUniqueRevisions();
      // const variables = {
      //   revisionId: currentRevision.id,
      //   userId: 1
      // };
      // insertItemTranslationRevisionChangeActUpdate({ variables }).then(r => {});
      navigate(
        location.pathname + `?rev=${currentRevision.revision}&release=true`
      );
      message
        .success({
          content: Common.State_Related.Promoted_To_Review,
          key,
        })
        .then();
    },
    refetchQueries: [
      // TODO: Refetch the state, and latest activity
      {
        query: Get_Item_Translation_Revision_Changes_For_Locale,
        variables: {
          itemId: Number.parseInt(String(itemId)),
          localeCode: currentTab,
          // revision: Number.parseInt(paramsRevision),
        },
      },
    ],
    // notifyOnNetworkStatusChange: true,
  });

  //==================================================
  // PROMOTE TO REVIEW
  //==================================================

  //==================================================
  // PROMOTE TO PRODUCTION
  //==================================================
  const [
    updateItemTranslationRevisionStatePromoteToProduction,
    {
      loading: loadingUpdateItemTranslationRevisionStatePromoteToProduction,
      error: errorUpdateItemTranslationRevisionStatePromoteToProduction,
    },
  ] = useMutation(
    Update_Item_Translation_Revision_State_Promote_To_Production,
    {
      async onCompleted() {
        await refetchPromoTranslationRevs();
        // await refetchTranslations();
        // setReactUseStateVars();
        refetchUniqueRevisions();
        // Refresh the page
        // history.go(0);
        // message
        //   .success({
        //     content: Common.State_Related.Promoted_To_Production,
        //     key,
        //   })
        //   .then();
      },
      refetchQueries: [
        {
          query: Get_Item_Translation_Revision_Changes_For_Locale,
          variables: {
            itemId: Number.parseInt(String(itemId)),
            localeCode: currentTab,
            // revision: Number.parseInt(paramsRevision),
          },
        },
      ],
    }
  );

  // const [
  //   updateItemTranslationRevisionToProduction,
  //   {
  //     loading: loadingUpdateRevisionProduction,
  //     error: errorUpdateRevisionProduction,
  //   },
  // ] = useMutation(Update_Item_Translation_Revision_To_Production, {
  //   onCompleted() {
  //     // Refresh the page
  //     history.go(0);
  //     message
  //       .success({
  //         content: Common.State_Related.Promoted_To_Production,
  //         key,
  //       })
  //       .then();
  //   },
  // });
  //
  // const [
  //   insertItemTranslationRevisionChangePromoProduction,
  //   {
  //     loading: loadingChangePromoProduction,
  //     error: errorChangePromoProduction,
  //   },
  // ] = useMutation(Insert_Item_Translation_Revision_Change_Promo_Production, {
  //   onCompleted() {},
  // });

  //==================================================
  // PROMOTE TO RETIRED
  //==================================================
  // const [
  //   updateItemTranslationRevisionToRetired,
  //   {
  //     loading: loadingUpdateRevisionRetired,
  //     error: errorUpdateRevisionRetired,
  //   },
  // ] = useMutation(Update_Item_Translation_Revision_To_Retired, {
  //   onCompleted() {},
  // });
  //
  // const [
  //   insertItemTranslationRevisionChangePromoRetired,
  //   { loading: loadingChangePromoRetired, error: errorChangePromoRetired },
  // ] = useMutation(Insert_Item_Translation_Revision_Change_Promo_Retired, {
  //   onCompleted() {},
  // });

  //==================================================
  // NEW REVISION
  //==================================================
  // const [
  //   insertItemTranslationBlankDraft,
  //   { loading: loadingInsertTransBlank, error: errorInsertTransBlank },
  // ] = useMutation(Insert_Item_Translation_Blank_Draft, {
  //   onCompleted() {},
  // });
  //
  // const [
  //   insertItemTranslationRevisionChangePromoDevelopment,
  //   {
  //     loading: loadingChangePromoDevelopment,
  //     error: errorChangePromoDevelopment,
  //   },
  // ] = useMutation(Insert_Item_Translation_Revision_Change, {
  //   onCompleted() {},
  // });

  const [
    insertItemTranslationRevisionPromoteNewRevision,
    {
      loading: loadingInsertItemTranslationRevisionPromoteNewRevision,
      error: errorInsertItemTranslationRevisionPromoteNewRevision,
      data: dataInsertItemTranslationRevisionPromoteNewRevision,
    },
  ] = useMutation(Insert_Item_Translation_Revision_Promote_New_Revision, {
    refetchQueries: [
      {
        query: Get_Item_Translation_Revisions_Given_Locale_Code,
        variables: {
          itemId: Number.parseInt(String(itemId)),
          localeCode: currentTab,
          // revision: Number.parseInt(paramsRevision),
        },
      },
      {
        query: Get_Item_Translation_Revision_Changes_For_Locale,
        variables: {
          itemId: Number.parseInt(String(itemId)),
          localeCode: currentTab,
          // revision: Number.parseInt(paramsRevision),
        },
      },
    ],
  });

  // const [
  //   insertItemTranslationRevision,
  //   {
  //     loading: loadingInsertTransRev,
  //     error: errorInsertTransRev,
  //     data: dataInsertTransRev,
  //   },
  // ] = useMutation(Insert_Item_Translation_Revision, {
  //   notifyOnNetworkStatusChange: true,
  //   async onCompleted({ insert_item_translation_revisions_one }) {
  //     const {
  //       id,
  //       locale_code,
  //       revision,
  //     } = insert_item_translation_revisions_one;
  //     // console.log("!!!translationDraft:", translationDraft);
  //     // console.log("!!!translationRelease:", translationRelease);
  //     // 1. Create a release translation version
  //     // Somehow we're getting the previous version's release from the
  //     // "draft" variable, but that's just how it works
  //     const { full_name, short_name, description } = translationDraft;
  //     // insertItemTranslationIsRelease({
  //
  //     await refetchItemTransRevs();
  //     await insertItemTranslationIsRelease({
  //       variables: {
  //         revision_id: id,
  //         is_release: false,
  //         full_name,
  //         short_name,
  //         description,
  //       },
  //     });
  //     await insertItemTranslationRevisionChangePromoDevelopment({
  //       variables: {
  //         revisionId: id,
  //         userId: 1,
  //         changeType: DataChangeType.Promotion,
  //         toState: DataState.Development,
  //       },
  //     });
  //
  //     await updateItemUpdatedAt({
  //       variables: {
  //         id: itemId,
  //       },
  //     });
  //
  //     // Redirect to the next revision
  //     history.push(
  //       history.location.pathname +
  //         `?rev=${currentRevision.revision + 1}&release=false`
  //     );
  //     message.success(
  //       {
  //         content: Common.State_Related.Created_New_Revision,
  //         key,
  //       },
  //       2
  //     );
  //   },
  // });

  if (!currentRevision) {
    return <StateFrame />;
  }

  console.log('Current Revision:', currentRevision);
  const translationDraft = currentRevision.item_translations[0];
  // const translationRelease = currentRevision.item_translations[1];

  // const { pathNoRelease } = currentRevision;
  // console.log("REDIRECT TO:", pathNoRelease);

  const promoteToReview = async () => {
    setButtonIsPromoting(true);
    await new Promise((r) => setTimeout(r, 500));
    message.loading({ content: Common.State_Related.Promoting_To_Review, key });
    // 1. Create a release translation version
    await insertItemTranslationPromoteToReview({
      variables: {
        revision_id: currentRevision.id,
      },
    });

    message.success(
      {
        content: Common.State_Related.Promoted_To_Review,
        key,
      },
      2
    );

    setButtonIsPromoting(false);

    //
    // const { full_name, short_name, description } = translationDraft;
    // await insertItemTranslationIsRelease({
    //   variables: {
    //     revision_id: currentRevision.id,
    //     is_release: true,
    //     full_name,
    //     short_name,
    //     description,
    //   },
    // });
    //
    // // 2. Update the item translation revision state to REVIEW
    // await updateItemTranslationRevisionToReview({
    //   variables: {
    //     id: currentRevision.id,
    //   },
    // });

    // 3. Create an activity entry
    // await insertItemTranslationRevisionChangePromoReview({
    //   variables: {
    //     revisionId: currentRevision.id,
    //     userId: 1,
    //   },
    // });
    //
    // await updateItemUpdatedAt({
    //   variables: {
    //     id: itemId,
    //   },
    // });

    // Refresh the page
    // history.go(0);
    // console.log("!!!translationDraft:", translationDraft);
    // console.log("!!!translationRelease:", translationRelease);
    // console.log("translations:", translations);
  };

  const promoteToProduction = async () => {
    setButtonIsPromoting(true);
    await new Promise((r) => setTimeout(r, 200));
    message.loading({
      content: Common.State_Related.Promoting_To_Production,
      key,
    });
    await updateItemTranslationRevisionStatePromoteToProduction({
      variables: {
        id: currentRevision.id,
      },
    });
    // // Refresh the page
    // history.go(0);
    message.success(
      {
        content: Common.State_Related.Promoted_To_Production,
        key,
      },
      2
    );
    setButtonIsPromoting(false);
  };

  const newRevision = async () => {
    setButtonIsPromoting(true);
    await new Promise((r) => setTimeout(r, 200));
    message.loading({
      content: Common.State_Related.Creating_New_Revision,
      key,
    });
    // console.log("currentRevision:", currentRevision);
    const { revision } = currentRevision;
    const variables = {
      // localeCode: currentTab,
      // entryId: itemId,
      // revision: revision + 1,
      id: Number.parseInt(String(itemId)),
      locale_code: currentTab,
    };
    // await insertItemTranslationRevision({ variables });

    await insertItemTranslationRevisionPromoteNewRevision({ variables });

    // Redirect to the next revision
    navigate(
      location.pathname + `?rev=${currentRevision.revision + 1}&release=false`
    );
    message.success(
      {
        content: Common.State_Related.Created_New_Revision,
        key,
      },
      2
    );
    setButtonIsPromoting(false);
  };

  if (loadingPromoTranslationRevs) return <StateFrame />;
  if (errorPromoTranslationRevs)
    return (
      <div>Error! ${JSON.stringify(errorPromoTranslationRevs, null, 2)}</div>
    );

  const { getItemTranslationRevisionChangesPromosOnly } =
    dataPromoTranslationRevs;

  console.log(
    'getItemTranslationRevisionChangesPromosOnly:',
    getItemTranslationRevisionChangesPromosOnly
  );

  // Find each of the state's revision
  const changeToDevelopment = getItemTranslationRevisionChangesPromosOnly.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Development
  );
  const changeToReview = getItemTranslationRevisionChangesPromosOnly.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Review
  );
  const changeToProduction = getItemTranslationRevisionChangesPromosOnly.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Production
  );
  const changeToRetired = getItemTranslationRevisionChangesPromosOnly.find(
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
      buttonIsPromoting={buttonIsPromoting}
      promoteToReview={promoteToReview}
      promoteToProduction={promoteToProduction}
      newRevision={newRevision}
      overrideHidePromoteButton={overrideHidePromoteButton}
      overrideShowPromoteButton={overrideShowPromoteButton}
    />
  );
}

export { ItemLocalisationStateFrame };
