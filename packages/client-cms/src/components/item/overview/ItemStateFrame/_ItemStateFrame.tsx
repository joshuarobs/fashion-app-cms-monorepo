import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { DataChangeType, DataState } from '@joshuarobs/clothing-framework';
import { StateFrame } from '../../../common/frames/StateFrame/_StateFrame';
import { message } from 'antd';
import { Common } from '../../../../strings';
import { useNavigate } from 'react-router-dom';
import { Update_Item_Maindata_Revision_State } from '../../../../queries/item_maindata_revisions/updateItemMaindataRevisionState';
import { Insert_Item_Maindata_Revision_Change } from '../../../../queries/item_maindata_revision_changes/insertItemMaindataRevisionChange';
import { RouteStrings } from '../../../../routeStrings';
import { Insert_Item_Maindata_Revision } from '../../../../queries/item_maindata_revisions/insertItemMaindataRevision';
import { Insert_Item_Maindata } from '../../../../queries/item_maindata/insertItemMaindata';
import { Update_Item_Updated_At } from '../../../../queries/items/updateItemUpdatedAt';
import { Get_Unique_Item_Maindata_Rev_Amount_For_Brand_Prod_Only } from '../../../../queries/item_maindata_revisions/getUniqueItemMaindataRevisionsForBrandInProduction';
import { Get_Item_Maindata_Revision_Changes_Promos_Only } from '../../../../queries/item_maindata_revision_changes/getItemMaindataRevisionChangesPromosOnly';
import { Update_Item_Maindata_Revision_To_Retired } from '../../../../queries/item_maindata_revisions/updateItemMaindataRevisionToRetired';
import { Insert_Item_Maindata_Revision_Change_Promo_Retired } from '../../../../queries/item_maindata_revision_changes/insertItemMaindataRevisionChangePromoRetired';
import { item_maindata_revisions } from '../../../../utils/gql-interfaces/item_maindata_revisions';
import { Update_Item_Maindata_Revision_State_Promote_To_Review } from '../../../../queries/item_maindata_revisions/updateItemMaindataRevisionStatePromoteToReview';
import { Update_Item_Maindata_Revision_State_Demote_To_Development } from '../../../../queries/item_maindata_revisions/updateItemMaindataRevisionStateDemoteToDevelopment';
import { Get_Item_Maindata_Revision_Changes } from '../../../../queries/item_maindata_revision_changes/getItemMaindataRevisionChanges';
import { StateFrameHolder } from './StateFrameHolder';
import { Get_Item_Maindata_Revision_By_Rev_And_Item_Id_BB } from '../../../../queries/item_maindata_revisions/getItemMaindataRevisionByRevAndItemIdBB';
import { Update_Item_Maindata_Revision_State_Promote_To_Production } from '../../../../queries/item_maindata_revisions/updateItemMaindataRevisionStatePromoteToProduction';
import { Insert_Item_Maindata_Revision_Items_Page } from '../../../../queries/item_maindata_revisions/insertItemMaindataRevisionItemsPage';
import { Get_Revisions_For_Item_BB } from '../../../../queries/item_maindata_revisions/getRevisionsForItemBB';

const key = 'state-localisations';

interface ItemStateFrameProps {
  itemId: number;
  itemMaindataRevision: item_maindata_revisions;
  paramsRevision: string;
  // refetchTranslations?: Function;
  // refetchItemTransRevs?: Function;
  uniqueRevisions: any;
  refetchRevisions: Function;
  refetchItemBaseData: Function;
  refetchLatestActivity: Function;
}

