import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { Common } from '../../../strings';
import { UnsavedChangesCard } from '../../common/UnsavedChangesCard';
import { ColumnOfFrames } from '../../common/frames/ColumnOfFrames';
import { DetailsFrame } from './DetailsFrame/_DetailsFrame';
import { useMutation, useQuery } from '@apollo/client';
import { OverviewActivityFrame } from '../../common/activity/OverviewActivityFrame';
import { ClothingShellOverviewFrame } from '../../common/frames/ClothingShellOverviewFrame/_ClothingShellOverviewFrame';
import { Insert_Item_Maindata_Revision_Change } from '../../../queries/item_maindata_revision_changes/insertItemMaindataRevisionChange';
import {
  DataAction,
  DataChangeType,
  DataState,
} from '@joshuarobs/clothing-framework/build/enums';
import { useHistory } from 'react-router-dom';
import { ItemStateFrame } from './ItemStateFrame/_ItemStateFrame';
import { Update_Item_Maindata_Revision_State } from '../../../queries/item_maindata_revisions/updateItemMaindataRevisionState';
import { Update_Item_Maindata } from '../../../queries/item_maindata/updateItemMaindata';
import { item_maindata } from '../../../utils/gql-interfaces/item_maindata';
import { items } from '../../../utils/gql-interfaces/items';
import { item_maindata_revisions } from '../../../utils/gql-interfaces/item_maindata_revisions';
import { Get_Item_Maindata_Revision_Changes } from '../../../queries/item_maindata_revision_changes/getItemMaindataRevisionChanges';
import { ClothingSegmentsData } from '@joshuarobs/clothing-framework';
import { VersionablePageErrors } from '../../../utils/quick-error-gen/VersionablePageErrors';
import { Get_Revisions_For_Item_BB } from '../../../queries/item_maindata_revisions/getRevisionsForItemBB';
import { Get_Item_Maindata_Revision_Changes_Promos_Only } from '../../../queries/item_maindata_revision_changes/getItemMaindataRevisionChangesPromosOnly';

const key = 'unsaved-changes-overview';

interface OverviewMainFrameProps {
  item: items;
  paramsRevision: any;
  paramsIsRelease: any;
  uniqueRevisions: any;
  itemMaindataRevision: item_maindata_revisions;
  revisionDraft: item_maindata;
  revisionRelease: item_maindata;
  refetchRevisions: Function;
  refetchItemBaseData: Function;
}

