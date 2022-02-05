import React, { useEffect, useState } from 'react';
import { StateFrame } from '../../../common/frames/StateFrame/_StateFrame';
import { DataState } from '@joshuarobs/clothing-framework';
import { item_maindata_revision_changes } from '../../../../utils/gql-interfaces/item_maindata_revision_changes';

interface StateFrameHolderProps {
  state: DataState | null;
  // changeToDevelopment: item_maindata_revision_changes;
  // changeToReview: item_maindata_revision_changes;
  // changeToProduction: item_maindata_revision_changes;
  // changeToRetired: item_maindata_revision_changes;
  getItemMaindataRevisionChangesPromosOnly: item_maindata_revision_changes[];
  promoteToReview: Function;
  promoteToProduction: Function;
  demoteBackToDevelopment: Function;
  newRevision: Function;
  overrideHidePromoteButton: boolean;
  overrideShowPromoteButton: boolean;
}

function StateFrameHolder({
  state,
  // changeToDevelopment,
  // changeToReview,
  // changeToProduction,
  // changeToRetired,
  getItemMaindataRevisionChangesPromosOnly,
  promoteToReview,
  promoteToProduction,
  demoteBackToDevelopment,
  newRevision,
  overrideHidePromoteButton,
  overrideShowPromoteButton,
}: StateFrameHolderProps) {
  const [changeToDevelopment, setChangeToDevelopment] = useState();
  const [changeToReview, setChangeToReview] = useState();
  const [changeToProduction, setChangeToProduction] = useState();
  const [changeToRetired, setChangeToRetired] = useState();

  console.log('state:', state);

  useEffect(() => {
    const changeToDevelopment = getItemMaindataRevisionChangesPromosOnly.find(
      ({ to_state }) => to_state === DataState.Development
    );
    // @ts-ignore
    setChangeToDevelopment(changeToDevelopment);

    const changeToReview = getItemMaindataRevisionChangesPromosOnly.find(
      ({ to_state }) => to_state === DataState.Review
    );
    // @ts-ignore
    setChangeToReview(changeToReview);

    const changeToProduction = getItemMaindataRevisionChangesPromosOnly.find(
      ({ to_state }) => to_state === DataState.Production
    );
    // @ts-ignore
    setChangeToProduction(changeToProduction);

    const changeToRetired = getItemMaindataRevisionChangesPromosOnly.find(
      ({ to_state }) => to_state === DataState.Retired
    );
    // @ts-ignore
    setChangeToRetired(changeToRetired);
  }, [state, getItemMaindataRevisionChangesPromosOnly]);

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

export { StateFrameHolder };