function ItemStateFrame({
  itemId,
  itemMaindataRevision,
  paramsRevision,
  // refetchTranslations = () => {},
  // refetchItemTransRevs = () => {},
  uniqueRevisions,
  refetchRevisions = () => {},
  refetchItemBaseData = () => {},
  refetchLatestActivity = () => {},
}: // translations
ItemStateFrameProps) {
  const navigate = useNavigate();
  // console.log("STATE - history:", history);

  // console.log('itemMaindataRevision:', itemMaindataRevision);
  console.log('ItemStateFrame!!!');

  const [currentRevision, setCurrentRevision] =
    useState<item_maindata_revisions | null>(null);
  useEffect(() => {
    setCurrentRevision(itemMaindataRevision);
    // }, [paramsRevision]);
  }, [paramsRevision, itemMaindataRevision]);

  const [state2, setState] = useState<DataState | null>(null);
  useEffect(() => {
    setState(itemMaindataRevision ? itemMaindataRevision.state : null);
  }, [paramsRevision]);

  const [changeToDevelopment2, setChangeToDevelopment] = useState();

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

  const {
    loading: loadingRevisionChanges,
    error: errorRevisionChanges,
    data: dataRevisionChanges,
  } = useQuery(Get_Item_Maindata_Revision_Changes_Promos_Only, {
    variables: {
      itemId,
      revision: Number.parseInt(paramsRevision),
    },
    fetchPolicy: 'cache-and-network',
  });

  const {
    loading: loadingMaindataRevisionBB,
    error: errorMaindataRevisionBB,
    data: dataMaindataRevisionBB,
  } = useQuery(Get_Item_Maindata_Revision_By_Rev_And_Item_Id_BB, {
    variables: {
      itemId,
      revision: Number.parseInt(paramsRevision),
    },
    fetchPolicy: 'cache-and-network',
  });

  //======================================================================
  // Promotion Mutations
  //======================================================================
  const [updateItemMaindataRevisionStatePromoteToReview] = useMutation(
    Update_Item_Maindata_Revision_State_Promote_To_Review,
    {
      refetchQueries: [
        // {
        //   query: Get_Item_Maindata_Revision_Changes,
        //   variables: {
        //     id: itemId,
        //     limit: 10,
        //   },
        // },
        // {
        //   query: Get_Item_Maindata_Revision_Changes_Promos_Only,
        //   variables: {
        //     itemId,
        //     revision: Number.parseInt(paramsRevision),
        //   },
        // },
        {
          query: Get_Item_Maindata_Revision_Changes,
          variables: {
            id: itemId,
            revision: Number.parseInt(paramsRevision),
          },
        },
      ],
    }
  );

  const [updateItemMaindataRevisionStateDemoteToDevelopment] = useMutation(
    Update_Item_Maindata_Revision_State_Demote_To_Development,
    {
      refetchQueries: [
        // {
        //   query: Get_Item_Maindata_Revision_Changes,
        //   variables: {
        //     id: itemId,
        //     limit: 10,
        //   },
        // },
        // {
        //   query: Get_Item_Maindata_Revision_Changes_Promos_Only,
        //   variables: {
        //     itemId,
        //     revision: Number.parseInt(paramsRevision),
        //   },
        // },
        {
          query: Get_Item_Maindata_Revision_Changes,
          variables: {
            id: itemId,
            revision: Number.parseInt(paramsRevision),
          },
        },
      ],
    }
  );

  const [updateItemMaindataRevisionStatePromoteToProduction] = useMutation(
    Update_Item_Maindata_Revision_State_Promote_To_Production,
    {
      refetchQueries: [
        // {
        //   query: Get_Item_Maindata_Revision_Changes,
        //   variables: {
        //     id: itemId,
        //     limit: 10,
        //   },
        // },
        // {
        //   query: Get_Item_Maindata_Revision_Changes_Promos_Only,
        //   variables: {
        //     itemId,
        //     revision: Number.parseInt(paramsRevision),
        //   },
        // },
        {
          query: Get_Item_Maindata_Revision_Changes,
          variables: {
            id: itemId,
            revision: Number.parseInt(paramsRevision),
          },
        },
      ],
    }
  );

  const [insertItemMaindataRevisionItemPage] = useMutation(
    Insert_Item_Maindata_Revision_Items_Page,
    {
      async onCompleted({ insertItemMaindataRevisionItemsPage }) {
        // Not sure if we need this alongside the refetch query
        // `Get_Revisions_For_Item_BB`. Might as well have both since it works
        await refetchRevisions();
        const { item_id, revision } = insertItemMaindataRevisionItemsPage;
        navigate(
          `${RouteStrings.Items__Clothing__Item}/${item_id}?rev=${revision}`
        );
        // history.go(0);
        message
          .success(
            { content: Common.State_Related.Created_New_Revision, key },
            2
          )
          .then();
      },
      refetchQueries: [
        // {
        //   query: Get_Item_Maindata_Revision_Changes,
        //   variables: {
        //     id: itemId,
        //     limit: 10,
        //   },
        // },
        {
          query: Get_Revisions_For_Item_BB,
          variables: { id: itemId },
        },
        // {
        //   query: Get_Item_Maindata_Revision_Changes_Promos_Only,
        //   variables: {
        //     itemId,
        //     revision: Number.parseInt(paramsRevision),
        //   },
        // },
        {
          query: Get_Item_Maindata_Revision_Changes,
          variables: {
            id: itemId,
            revision: Number.parseInt(paramsRevision),
          },
        },
      ],
    }
  );

  //======================================================================
  // Loading and Errors
  //======================================================================
  if (loadingRevisionChanges || loadingMaindataRevisionBB || !currentRevision) {
    return <StateFrame />;
  }
  if (errorRevisionChanges) {
    return (
      <div>
        Error! (Revision Changes) $
        {JSON.stringify(errorRevisionChanges, null, 2)}
      </div>
    );
  }
  if (errorMaindataRevisionBB) {
    return (
      <div>
        Error! (Maindata Revision BB) $
        {JSON.stringify(errorMaindataRevisionBB, null, 2)}
      </div>
    );
  }

  console.log('ItemStateFrame#dataRevisionChanges:', dataRevisionChanges);
  console.log('ItemStateFrame#dataMaindataRevisionBB:', dataMaindataRevisionBB);

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
    await updateItemMaindataRevisionStatePromoteToReview({
      variables: {
        id: currentRevision.id,
        userId: 1,
      },
    });
    await refetchLatestActivity();
    // console.log('refetch latest activity()');
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
    await updateItemMaindataRevisionStateDemoteToDevelopment({
      variables: {
        id: currentRevision.id,
        userId: 1,
      },
    });
    await refetchLatestActivity();
    // console.log('refetch latest activity()');
    // Refresh the page
    // history.go(0);
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
    await updateItemMaindataRevisionStatePromoteToProduction({
      variables: {
        id: currentRevision.id,
        userId: 1,
      },
    });
    await refetchLatestActivity();
    // console.log('refetch latest activity()');
    // TODO: Refresh unique revisions, otherwise if you open the dropdown
    //  box after promoting, you'll still see a green dot next to the
    //  previous revision

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

    // Refresh the page
    // history.go(0);
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
      // revision: revision + 1,
      // state: DataState.Development,
    };
    // 2. INSERT A REVISION
    // await insertItemMaindataRevision({ variables });
    await insertItemMaindataRevisionItemPage({ variables });
  };

  const { getItemMaindataRevisionChangesPromosOnly } = dataRevisionChanges;
  const { getItemMaindataRevisionByRevAndItemIdBarebones } =
    dataMaindataRevisionBB;

  console.log(
    'item_maindata_revision_changes:',
    getItemMaindataRevisionChangesPromosOnly
  );

  // Find each of the state's revision
  const changeToDevelopment = getItemMaindataRevisionChangesPromosOnly.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Development
  );
  const changeToReview = getItemMaindataRevisionChangesPromosOnly.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Review
  );
  const changeToProduction = getItemMaindataRevisionChangesPromosOnly.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Production
  );
  const changeToRetired = getItemMaindataRevisionChangesPromosOnly.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Retired
  );

  // useEffect(() => {
  //   setChangeToDevelopment(changeToDevelopment);
  // });

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

  const { state } = getItemMaindataRevisionByRevAndItemIdBarebones[0];
  console.log('!!state:', state);

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
    // <StateFrameHolder
    //   state={state}
    //   // changeToDevelopment={changeToDevelopment}
    //   // changeToReview={changeToReview}
    //   // changeToProduction={changeToProduction}
    //   // changeToRetired={changeToRetired}
    //   getItemMaindataRevisionChangesPromosOnly={
    //     getItemMaindataRevisionChangesPromosOnly
    //   }
    //   promoteToReview={promoteToReview}
    //   promoteToProduction={promoteToProduction}
    //   demoteBackToDevelopment={demoteBackToDevelopment}
    //   newRevision={newRevision}
    //   overrideHidePromoteButton={overrideHidePromoteButton}
    //   overrideShowPromoteButton={overrideShowPromoteButton}
    // />
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
