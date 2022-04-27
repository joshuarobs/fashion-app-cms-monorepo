import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DataState, DataChangeType } from '@joshuarobs/clothing-framework';
import { StateFrame } from '../../../common/frames/StateFrame/_StateFrame';
import { message } from 'antd';
import { Common } from '../../../../strings';
import { useNavigate, useLocation } from 'react-router-dom';
import { Get_Item_Global_Media_Revision_Changes_Promos_Only } from '../../../../queries/item_global_media_revision_changes/getItemGlobalMediaRevisionChangesPromosOnly';
import { Insert_Item_Global_Media_Promote_To_Review } from '../../../../queries/item_global_media/insertItemGlobalMediaPromoteToReview';
import { Get_Item_Global_Media_Revision_Changes_Given_Item_Id } from '../../../../queries/item_global_media_revision_changes/getItemGlobalMediaRevisionChangesGivenItemId';
import { Update_Item_Global_Media_Revision_State_Promote_To_Production } from '../../../../queries/item_global_media_revisions/updateItemGlobalMediaRevisionStatePromoteToProduction';
import { Insert_Item_Global_Media_Revision_Promote_New_Revision } from '../../../../queries/item_global_media_revisions/insertItemGlobalMediaRevisionPromoteNewRevision';

const key = 'state-localisations';

interface ItemGlobalMediaStateFrameProps {
  itemId?: string;
  currentTab: string;
  paramsRevision: any;
  refetchGlobalMedia: Function;
  refetchItemTransRevs: Function;
  refetchUniqueRevisions: Function;
  uniqueRevisions: any;
}

function ItemGlobalMediaStateFrame({
  itemId,
  currentTab,
  paramsRevision,
  refetchGlobalMedia,
  refetchItemTransRevs,
  refetchUniqueRevisions,
  uniqueRevisions,
}: ItemGlobalMediaStateFrameProps) {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('STATE - history:', history);
  console.log('ItemGlobalMediaStateFrame > currentTab:', currentTab);
  console.log('uniqueRevisions:', uniqueRevisions);

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
  const {
    loading: loadingPromoGlobalMediaRevs,
    error: errorPromoGlobalMediaRevs,
    data: dataPromoGlobalMediaRevs,
    refetch: refetchPromoGlobalMediaRevs,
  } = useQuery(Get_Item_Global_Media_Revision_Changes_Promos_Only, {
    variables: {
      item_id: Number.parseInt(String(itemId)),
      revision: Number.parseInt(paramsRevision),
    },
  });

  //==================================================
  // PROMOTE TO REVIEW
  //==================================================
  const [
    insertItemGlobalMediaPromoteToReview,
    {
      loading: loadingInsertItemGlobalMediaPromoteToReview,
      error: errorInsertItemGlobalMediaPromoteToReview,
    },
  ] = useMutation(Insert_Item_Global_Media_Promote_To_Review, {
    async onCompleted() {
      // TODO: Get the refetch from the content frame that loads all
      //  revisions and then call it
      // refetchTranslations();
      await refetchPromoGlobalMediaRevs();
      await refetchGlobalMedia();
      refetchUniqueRevisions();
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
        query: Get_Item_Global_Media_Revision_Changes_Given_Item_Id,
        variables: {
          item_id: Number.parseInt(String(itemId)),
          // revision: Number.parseInt(paramsRevision),
        },
      },
    ],
    // notifyOnNetworkStatusChange: true,
  });

  //==================================================
  // PROMOTE TO PRODUCTION
  //==================================================
  const [
    updateItemGlobalMediaRevisionStatePromoteToProduction,
    {
      loading: loadingUpdateItemGlobalMediaRevisionStatePromoteToProduction,
      error: errorUpdateItemGlobalMediaRevisionStatePromoteToProduction,
    },
  ] = useMutation(
    Update_Item_Global_Media_Revision_State_Promote_To_Production,
    {
      async onCompleted() {
        await refetchPromoGlobalMediaRevs();
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
          query: Get_Item_Global_Media_Revision_Changes_Given_Item_Id,
          variables: {
            item_id: Number.parseInt(String(itemId)),
            // revision: Number.parseInt(paramsRevision),
          },
        },
      ],
    }
  );

  //==================================================
  // NEW REVISION
  //==================================================
  const [
    insertItemGlobalMediaRevisionPromoteNewRevision,
    {
      loading: loadingInsertItemGlobalMediaRevisionPromoteNewRevision,
      error: errorInsertItemGlobalMediaRevisionPromoteNewRevision,
      data: dataInsertItemGlobalMediaRevisionPromoteNewRevision,
    },
  ] = useMutation(Insert_Item_Global_Media_Revision_Promote_New_Revision, {
    refetchQueries: [
      {
        query: Get_Item_Global_Media_Revision_Changes_Given_Item_Id,
        variables: {
          item_id: Number.parseInt(String(itemId)),
          // revision: Number.parseInt(paramsRevision),
        },
      },
    ],
  });
  console.log('Current Revision:', currentRevision);

  if (!currentRevision) {
    return <StateFrame />;
  }

  // const translationDraft = currentRevision.item_translations[0];
  // const translationRelease = currentRevision.item_translations[1];

  // const { pathNoRelease } = currentRevision;
  // console.log("REDIRECT TO:", pathNoRelease);

  const promoteToReview = async () => {
    setButtonIsPromoting(true);
    await new Promise((r) => setTimeout(r, 500));
    message.loading({ content: Common.State_Related.Promoting_To_Review, key });
    // 1. Create a release translation version
    await insertItemGlobalMediaPromoteToReview({
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
    await updateItemGlobalMediaRevisionStatePromoteToProduction({
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
      // entryId: itemId,
      // revision: revision + 1,
      id: Number.parseInt(String(itemId)),
    };
    // await insertItemTranslationRevision({ variables });

    await insertItemGlobalMediaRevisionPromoteNewRevision({ variables });

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

  if (loadingPromoGlobalMediaRevs) return <StateFrame />;
  if (errorPromoGlobalMediaRevs)
    return (
      <div>Error! ${JSON.stringify(errorPromoGlobalMediaRevs, null, 2)}</div>
    );

  const { getItemGlobalMediaRevisionChangesPromosOnly } =
    dataPromoGlobalMediaRevs;

  console.log(
    'getItemGlobalMediaRevisionChangesPromosOnly:',
    getItemGlobalMediaRevisionChangesPromosOnly
  );

  // Find each of the state's revision
  const changeToDevelopment = getItemGlobalMediaRevisionChangesPromosOnly.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Development
  );
  const changeToReview = getItemGlobalMediaRevisionChangesPromosOnly.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Review
  );
  const changeToProduction = getItemGlobalMediaRevisionChangesPromosOnly.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Production
  );
  const changeToRetired = getItemGlobalMediaRevisionChangesPromosOnly.find(
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

export { ItemGlobalMediaStateFrame };
