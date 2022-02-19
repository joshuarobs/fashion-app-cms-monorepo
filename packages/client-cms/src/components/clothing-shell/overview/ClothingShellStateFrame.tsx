import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { DataChangeType, DataState } from '@joshuarobs/clothing-framework';
import { StateFrame } from '../../common/frames/StateFrame/_StateFrame';
import { message } from 'antd';
import { Common } from '../../../strings';
import { useNavigate } from 'react-router-dom';
import { RouteStrings } from '../../../routeStrings';
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
import { Promote_Clothing_Shell_Maindata_Revision_To_Review } from '../../../queries/clothing_shell_maindata_revisions/promoteClothingShellMaindataRevisionToReview';
import { Demote_Clothing_Shell_Maindata_Revision_To_Development } from '../../../queries/clothing_shell_maindata_revisions/demoteClothingShellMaindataRevisionToDevelopment';
import { Promote_Clothing_Shell_Maindata_Revision_To_Production } from '../../../queries/clothing_shell_maindata_revisions/promoteClothingShellMaindataRevisionToProduction';
import { Promote_Clothing_Shell_Maindata_Revision_New_Revision } from '../../../queries/clothing_shell_maindata_revisions/promoteClothingShellMaindataRevisionNewRevision';

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
  const navigate = useNavigate();
  // console.log("STATE - history:", history);

  // console.log("itemMaindataRevision:", itemMaindataRevision);

  const [currentRevision, setCurrentRevision] =
    useState<clothing_shell_maindata_revisions | null>(null);
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

  //==================================================
  // PROMOTIONS
  //==================================================
  const [promoteClothingShellMaindataRevisionToReview] = useMutation(
    Promote_Clothing_Shell_Maindata_Revision_To_Review,
    {
      awaitRefetchQueries: true,
      refetchQueries: [],
    }
  );

  const [demoteClothingShellMaindataRevisionToDevelopment] = useMutation(
    Demote_Clothing_Shell_Maindata_Revision_To_Development,
    {
      awaitRefetchQueries: true,
      refetchQueries: [],
    }
  );

  const [promoteClothingShellMaindataRevisionToProduction] = useMutation(
    Promote_Clothing_Shell_Maindata_Revision_To_Production,
    {
      awaitRefetchQueries: true,
      refetchQueries: [],
    }
  );

  const [promoteClothingShellMaindataRevisionNewRevision] = useMutation(
    Promote_Clothing_Shell_Maindata_Revision_New_Revision,
    {
      awaitRefetchQueries: true,
      refetchQueries: [],
    }
  );

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
    await promoteClothingShellMaindataRevisionToReview({
      variables: {
        id: currentRevision.id,
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
    await demoteClothingShellMaindataRevisionToDevelopment({
      variables: {
        id: currentRevision.id,
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
    await promoteClothingShellMaindataRevisionToProduction({
      variables: {
        id: currentRevision.id,
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
    // console.log('newRevision() > currentRevision:', currentRevision);
    const newRevisionData =
      await promoteClothingShellMaindataRevisionNewRevision({
        variables: { id: currentRevision.id },
      });
    // console.log('newRevisionData:', newRevisionData);
    const newRevision =
      newRevisionData.data.promoteClothingShellMaindataRevisionNewRevision;
    // console.log('newRevision:', newRevision);

    navigate(
      `${RouteStrings.Clothing_Shells__Clothing_Shell}/${newRevision.clothing_shell_id}?rev=${newRevision.revision}`
    );
    history.go(0);
    message.success(
      { content: Common.State_Related.Created_New_Revision, key },
      2
    );
  };

  const { getClothingShellMaindataRevisionChangesPromosOnly } = data;

  console.log('!!data:', data);
  console.log(
    'getClothingShellMaindataRevisionChangesPromosOnly:',
    getClothingShellMaindataRevisionChangesPromosOnly
  );

  // Find each of the state's revision
  const changeToDevelopment =
    getClothingShellMaindataRevisionChangesPromosOnly.find(
      // @ts-ignore
      ({ to_state }) => to_state === DataState.Development
    );
  const changeToReview = getClothingShellMaindataRevisionChangesPromosOnly.find(
    // @ts-ignore
    ({ to_state }) => to_state === DataState.Review
  );
  const changeToProduction =
    getClothingShellMaindataRevisionChangesPromosOnly.find(
      // @ts-ignore
      ({ to_state }) => to_state === DataState.Production
    );
  const changeToRetired =
    getClothingShellMaindataRevisionChangesPromosOnly.find(
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
