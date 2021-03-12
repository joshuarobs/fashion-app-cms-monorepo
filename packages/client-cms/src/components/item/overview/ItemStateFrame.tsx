import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { DataChangeType, DataState } from '@joshuarobs/clothing-enums';
import { StateFrame } from '../../common/frames/StateFrame/_StateFrame';
import { message } from 'antd';
import { Common } from '../../../strings';
import { useHistory } from 'react-router-dom';
import { Update_Item_Maindata_Revision_State } from '../../../queries/item_maindata_revisions/updateItemMaindataRevisionState';
import { Insert_Item_Maindata_Revision_Change } from '../../../queries/item_maindata_revision_changes/insertItemMaindataRevisionChange';
import { Routes } from '../../../routes';
import { Insert_Item_Maindata_Revision } from '../../../queries/item_maindata_revisions/insertItemMaindataRevision';
import { Insert_Item_Maindata } from '../../../queries/item_maindata/insertItemMaindata';
import { Update_Item_Updated_At } from '../../../queries/items/updateItemUpdatedAt';
import { Update_Company_Count } from '../../../queries/company_counts/updateCompanyCount';
import { Get_Unique_Item_Maindata_Rev_Amount_For_Brand_Prod_Only } from '../../../queries/item_maindata_revisions/getUniqueItemMaindataRevisionsForBrandInProduction';
import { Get_Item_Maindata_Revision_Changes_Promos_Only } from '../../../queries/item_maindata_revision_changes/getItemMaindataRevisionChangesPromosOnly';
import { Update_Item_Maindata_Revision_To_Retired } from '../../../queries/item_maindata_revisions/updateItemMaindataRevisionToRetired';
import { Insert_Item_Maindata_Revision_Change_Promo_Retired } from '../../../queries/item_maindata_revision_changes/insertItemMaindataRevisionChangePromoRetired';
import { item_maindata_revisions } from '../../../utils/gql-interfaces/item_maindata_revisions';

const key = 'state-localisations';

interface ItemStateFrameProps {
  itemId: number;
  itemMaindataRevision: item_maindata_revisions;
  paramsRevision: string;
  refetchTranslations?: Function;
  refetchItemTransRevs?: Function;
  uniqueRevisions: any;
  refetchRevisions: Function;
  refetchItemBaseData: Function;
}

