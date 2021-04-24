import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  DataChangeType,
  DataState,
} from '@joshuarobs/clothing-framework/build/enums';
import { StateFrame } from '../../common/frames/StateFrame/_StateFrame';
import { message } from 'antd';
import { Common } from '../../../strings';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../routes';
import { clothing_shell_maindata_revisions } from '../../../utils/gql-interfaces/clothing_shell_maindata_revisions';
import { Get_Clothing_Shell_Maindata_Revision_Changes_Promos_Only } from '../../../queries/clothing_shell_maindata_revision_changes/getClothingShellMaindataRevisionChangesPromosOnly';
import { Update_Clothing_Shell_Updated_At } from '../../../queries/clothing_shells/updateClothingShellUpdatedAt';
import { Update_Clothing_Shell_Maindata_Revision_State } from '../../../queries/clothing_shell_maindata_revisions/updateClothingShellMaindataRevisionState';
import { Insert_Clothing_Shell_Maindata_Revision_Change } from '../../../queries/clothing_shell_maindata_revision_changes/insertClothingShellMaindataRevisionChange';
import { Update_Clothing_Shell_Maindata_Revision_To_Retired } from '../../../queries/clothing_shell_maindata_revisions/updateClothingShellMaindataRevisionToRetired';
import { Insert_Clothing_Shell_Maindata_Revision_Change_Promo_Retired } from '../../../queries/clothing_shell_maindata_revision_changes/insertClothingShellMaindataRevisionChangePromoRetired';
import { Insert_Clothing_Shell_Maindata } from '../../../queries/clothing_shell_maindata/insertClothingShellMaindata';
import { Insert_Clothing_Shell_Maindata_Revision } from '../../../queries/clothing_shell_maindata_revisions/insertClothingShellMaindataRevision';
import { Insert_Clothing_Segment_Data } from '../../../queries/clothing_segment_data/insertClothingSegmentData';

const key = 'state-localisations';

interface ClothingShellStateFrameProps {
  clothingShellId: number;
  clothingShellMaindataRevision: clothing_shell_maindata_revisions;
  paramsRevision: string;
  // refetchTranslations?: Function;
  // refetchTransRevs?: Function;
  uniqueRevisions: any;
  refetchRevisions: Function;
  refetchBaseData: Function;
}