function OverviewMainFrame({
  item,
  paramsRevision,
  paramsIsRelease,
  uniqueRevisions,
  itemMaindataRevision,
  revisionDraft,
  revisionRelease,
  refetchRevisions,
  refetchItemBaseData,
}: OverviewMainFrameProps) {
  const history = useHistory();
  // console.log("item:", item);
  console.log('!!!itemMaindataRevision:', itemMaindataRevision);
  // console.log('revisionDraft:', revisionDraft);
  console.log('revisionRelease:', revisionRelease);

  const [name, setName] = useState<string | null>('null');
  useEffect(() => {
    setName(revisionRelease.name);
  }, [revisionRelease, paramsRevision]);

  const [type, setType] = useState<string>('');
  useEffect(() => {
    // setType(revisionRelease ? revisionRelease.type : ITEM_TYPE.CLOTHING);
    setType(revisionRelease.type);
  }, [revisionRelease, paramsRevision]);

  const [short_id, setShortId] = useState<number | null>(null);
  useEffect(() => {
    setShortId(revisionRelease.short_id);
  }, [revisionRelease, paramsRevision]);

  const [occasions, setOccasions] = useState();
  const [brand_id, setBrandId] = useState(revisionRelease.brand_id);
  useEffect(() => {
    // setBrandId(revisionRelease ? revisionRelease.brand_id : null);
    console.log('REV RELEASE - BRAND ID:', revisionRelease.brand_id);
    setBrandId(revisionRelease.brand_id);
  }, [revisionRelease, paramsRevision]);

  // console.log(
  //   "revisionRelease.brand_id:",
  //   revisionRelease.brand_id,
  //   "\nrevisionRelease:",
  //   revisionRelease
  // );

  const [for_gender, setForGender] = useState('');
  useEffect(() => {
    // setForGender(revisionRelease ? revisionRelease.for_gender : null);
    setForGender(revisionRelease.for_gender);
  }, [revisionRelease, paramsRevision]);

  const [clothing_shell_id, setClothingShellId] = useState<number | null>(null);
  const [prevClothingShellId, setPrevClothingShellId] = useState<number | null>(
    null
  );
  useEffect(() => {
    // setClothingShellId(
    //   revisionRelease ? revisionRelease.clothing_shell_id : null
    // );
    setClothingShellId(revisionRelease.clothing_shell_id);
  }, [revisionRelease, paramsRevision]);

  const [originalClothingShellId, setOriginalClothingShellId] = useState<
    number | null
  >(null);
  useEffect(() => {
    // setOriginalClothingShellId(clothing_shell_id);
    setOriginalClothingShellId(revisionRelease.clothing_shell_id);
  }, [paramsRevision]);

  const [made_in_id, setMadeInId] = useState<string | null>(null);
  useEffect(() => {
    setMadeInId(revisionRelease.made_in_id);
  }, [revisionRelease, paramsRevision]);

  const {
    loading: loadingLatestActivity,
    error: errorLatestActivity,
    data: dataLatestActivity,
    refetch: refetchLatestActivity,
  } = useQuery(Get_Item_Maindata_Revision_Changes, {
    variables: {
      id: item.id,
      limit: 10,
    },
    fetchPolicy: 'cache-and-network',
  });

  //getItemMaindataRevisionChanges

  // Hooks for GraphQL queries
  const [
    insertItemMaindataRevisionChange,
    // { loading: loadingAddRevisionChange, error: errorAddRevisionChange }
  ] = useMutation(Insert_Item_Maindata_Revision_Change, {
    onCompleted() {},
  });

  const [
    updateItemMaindata,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(Update_Item_Maindata, {
    async onCompleted() {
      setOriginalClothingShellId(clothing_shell_id);
      // message.success({ content: COMMON.CHANGES_SAVED, key }, 2);
      // const variables = {
      //   revisionId: itemMaindataRevision.id,
      //   userId: 1,
      //   changeType: DataChangeType.Action,
      //   action: DataAction.Update,
      // };
      // await insertItemMaindataRevisionChange({
      //   variables,
      // });
    },
    refetchQueries: [
      {
        query: Get_Item_Maindata_Revision_Changes,
        variables: {
          id: item.id,
          revision: Number.parseInt(paramsRevision),
        },
      },
    ],
  });

  if (mutationError) {
    console.error('mutationError:', mutationError);
  }

  const [
    updateItemMaindataRevisionState,
    // { loading: loadingUpdateRevisionRetired, error: errorUpdateRevisionRetired }
  ] = useMutation(Update_Item_Maindata_Revision_State, {
    onCompleted() {
      const variables = {
        revisionId: itemMaindataRevision.id,
        userId: 1,
        changeType: DataChangeType.Promotion,
        toState: DataState.Retired,
      };
      insertItemMaindataRevisionChange({
        variables,
      }).then(() => {
        message
          .success(
            { content: Common.State_Related.Overrode_To_Retired, key },
            2
          )
          .then();
        history.go(0);
      });
    },
  });

  //
  // const [updateItemUpdatedAt] = useMutation(Update_Item_Updated_At, {
  //   onCompleted() {},
  // });
  //
  // const [updateClothingShellCount] = useMutation(
  //   Update_Clothing_Shell_Count_By_Clothing_Shell_Id,
  //   {
  //     onCompleted({ update_clothing_shell_counts_by_pk }) {
  //       console.log(
  //         'DONE updateClothingShellCount:',
  //         update_clothing_shell_counts_by_pk
  //       );
  //     },
  //   }
  // );
  //
  // const [getItemCountForClothingShell] = useLazyQuery(
  //   Get_Num_Of_Unique_Items_For_Clothing_Shell,
  //   {
  //     // NOTE: We can't use async for `onCompleted` in a `useLazyQuery` as it
  //     // causes weird infinite page re-rendering bugs
  //     onCompleted({ item_maindata_revisions_aggregate }) {
  //       console.log(
  //         'CLOTHING SHELL ITEM COUNT:',
  //         item_maindata_revisions_aggregate.aggregate.count
  //       );
  //       let clothingShellId = null;
  //       if (clothing_shell_id) {
  //         clothingShellId = clothing_shell_id;
  //       } else if (revisionRelease.clothing_shell_id) {
  //         clothingShellId = revisionRelease.clothing_shell_id;
  //       } else if (prevClothingShellId) {
  //         clothingShellId = prevClothingShellId;
  //       }
  //       // console.log("prevClothingShellId:", prevClothingShellId);
  //       if (clothingShellId) {
  //         updateClothingShellCount({
  //           variables: {
  //             clothingShellId: clothingShellId,
  //             changes: {
  //               item_count: item_maindata_revisions_aggregate.aggregate.count,
  //             },
  //           },
  //         }).then();
  //         message.success({ content: Common.Changes_Saved, key }, 2).then();
  //         history.go(0);
  //       }
  //       // message.success({ content: COMMON.UPDATED_ITEM_COUNT, key }, 2);
  //     },
  //     fetchPolicy: 'network-only',
  //   }
  // );

  const overrideRevisionStateToRetired = () => {
    // TODO: Check if user is admin
    message
      .loading({
        content: Common.State_Related.Overriding_To_Retired,
        key,
      })
      .then();
    updateItemMaindataRevisionState({
      variables: {
        revisionId: itemMaindataRevision.id,
        state: DataState.Retired,
      },
    }).then();
  };

  console.log(
    'uniqueRevisions:',
    uniqueRevisions,
    '\ncurrentRevision:',
    itemMaindataRevision
  );

  const setToRetiredData = {
    overrideStateToRetired: overrideRevisionStateToRetired,
    // TODO: Check if user is admin
    optionVisible: true,
    optionDisabled:
      // If the latest revision
      itemMaindataRevision.id === uniqueRevisions[0].id ||
      // Or, if not in production
      itemMaindataRevision.state !== DataState.Production,
  };

  const disabled = itemMaindataRevision.state !== DataState.Development;

  const hasChanged = {
    name: name !== revisionRelease.name,
    type: type !== revisionRelease.type,
    brand_id: brand_id !== revisionRelease.brand_id,
    for_gender: for_gender !== revisionRelease.for_gender,
    clothing_shell_id: clothing_shell_id !== revisionRelease.clothing_shell_id,
    made_in_id: made_in_id !== revisionRelease.made_in_id,
    // short_id: short_id !== item.short_id
  };

  let numberOfChanges = 0;
  Object.keys(hasChanged).forEach((key) => {
    // @ts-ignore
    if (!disabled && hasChanged[key]) {
      numberOfChanges++;
    }
  });

  const onChange = (checkedValues: any) => {
    setOccasions(checkedValues);
  };

  const discardChanges = () => {
    setName(revisionRelease.name);
    setType(revisionRelease.type);
    setShortId(revisionRelease.short_id);
    setBrandId(revisionRelease.brand_id);
    setForGender(revisionRelease.for_gender);
    setClothingShellId(revisionRelease.clothing_shell_id);
    setMadeInId(revisionRelease.made_in_id);
  };

  interface changesProps {
    name?: string | null;
    type?: any;
    brand_id?: number | null;
    for_gender?: any;
    made_in_id?: string | null;
    clothing_shell_id?: number | null;
  }

  const changes: changesProps = {};

  const saveChanges = async () => {
    if (!disabled && numberOfChanges > 0) {
      const variables = {
        id: revisionRelease.id,
        changes,
        itemId: item.id,
        countsId: null,
      };

      if (hasChanged.name) {
        variables.changes.name = name;
      }

      if (hasChanged.type) {
        variables.changes.type = type;
      }

      // if (hasChanged.short_id) {
      //   // @ts-ignore
      //   variables.changes.short_id = short_id;
      // }

      if (hasChanged.brand_id) {
        variables.changes.brand_id = brand_id;
      }

      if (hasChanged.for_gender) {
        variables.changes.for_gender = for_gender;
      }

      if (hasChanged.made_in_id) {
        variables.changes.made_in_id = made_in_id;
      }

      if (hasChanged.clothing_shell_id) {
        setPrevClothingShellId(revisionRelease.clothing_shell_id);
        variables.changes.clothing_shell_id = clothing_shell_id;
        // @ts-ignore
        variables.countsId = clothing_shell_id
          ? clothing_shell_id
          : revisionRelease.clothing_shell_id;
        // console.log(
        //   "HAS CHANGED - CLOTHING SHELL:",
        //   "\nclothing_shell_id:",
        //   clothing_shell_id,
        //   "\nrevisionRelease:clothing_shell_id:",
        //   revisionRelease.clothing_shell_id
        // );
      }
      message.loading({ content: Common.Saving_Changes, key });
      // Update the clothing shell item's count only if changes are made in
      // development
      // Set the clothing shell id as one that we either we're going
      // towards, or going from, as sometimes one or the other value can
      // be null
      // console.log('updateItemMaindata-variables:', variables);
      await updateItemMaindata({ variables });
      message.success({ content: Common.Changes_Saved, key }, 2);

      // Force refresh the page if changes were made to the clothing shell,
      // since if we don't the counter for the clothing shell doesn't update.
      // We don't need this when we don't edit the selected clothing shell,
      // and the UI automatically updates without needing a refresh
      if (variables.countsId) {
        history.go(0);
      }
      // history.go(0);
      // if (countsId) {
      //   // Update the clothing shell item's count only if changes are made in
      //   // development
      //   // Set the clothing shell id as one that we either we're going
      //   // towards, or going from, as sometimes one or the other value can
      //   // be null
      //   // await getItemCountForClothingShell({
      //   //   variables: {
      //   //     id: countsId,
      //   //   },
      //   // });
      // } else {
      //
      // }
    }
  };

  const deleteItemMaindataRevisionAndMaindata = () => {};

  // revisionRelease.clothing_shell;

  console.log('---revisionRelease:', revisionRelease);

  // Any potential errors for data passed into Clothing shell overview frame
  let clothingShellOverviewError: VersionablePageErrors | undefined;

  let clothingSegmentsData;
  // Ensure there is a clothing shell
  if (revisionRelease.clothing_shell) {
    // Ensure that the clothing shell is proper and not broken (has a
    // `clothing_shell_maindata`
    if (!revisionRelease.clothing_shell.clothing_shell_maindata_revisions[0]) {
      clothingShellOverviewError = VersionablePageErrors.No_Maindata_Revision;
      // return (
      //   <div>This clothing shell has no clothing_shell_maindata_revisions.</div>
      // );
    } else if (
      !revisionRelease.clothing_shell.clothing_shell_maindata_revisions[0]
        .clothing_shell_maindata
    ) {
      clothingShellOverviewError = VersionablePageErrors.No_Maindata;
      // return <div>This clothing shell has no clothing_shell_maindata.</div>;
    } else {
      const clothingSegmentDataFromDb =
        revisionRelease.clothing_shell.clothing_shell_maindata_revisions[0]
          .clothing_shell_maindata[0].clothing_segment_data;

      clothingSegmentsData = new ClothingSegmentsData(
        clothingSegmentDataFromDb.right_sleeve_start_front,
        clothingSegmentDataFromDb.right_sleeve_end_front,
        clothingSegmentDataFromDb.right_sleeve_start_back,
        clothingSegmentDataFromDb.right_sleeve_end_back,
        clothingSegmentDataFromDb.left_sleeve_start_front,
        clothingSegmentDataFromDb.left_sleeve_end_front,
        clothingSegmentDataFromDb.left_sleeve_start_back,
        clothingSegmentDataFromDb.left_sleeve_end_back,
        clothingSegmentDataFromDb.right_body_start_front,
        clothingSegmentDataFromDb.right_body_end_front,
        clothingSegmentDataFromDb.right_body_start_back,
        clothingSegmentDataFromDb.right_body_end_back,
        clothingSegmentDataFromDb.left_body_start_front,
        clothingSegmentDataFromDb.left_body_end_front,
        clothingSegmentDataFromDb.left_body_start_back,
        clothingSegmentDataFromDb.left_body_end_back,
        null,
        null,
        clothingSegmentDataFromDb.sleeves_is_symmetrical,
        clothingSegmentDataFromDb.sleeves_front_back_is_same,
        clothingSegmentDataFromDb.body_is_symmetrical,
        clothingSegmentDataFromDb.body_front_back_is_same
      );
    }
  }

  return (
    <>
      <UnsavedChangesCard
        numberOfChanges={numberOfChanges}
        discardChanges={discardChanges}
        saveChanges={saveChanges}
      />
      <ColumnOfFrames>
        {/*<GenericInformationFrame data={item} />*/}
        <DetailsFrame
          item={item}
          itemMaindataRevision={itemMaindataRevision}
          uniqueRevisions={uniqueRevisions}
          paramsRevision={paramsRevision}
          paramsIsRelease={paramsIsRelease}
          name={name}
          setName={setName}
          type={type}
          setType={setType}
          short_id={short_id}
          setShortId={setShortId}
          occasions={occasions}
          setOccasions={setOccasions}
          brand_id={brand_id}
          setBrandId={setBrandId}
          for_gender={for_gender}
          setForGender={setForGender}
          made_in_id={made_in_id}
          setMadeInId={setMadeInId}
          disabled={disabled}
          hasChanged={hasChanged}
          numberOfChanges={numberOfChanges}
          onChange={onChange}
          saveChanges={saveChanges}
          setToRetiredData={setToRetiredData}
          // deleteItemMaindataRevision={deleteItemMaindataRevisionAndMaindata}
          deleteItemMaindataRevisionAndMaindata={
            deleteItemMaindataRevisionAndMaindata
          }
        />
      </ColumnOfFrames>
      <ColumnOfFrames>
        <ClothingShellOverviewFrame
          clothingSegmentsData={clothingSegmentsData}
          currentClothingShellId={clothing_shell_id}
          item={item}
          pageIsItem
          setClothingShellId={setClothingShellId}
          originalClothingShellId={originalClothingShellId}
          clothingShellOverviewError={clothingShellOverviewError}
          disabled={disabled}
        />
      </ColumnOfFrames>
      <ColumnOfFrames>
        <ItemStateFrame
          // translations={translations}
          itemId={item.id}
          itemMaindataRevision={itemMaindataRevision}
          paramsRevision={paramsRevision}
          // refetchTranslations={refetchTranslations}
          // refetchItemTransRevs={refetchItemTransRevs}
          uniqueRevisions={uniqueRevisions}
          refetchRevisions={refetchRevisions}
          refetchItemBaseData={refetchItemBaseData}
          refetchLatestActivity={refetchLatestActivity}
        />
        <OverviewActivityFrame
          id={item.id}
          query={Get_Item_Maindata_Revision_Changes}
          childObjectString={'getItemMaindataRevisionChanges'}
          // overrideError={errorLatestActivity}
          // overrideLoading={loadingLatestActivity}
          // overrideData={dataLatestActivity}
        />
      </ColumnOfFrames>
    </>
  );
}

export { OverviewMainFrame };