function ItemStateFrame({
  itemId,
  itemMaindataRevision,
  paramsRevision,
  refetchTranslations = () => {},
  refetchItemTransRevs = () => {},
  uniqueRevisions,
  refetchRevisions = () => {},
  refetchItemBaseData = () => {},
}: // translations
ItemStateFrameProps) {
  const history = useHistory();
  // console.log("STATE - history:", history);

  // console.log("itemMaindataRevision:", itemMaindataRevision);

  const [
    currentRevision,
    setCurrentRevision,
  ] = useState<item_maindata_revisions | null>(null);
  useEffect(() => {
    setCurrentRevision(itemMaindataRevision);
    // }, [paramsRevision]);
  }, [paramsRevision, itemMaindataRevision]);

  const [state, setState] = useState<DataState | null>(null);
  useEffect(() => {
    setState(itemMaindataRevision ? itemMaindataRevision.state : null);
  }, [paramsRevision]);

  // const [revision_id, setRevisionId] = useState(itemMaindataRevision.id);
  //======================================================================
  // Hooks for GraphQL queries
  //======================================================================
  const [updateItemUpdatedAt] = useMutation(Update_Item_Updated_At, {
    onCompleted() {},
  });

  // const {
  //   loading: loadingItemMaindataRevision,
  //   error: errorItemMaindataRevision,
  //   data: dataItemMaindataRevision
  // } = useQuery(GET_ITEM_MAINDATA_REVISION, {
  //   variables: { revision: paramsRevision }
  // });

  const { loading, error, data } = useQuery(
    Get_Item_Maindata_Revision_Changes_Promos_Only,
    {
      variables: {
        itemId,
        revision: Number.parseInt(paramsRevision),
      },
    }
  );

  //==================================================
  // PROMOTIONS
  //==================================================
  const [
    updateItemMaindataRevision,
    // { loading: loadingUpdateRevisionReview, error: errorUpdateRevisionReview }
  ] = useMutation(Update_Item_Maindata_Revision_State, {
    onCompleted() {},
    // refetchQueries: () => [
    //   {
    //     query: GET_UNIQUE_PROD_ITEMS_FOR_COMPANY,
    //     variables: {
    //       id: currentRevision.item_maindata[0].brand_id
    //     }
    //   }
    // ]
  });

  const [
    insertItemMaindataRevisionChange,
    // { loading: loadingChangePromoReview, error: errorChangePromoReview }
  ] = useMutation(Insert_Item_Maindata_Revision_Change, {
    onCompleted() {},
  });

  //==================================================
  // PROMOTE TO RETIRED
  //==================================================
  const [
    updateItemMaindataRevisionToRetired,
    // { loading: loadingUpdateRevisionRetired, error: errorUpdateRevisionRetired }
  ] = useMutation(Update_Item_Maindata_Revision_To_Retired, {
    onCompleted() {},
  });

  const [
    insertItemMaindataRevisionChangePromoRetired,
    // { loading: loadingChangePromoRetired, error: errorChangePromoRetired }
  ] = useMutation(Insert_Item_Maindata_Revision_Change_Promo_Retired, {
    onCompleted() {},
  });

  //==================================================
  // NEW REVISION
  //==================================================
  const [
    insertItemMaindata,
    // { loading: loadingInsertMainClothing, error: errorInsertMainClothing }
  ] = useMutation(Insert_Item_Maindata, {
    onCompleted({ insert_item_maindata_one }) {
      // Refetch the item base data so that the header overview link won't
      // go back to the previous revision
      refetchItemBaseData().then(() => {
        console.log('insert_item_maindata_one:', insert_item_maindata_one);
        const { revision_id } = insert_item_maindata_one;
        const variables = {
          revisionId: revision_id,
          userId: 1,
          changeType: DataChangeType.Promotion,
          toState: DataState.Development,
          // action: DATA_ACTIONS.CREATE
        };
        // console.log("currentRevision:", currentRevision);
        insertItemMaindataRevisionChange({ variables }).then(() => {
          const { revision } = insert_item_maindata_one;
          const { item_id } = revision;
          history.push(
            `${Routes.Items__Clothing__Item}/${item_id}?rev=${revision.revision}`
          );
          history.go(0);
          message
            .success(
              { content: Common.State_Related.Created_New_Revision, key },
              2
            )
            .then();
        });
      });
    },
  });

  const [
    insertItemMaindataRevision,
    // { loading: loadingInsertMainRev, error: errorInsertMainRev }
  ] = useMutation(Insert_Item_Maindata_Revision, {
    async onCompleted({ insert_item_maindata_revisions_one }) {
      await refetchRevisions();
      console.log(
        'insert_item_maindata_revisions_one:',
        insert_item_maindata_revisions_one
      );
      const { id } = insert_item_maindata_revisions_one;
      console.log('currentRevision:', currentRevision);
      const {
        name,
        type,
        brand_id,
        clothing_shell_id,
        for_gender,
        item_family_id,
        // @ts-ignore
      } = currentRevision.item_maindata[0];

      const variables = {
        revisionId: id,
        isRelease: true,
        name,
        type,
        brand_id,
        clothing_shell_id,
        for_gender,
        item_family_id,
      };
      // 3. INSERT A MAINDATA FOR THAT REVISION
      await insertItemMaindata({ variables });

      await updateItemUpdatedAt({
        variables: {
          id: itemId,
        },
      });
    },
  });

  const [
    updateCompanyCount,
    { loading: loadingUpdCompanyItemCount, error: errorUpdCompanyItemCount },
  ] = useMutation(Update_Company_Count, {
    onCompleted() {
      console.log('DONE updateCompanyCount');
    },
  });

  const [
    getProductionItemCountForCompany,
    { loading: loadingGetItemCount, error: errorGetItemCount },
  ] = useLazyQuery(Get_Unique_Item_Maindata_Rev_Amount_For_Brand_Prod_Only, {
    // NOTE: We can't use async for `onCompleted` in a `useLazyQuery` as it
    // causes weird infinite page re-rendering bugs
    onCompleted({ item_maindata_revisions_aggregate }) {
      console.log(
        'item_maindata_revisions_aggregate:',
        item_maindata_revisions_aggregate
      );
      // @ts-ignore
      const { brand } = currentRevision.item_maindata[0];
      if (brand) {
        const { counts } = brand;
        // console.log("counts:", counts);
        if (counts) {
          updateCompanyCount({
            variables: {
              id: counts.id,
              changes: {
                item_count: item_maindata_revisions_aggregate.aggregate.count,
              },
            },
          }).then();
        }
      }
      // message.success({ content: COMMON.UPDATED_ITEM_COUNT, key }, 2);
    },
    fetchPolicy: 'network-only',
  });

  if (loading || !currentRevision) return <StateFrame />;
  if (error) return <div>Error! ${error}</div>;

  // if (!currentRevision) {
  //   return <StateFrame />;
  // }

  // console.log("Current Revision:", currentRevision);
  // const translationDraft = currentRevision.item_maindata[1];
  // const translationRelease = currentRevision.item_maindata[0];
  // console.log("translationRelease:", translationRelease);

  // const { pathNoRelease } = currentRevision;
  // console.log("REDIRECT TO:", pathNoRelease);

  const promoteToReview = async () => {
    message.loading({ content: Common.State_Related.Promoting_To_Review, key });
    // 1. (OBSOLETE) Create a release translation version
    // 2. Update the item translation revision state to REVIEW
    await updateItemMaindataRevision({
      variables: {
        // @ts-ignore
        revisionId: currentRevision.id,
        state: DataState.Review,
      },
    });
    // 3. Create an activity entry
    await insertItemMaindataRevisionChange({
      variables: {
        // @ts-ignore
        revisionId: currentRevision.id,
        userId: 1,
        changeType: DataChangeType.Promotion,
        toState: DataState.Review,
      },
    });
    await updateItemUpdatedAt({
      variables: {
        id: itemId,
      },
    });
    // Refresh the page
    history.go(0);
    message.success(
      {
        content: Common.State_Related.Promoting_To_Review,
        key,
      },
      2
    );
  };

  const demoteBackToDevelopment = async () => {
    message.loading({
      content: Common.State_Related.Demoting_To_Development,
      key,
    });
    // 1. (OBSOLETE) Create a release translation version
    // 2. Update the item translation revision state to DEVELOPMENT
    await updateItemMaindataRevision({
      variables: {
        // @ts-ignore
        revisionId: currentRevision.id,
        state: DataState.Development,
      },
    });

    // 3. Create an activity entry
    await insertItemMaindataRevisionChange({
      variables: {
        // @ts-ignore
        revisionId: currentRevision.id,
        userId: 1,
        changeType: DataChangeType.Demotion,
        toState: DataState.Development,
      },
    });

    await updateItemUpdatedAt({
      variables: {
        id: itemId,
      },
    });

    // Refresh the page
    history.go(0);
    message.success(
      {
        content: Common.State_Related.Demoted_To_Development,
        key,
      },
      2
    );
  };

  const promoteToProduction = async () => {
    message.loading({
      content: Common.State_Related.Promoting_To_Production,
      key,
    });
    // 1. Update the item translation revision state to PRODUCTION
    await updateItemMaindataRevision({
      variables: {
        // @ts-ignore
        revisionId: currentRevision.id,
        state: DataState.Production,
        // state: DATA_STATES.REVIEW
      },
    });
    // 2. If there is a previous revision, retire it
    const matchingPreviousRevision = uniqueRevisions.find(
      // @ts-ignore
      ({ revision }) => revision === Number.parseInt(paramsRevision) - 1
    );
    // console.log("matchingPreviousRevision:", matchingPreviousRevision);
    if (matchingPreviousRevision) {
      await updateItemMaindataRevisionToRetired({
        variables: {
          revisionId: matchingPreviousRevision.id,
        },
      });
      await insertItemMaindataRevisionChangePromoRetired({
        variables: {
          revisionId: matchingPreviousRevision.id,
          userId: 1,
        },
      });
    }

    // 3. Create an activity entry
    await insertItemMaindataRevisionChange({
      variables: {
        // @ts-ignore
        revisionId: currentRevision.id,
        userId: 1,
        changeType: DataChangeType.Promotion,
        toState: DataState.Production,
      },
    });

    // 4. Recalculate the number of items for the company
    // @ts-ignore
    const { brand_id } = currentRevision.item_maindata[0];
    console.log('brand_id:', brand_id);
    if (brand_id) {
      await getProductionItemCountForCompany({
        variables: {
          id: brand_id,
        },
      });
    }

    await updateItemUpdatedAt({
      variables: {
        id: itemId,
      },
    });

    // Refresh the page
    history.go(0);
    message.success(
      {
        content: Common.State_Related.Promoted_To_Production,
        key,
      },
      2
    );
  };

  const newRevision = async () => {
    message.loading({
      content: Common.State_Related.Creating_New_Revision,
      key,
    });
    console.log('newRevision() > currentRevision:', currentRevision);
    // @ts-ignore
    const { revision } = currentRevision;
    // const variables = {
    //   entryId: itemId,
    //   revision: revision + 1
    // };
    // insertItemTranslationRevision({ variables }).then();
    const variables = {
      id: itemId,
      revision: revision + 1,
      state: DataState.Development,
    };
    // 2. INSERT A REVISION
    await insertItemMaindataRevision({ variables });
  };

  const { item_maindata_revision_changes } = data;

  console.log(
    'item_maindata_revision_changes:',
    item_maindata_revision_changes
  );

  // Find each of the state's revision
  const changeToDevelopment = item_maindata_revision_changes.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Development
  );
  const changeToReview = item_maindata_revision_changes.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Review
  );
  const changeToProduction = item_maindata_revision_changes.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Production
  );
  const changeToRetired = item_maindata_revision_changes.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Retired
  );

  // console.log("changeToDevelopment:", changeToDevelopment);
  // console.log("changeToReview:", changeToReview);
  // console.log("changeToProduction:", changeToProduction);
  // console.log("changeToRetired:", changeToRetired);

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
      demoteToDevelopment={demoteBackToDevelopment}
      newRevision={newRevision}
      overrideHidePromoteButton={overrideHidePromoteButton}
      overrideShowPromoteButton={overrideShowPromoteButton}
      // allowDemote
    />
  );
}

export { ItemStateFrame };