function ClothingShellStateFrame({
  clothingShellId,
  clothingShellMaindataRevision,
  paramsRevision,
  // refetchTranslations = () => {},
  // refetchTransRevs = () => {},
  uniqueRevisions,
  refetchRevisions = () => {},
  refetchBaseData = () => {},
}: ClothingShellStateFrameProps) {
  const history = useHistory();
  // console.log("STATE - history:", history);

  // console.log("itemMaindataRevision:", itemMaindataRevision);

  const [
    currentRevision,
    setCurrentRevision,
  ] = useState<clothing_shell_maindata_revisions | null>(null);
  useEffect(() => {
    setCurrentRevision(clothingShellMaindataRevision);
    // }, [paramsRevision]);
  }, [paramsRevision, clothingShellMaindataRevision]);

  const [state, setState] = useState<DataState | null>(null);
  useEffect(() => {
    setState(
      clothingShellMaindataRevision ? clothingShellMaindataRevision.state : null
    );
  }, [paramsRevision]);

  // const [revision_id, setRevisionId] = useState(itemMaindataRevision.id);
  //======================================================================
  // Hooks for GraphQL queries
  //======================================================================
  const { loading, error, data } = useQuery(
    Get_Clothing_Shell_Maindata_Revision_Changes_Promos_Only,
    {
      variables: {
        clothingShellId: Number.parseInt(String(clothingShellId)),
        revision: Number.parseInt(paramsRevision),
      },
    }
  );

  const [updateUpdatedAt] = useMutation(Update_Clothing_Shell_Updated_At, {
    onCompleted() {},
  });

  //==================================================
  // PROMOTIONS
  //==================================================
  const [
    updateMaindataRevision,
    // { loading: loadingUpdateRevisionReview, error: errorUpdateRevisionReview }
  ] = useMutation(Update_Clothing_Shell_Maindata_Revision_State, {
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
    insertMaindataRevisionChange,
    // { loading: loadingChangePromoReview, error: errorChangePromoReview }
  ] = useMutation(Insert_Clothing_Shell_Maindata_Revision_Change, {
    onCompleted() {},
  });

  //==================================================
  // PROMOTE TO RETIRED
  //==================================================
  const [
    updateMaindataRevisionToRetired,
    // { loading: loadingUpdateRevisionRetired, error: errorUpdateRevisionRetired }
  ] = useMutation(Update_Clothing_Shell_Maindata_Revision_To_Retired, {
    onCompleted() {},
  });

  const [
    insertMaindataRevisionChangePromoRetired,
    // { loading: loadingChangePromoRetired, error: errorChangePromoRetired }
  ] = useMutation(
    Insert_Clothing_Shell_Maindata_Revision_Change_Promo_Retired,
    {
      onCompleted() {},
    }
  );

  //==================================================
  // NEW REVISION
  //==================================================
  // Insertion order:
  // 1. clothing_shells (already inserted by the time we see the state frame)
  // 2. clothing_shell_maindata_revisions
  // 3. clothing_segment_data
  // 4. clothing_shell_maindata
  // 5. clothing_shell_maindata_revision_changes

  // TODO: Step 4 - clothing_shell_maindata_revision_changes

  // Step 3 - clothing_shell_maindata
  const [
    insertMaindata,
    // { loading: loadingInsertMainClothing, error: errorInsertMainClothing }
  ] = useMutation(Insert_Clothing_Shell_Maindata, {
    onCompleted({ insert_clothing_shell_maindata_one }) {
      // Refetch the item base data so that the header overview link won't
      // go back to the previous revision
      refetchBaseData().then(() => {
        console.log(
          'insert_clothing_shell_maindata_one:',
          insert_clothing_shell_maindata_one
        );
        const { revision_id } = insert_clothing_shell_maindata_one;
        const variables = {
          revisionId: revision_id,
          userId: 1,
          changeType: DataChangeType.Promotion,
          toState: DataState.Development,
          // action: DATA_ACTIONS.CREATE
        };
        // console.log("currentRevision:", currentRevision);
        insertMaindataRevisionChange({ variables }).then(() => {
          const { revision } = insert_clothing_shell_maindata_one;
          const { clothing_shell_id } = revision;
          history.push(
            `${Routes.Clothing_Shells__Clothing_Shell}/${clothing_shell_id}?rev=${revision.revision}`
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

  // Step 2 - clothing_segment_data
  const [
    insertClothingSegmentData,
    // { loading: loadingChangePromoRetired, error: errorChangePromoRetired }
  ] = useMutation(Insert_Clothing_Segment_Data, {
    onCompleted({ insert_clothing_shell_maindata_one }) {},
  });

  // Step 1 - clothing_shell_maindata_revisions
  const [
    insertMaindataRevision,
    // { loading: loadingInsertMainRev, error: errorInsertMainRev }
  ] = useMutation(Insert_Clothing_Shell_Maindata_Revision, {
    async onCompleted({ insert_clothing_shell_maindata_revisions_one }) {
      await refetchRevisions();
      console.log(
        'insert_clothing_shell_maindata_revisions_one:',
        insert_clothing_shell_maindata_revisions_one
      );
      const { id } = insert_clothing_shell_maindata_revisions_one;
      console.log('currentRevision:', currentRevision);
      // TODO: clothing_segment_data_id should be from a newly generated one
      //  from `insertClothingSegmentData()` instead of the previous
      //  revision's one
      const {
        name,
        item_type,
        uniform_thickness,
        default_shell_layer_id,
        default_fill_layer_id,
        default_lining_layer_id,
        default_interlining_layer_id,
        // clothing_segment_data_id,
        // @ts-ignore
      } = currentRevision.clothing_shell_maindata[0];

      // Generate a uuid version 4 locally, so we can do a chain query
      // workaround
      const clothing_segment_data_id = uuidv4();

      // Step 2 - INSERT clothing_segment_data
      const {
        right_sleeve_start_front,
        right_sleeve_end_front,
        right_sleeve_start_back,
        right_sleeve_end_back,
        left_sleeve_start_front,
        left_sleeve_end_front,
        left_sleeve_start_back,
        left_sleeve_end_back,
        right_body_start_front,
        right_body_end_front,
        right_body_start_back,
        right_body_end_back,
        left_body_start_front,
        left_body_end_front,
        left_body_start_back,
        left_body_end_back,
        sleeves_is_symmetrical,
        sleeves_front_back_is_same,
        body_is_symmetrical,
        body_front_back_is_same,
        // @ts-ignore
      } = currentRevision.clothing_shell_maindata[0].clothing_segment_data;
      const clothingSegmentDataVariables = {
        // @ts-ignore
        id: clothing_segment_data_id,
        right_sleeve_start_front,
        right_sleeve_end_front,
        right_sleeve_start_back,
        right_sleeve_end_back,
        left_sleeve_start_front,
        left_sleeve_end_front,
        left_sleeve_start_back,
        left_sleeve_end_back,
        right_body_start_front,
        right_body_end_front,
        right_body_start_back,
        right_body_end_back,
        left_body_start_front,
        left_body_end_front,
        left_body_start_back,
        left_body_end_back,
        sleeves_is_symmetrical,
        sleeves_front_back_is_same,
        body_is_symmetrical,
        body_front_back_is_same,
      };
      await insertClothingSegmentData({
        variables: clothingSegmentDataVariables,
      });

      // 3. INSERT A MAINDATA FOR THAT REVISION
      const variables = {
        revision_id: id,
        is_release: true,
        name,
        item_type,
        uniform_thickness,
        default_shell_layer_id,
        default_fill_layer_id,
        default_lining_layer_id,
        default_interlining_layer_id,
        clothing_segment_data_id,
      };

      await insertMaindata({ variables: { object: variables } });

      await updateUpdatedAt({
        variables: {
          id: clothingShellId,
        },
      });
    },
  });

  // const [
  //   updateCompanyCount,
  //   { loading: loadingUpdCompanyItemCount, error: errorUpdCompanyItemCount },
  // ] = useMutation(Update_Company_Count, {
  //   onCompleted() {
  //     console.log('DONE updateCompanyCount');
  //   },
  // });

  // const [
  //   getProductionItemCountForCompany,
  //   { loading: loadingGetItemCount, error: errorGetItemCount },
  // ] = useLazyQuery(Get_Unique_Item_Maindata_Rev_Amount_For_Brand_Prod_Only, {
  //   // NOTE: We can't use async for `onCompleted` in a `useLazyQuery` as it
  //   // causes weird infinite page re-rendering bugs
  //   onCompleted({ item_maindata_revisions_aggregate }) {
  //     console.log(
  //       'item_maindata_revisions_aggregate:',
  //       item_maindata_revisions_aggregate
  //     );
  //     // @ts-ignore
  //     const { brand } = currentRevision.item_maindata[0];
  //     if (brand) {
  //       const { counts } = brand;
  //       // console.log("counts:", counts);
  //       if (counts) {
  //         updateCompanyCount({
  //           variables: {
  //             id: counts.id,
  //             changes: {
  //               item_count: item_maindata_revisions_aggregate.aggregate.count,
  //             },
  //           },
  //         }).then();
  //       }
  //     }
  //     // message.success({ content: COMMON.UPDATED_ITEM_COUNT, key }, 2);
  //   },
  //   fetchPolicy: 'network-only',
  // });

  if (loading || !currentRevision) return <StateFrame />;
  if (error) return <div>Error! ${JSON.stringify(error, null, 2)}</div>;

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
    // 2. Update the translation revision state to REVIEW
    await updateMaindataRevision({
      variables: {
        // @ts-ignore
        revisionId: currentRevision.id,
        state: DataState.Review,
      },
    });
    // 3. Create an activity entry
    await insertMaindataRevisionChange({
      variables: {
        // @ts-ignore
        revisionId: currentRevision.id,
        userId: 1,
        changeType: DataChangeType.Promotion,
        toState: DataState.Review,
      },
    });
    await updateUpdatedAt({
      variables: {
        id: clothingShellId,
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
    // 2. Update the translation revision state to DEVELOPMENT
    await updateMaindataRevision({
      variables: {
        // @ts-ignore
        revisionId: currentRevision.id,
        state: DataState.Development,
      },
    });

    // 3. Create an activity entry
    await insertMaindataRevisionChange({
      variables: {
        // @ts-ignore
        revisionId: currentRevision.id,
        userId: 1,
        changeType: DataChangeType.Demotion,
        toState: DataState.Development,
      },
    });

    await updateUpdatedAt({
      variables: {
        id: clothingShellId,
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
    // 1. Update the translation revision state to PRODUCTION
    await updateMaindataRevision({
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
      await updateMaindataRevisionToRetired({
        variables: {
          revisionId: matchingPreviousRevision.id,
        },
      });
      await insertMaindataRevisionChangePromoRetired({
        variables: {
          revisionId: matchingPreviousRevision.id,
          userId: 1,
        },
      });
    }

    // 3. Create an activity entry
    await insertMaindataRevisionChange({
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
    // const { brand_id } = currentRevision.item_maindata[0];
    // console.log('brand_id:', brand_id);
    // if (brand_id) {
    //   await getProductionItemCountForCompany({
    //     variables: {
    //       id: brand_id,
    //     },
    //   });
    // }

    await updateUpdatedAt({
      variables: {
        id: clothingShellId,
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
      id: clothingShellId,
      revision: revision + 1,
      state: DataState.Development,
    };
    // 2. INSERT A REVISION
    await insertMaindataRevision({ variables });
  };

  const { getClothingShellMaindataRevisionChangesPromosOnly } = data;

  console.log('!!data:', data);
  console.log(
    'getClothingShellMaindataRevisionChangesPromosOnly:',
    getClothingShellMaindataRevisionChangesPromosOnly
  );

  // Find each of the state's revision
  const changeToDevelopment = getClothingShellMaindataRevisionChangesPromosOnly.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Development
  );
  const changeToReview = getClothingShellMaindataRevisionChangesPromosOnly.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Review
  );
  const changeToProduction = getClothingShellMaindataRevisionChangesPromosOnly.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Production
  );
  const changeToRetired = getClothingShellMaindataRevisionChangesPromosOnly.find(
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
    // console.log('OVERRIDE SHOW');
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

export { ClothingShellStateFrame };
