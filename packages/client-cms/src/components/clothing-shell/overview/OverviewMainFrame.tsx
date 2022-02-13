import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Insert_Clothing_Shell_Maindata_Revision_Change } from '../../../queries/clothing_shell_maindata_revision_changes/insertClothingShellMaindataRevisionChange';
import { clothing_shell_maindata_revisions } from '../../../utils/gql-interfaces/clothing_shell_maindata_revisions';
import { clothing_shells } from '../../../utils/gql-interfaces/clothing_shells';
import { clothing_shell_maindata } from '../../../utils/gql-interfaces/clothing_shell_maindata';
import { ColumnOfFrames } from '../../common/frames/ColumnOfFrames';
import { DetailsFrame } from './DetailsFrame/_DetailsFrame';
import { MiniItemsFrameClothingShell } from '../MiniItemsFrameClothingShell';
import { ClothingShellOverviewFrame } from '../../common/frames/ClothingShellOverviewFrame/_ClothingShellOverviewFrame';
import { message } from 'antd';
import { Common } from '../../../strings';
import { Update_Clothing_Shell_Maindata } from '../../../queries/clothing_shell_maindata/updateClothingShellMaindata';
import { Update_Clothing_Shell_Updated_At } from '../../../queries/clothing_shells/updateClothingShellUpdatedAt';
import {
  ClothingSegmentsData,
  DataChangeType,
  DataAction,
  DataState,
} from '@joshuarobs/clothing-framework';
import { Update_Clothing_Segment_Data } from '../../../queries/clothing_segment_data/updateClothingSegmentData';
import { ClothingSegmentDataHasChangedProps } from './ClothingSegmentDataHasChangedProps';
import { ClothingShellStateFrame } from './ClothingShellStateFrame';
import { OverviewActivityFrame } from '../../common/activity/OverviewActivityFrame';
import { Get_Clothing_Shell_Maindata_Revision_Changes } from '../../../queries/clothing_shell_maindata_revision_changes/getClothingShellMaindataRevisionChanges';
import { Get_Items_For_Items_Table_Latest } from '../../../queries/items/getItemsForItemsTableLatest';

const key = 'unsaved-changes-overview';

interface OverviewMainFrameProps {
  clothingShell: clothing_shells;
  clothingShellMaindataRevision: clothing_shell_maindata_revisions;
  paramsRevision: any;
  paramsIsRelease: any;
  uniqueRevisions: any;
  // revisionDraft: any;
  revisionRelease: clothing_shell_maindata;
  refetchRevisions: Function;
  refetchBaseData: Function;
}

function OverviewMainFrame({
  clothingShell,
  clothingShellMaindataRevision,
  paramsRevision,
  paramsIsRelease,
  uniqueRevisions,
  // revisionDraft,
  revisionRelease,
  refetchRevisions,
  refetchBaseData,
}: OverviewMainFrameProps) {
  const navigate = useNavigate();
  // console.log("clothingShell:", clothingShell);
  console.log('revisionRelease:', revisionRelease);
  console.log('clothingShellMaindataRevision:', clothingShellMaindataRevision);

  //==================================================
  // 1 - React hook states
  //==================================================
  // State for whether there saving is going on right now or not
  const [isSaving, setIsSaving] = useState(false);

  // The clothing shell's state
  const [state, setState] = useState<DataState | null>(null);
  useEffect(() => {
    setState(
      clothingShellMaindataRevision ? clothingShellMaindataRevision.state : null
    );
  }, [paramsRevision]);

  // The clothing shell's name
  const [name, setName] = useState<string>();
  useEffect(() => {
    setName(revisionRelease.name);
  }, [revisionRelease, paramsRevision]);

  // The clothing shell's item type
  const [item_type, setItemType] = useState<string>();
  useEffect(() => {
    setItemType(revisionRelease.item_type);
  }, [revisionRelease, paramsRevision]);

  // The clothing shell's thickness
  const [uniform_thickness, setUniformThickness] = useState<number>();
  useEffect(() => {
    setUniformThickness(revisionRelease.uniform_thickness);
  }, [revisionRelease, paramsRevision]);

  // The clothing shell's default_shell_layer_id
  const [default_shell_layer_id, setDefaultShellLayerId] = useState<
    number | null
  >(null);
  useEffect(() => {
    setDefaultShellLayerId(revisionRelease.default_shell_layer_id);
  }, [revisionRelease, paramsRevision]);

  // The clothing shell's default_fill_layer_id
  const [default_fill_layer_id, setDefaultFillLayerId] = useState<
    number | null
  >(null);
  useEffect(() => {
    setDefaultFillLayerId(revisionRelease.default_fill_layer_id);
  }, [revisionRelease, paramsRevision]);

  // The clothing shell's default_lining_layer_id
  const [default_lining_layer_id, setDefaultLiningLayerId] = useState<
    number | null
  >(null);
  useEffect(() => {
    setDefaultLiningLayerId(revisionRelease.default_lining_layer_id);
  }, [revisionRelease, paramsRevision]);

  // The clothing shell's default_interlining_layer_id
  const [default_interlining_layer_id, setDefaultInterliningLayerId] = useState<
    number | null
  >(null);
  useEffect(() => {
    setDefaultInterliningLayerId(revisionRelease.default_interlining_layer_id);
  }, [revisionRelease, paramsRevision]);

  // Clothing segments data
  const [clothingSegmentsData, setClothingSegmentsData] = useState(
    new ClothingSegmentsData(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      true,
      true,
      true,
      true
    )
  );

  const resetClothingSegmentData = () => {
    setClothingSegmentsData(
      new ClothingSegmentsData(
        revisionRelease.clothing_segment_data.right_sleeve_start_front,
        revisionRelease.clothing_segment_data.right_sleeve_end_front,
        revisionRelease.clothing_segment_data.right_sleeve_start_back,
        revisionRelease.clothing_segment_data.right_sleeve_end_back,
        revisionRelease.clothing_segment_data.left_sleeve_start_front,
        revisionRelease.clothing_segment_data.left_sleeve_end_front,
        revisionRelease.clothing_segment_data.left_sleeve_start_back,
        revisionRelease.clothing_segment_data.left_sleeve_end_back,
        revisionRelease.clothing_segment_data.right_body_start_front,
        revisionRelease.clothing_segment_data.right_body_end_front,
        revisionRelease.clothing_segment_data.right_body_start_back,
        revisionRelease.clothing_segment_data.right_body_end_back,
        revisionRelease.clothing_segment_data.left_body_start_front,
        revisionRelease.clothing_segment_data.left_body_end_front,
        revisionRelease.clothing_segment_data.left_body_start_back,
        revisionRelease.clothing_segment_data.left_body_end_back,
        null,
        null,
        revisionRelease.clothing_segment_data.sleeves_is_symmetrical,
        revisionRelease.clothing_segment_data.sleeves_front_back_is_same,
        revisionRelease.clothing_segment_data.body_is_symmetrical,
        revisionRelease.clothing_segment_data.body_front_back_is_same
      )
    );
  };

  useEffect(() => {
    // setClothingSegmentsData(revisionRelease.clothing_segment_data);
    resetClothingSegmentData();
  }, [revisionRelease, paramsRevision]);

  //==================================================
  // 2 - Hooks for GraphQL queries
  //==================================================
  const [
    updateClothingSegmentData,
    // { loading: mutationLoading, error: mutationError }
  ] = useMutation(Update_Clothing_Segment_Data, {
    async onCompleted() {},
  });

  const [
    updateClothingShellMaindata,
    // { loading: mutationLoading, error: mutationError }
  ] = useMutation(Update_Clothing_Shell_Maindata, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: Get_Clothing_Shell_Maindata_Revision_Changes,
        variables: {
          id: clothingShell.id,
          limit: 10,
        },
      },
    ],
  });

  //==================================================
  // 3 - State related vars
  //==================================================
  const disabled =
    clothingShellMaindataRevision.state !== DataState.Development || isSaving;
  //----------------------------------------
  // Maindata
  //----------------------------------------
  const hasChanged = {
    name: name !== revisionRelease.name,
    uniform_thickness: uniform_thickness !== revisionRelease.uniform_thickness,
    item_type: item_type !== revisionRelease.item_type,
    default_shell_layer_id:
      default_shell_layer_id !== revisionRelease.default_shell_layer_id,
    default_fill_layer_id:
      default_fill_layer_id !== revisionRelease.default_fill_layer_id,
    default_lining_layer_id:
      default_lining_layer_id !== revisionRelease.default_lining_layer_id,
    default_interlining_layer_id:
      default_interlining_layer_id !==
      revisionRelease.default_interlining_layer_id,
  };

  let numberOfChanges = 0;
  Object.keys(hasChanged).forEach((key) => {
    // @ts-ignore
    if (!disabled && hasChanged[key]) {
      numberOfChanges++;
    }
  });
  //----------------------------------------
  // Extra - Clothing Segment Data
  //----------------------------------------
  const hasChanged2: ClothingSegmentDataHasChangedProps = {
    right_sleeve_start_front:
      clothingSegmentsData.right_sleeve_start_front !==
      revisionRelease.clothing_segment_data.right_sleeve_start_front,
    right_sleeve_end_front:
      clothingSegmentsData.right_sleeve_end_front !==
      revisionRelease.clothing_segment_data.right_sleeve_end_front,
    right_sleeve_start_back:
      clothingSegmentsData.right_sleeve_start_back !==
      revisionRelease.clothing_segment_data.right_sleeve_start_back,
    right_sleeve_end_back:
      clothingSegmentsData.right_sleeve_end_back !==
      revisionRelease.clothing_segment_data.right_sleeve_end_back,
    left_sleeve_start_front:
      clothingSegmentsData.left_sleeve_start_front !==
      revisionRelease.clothing_segment_data.left_sleeve_start_front,
    left_sleeve_end_front:
      clothingSegmentsData.left_sleeve_end_front !==
      revisionRelease.clothing_segment_data.left_sleeve_end_front,
    left_sleeve_start_back:
      clothingSegmentsData.left_sleeve_start_back !==
      revisionRelease.clothing_segment_data.left_sleeve_start_back,
    left_sleeve_end_back:
      clothingSegmentsData.left_sleeve_end_back !==
      revisionRelease.clothing_segment_data.left_sleeve_end_back,
    right_body_start_front:
      clothingSegmentsData.right_body_start_front !==
      revisionRelease.clothing_segment_data.right_body_start_front,
    right_body_end_front:
      clothingSegmentsData.right_body_end_front !==
      revisionRelease.clothing_segment_data.right_body_end_front,
    right_body_start_back:
      clothingSegmentsData.right_body_start_back !==
      revisionRelease.clothing_segment_data.right_body_start_back,
    right_body_end_back:
      clothingSegmentsData.right_body_end_back !==
      revisionRelease.clothing_segment_data.right_body_end_back,
    left_body_start_front:
      clothingSegmentsData.left_body_start_front !==
      revisionRelease.clothing_segment_data.left_body_start_front,
    left_body_end_front:
      clothingSegmentsData.left_body_end_front !==
      revisionRelease.clothing_segment_data.left_body_end_front,
    left_body_start_back:
      clothingSegmentsData.left_body_start_back !==
      revisionRelease.clothing_segment_data.left_body_start_back,
    left_body_end_back:
      clothingSegmentsData.left_body_end_back !==
      revisionRelease.clothing_segment_data.left_body_end_back,
    sleeves_is_symmetrical:
      clothingSegmentsData.sleeves_is_symmetrical !==
      revisionRelease.clothing_segment_data.sleeves_is_symmetrical,
    sleeves_front_back_is_same:
      clothingSegmentsData.sleeves_front_back_is_same !==
      revisionRelease.clothing_segment_data.sleeves_front_back_is_same,
    body_is_symmetrical:
      clothingSegmentsData.body_is_symmetrical !==
      revisionRelease.clothing_segment_data.body_is_symmetrical,
    body_front_back_is_same:
      clothingSegmentsData.body_front_back_is_same !==
      revisionRelease.clothing_segment_data.body_front_back_is_same,
  };

  let numberOfChanges2 = 0;
  Object.keys(hasChanged2).forEach((key) => {
    // @ts-ignore
    if (!disabled && hasChanged2[key]) {
      numberOfChanges2++;
    }
  });

  // Maindata
  const discardChanges = () => {
    setName(revisionRelease.name);
    setUniformThickness(revisionRelease.uniform_thickness);
    setDefaultShellLayerId(revisionRelease.default_shell_layer_id);
    setDefaultFillLayerId(revisionRelease.default_fill_layer_id);
    setDefaultLiningLayerId(revisionRelease.default_lining_layer_id);
    setDefaultInterliningLayerId(revisionRelease.default_interlining_layer_id);
    resetClothingSegmentData();
  };

  interface changesProps {
    name?: string | null;
    uniform_thickness?: number;
    default_shell_layer_id?: number | null;
    default_fill_layer_id?: number | null;
    default_lining_layer_id?: number | null;
    default_interlining_layer_id?: number | null;
    item_type?: string;
    clothing_segment_data_id?: string | null;
  }

  interface clothingSegmentDataChangesProps {
    right_sleeve_start_front?: number | null;
    right_sleeve_end_front?: number | null;
    right_sleeve_start_back?: number | null;
    right_sleeve_end_back?: number | null;
    left_sleeve_start_front?: number | null;
    left_sleeve_end_front?: number | null;
    left_sleeve_start_back?: number | null;
    left_sleeve_end_back?: number | null;
    right_body_start_front?: number | null;
    right_body_end_front?: number | null;
    right_body_start_back?: number | null;
    right_body_end_back?: number | null;
    left_body_start_front?: number | null;
    left_body_end_front?: number | null;
    left_body_start_back?: number | null;
    left_body_end_back?: number | null;
    sleeves_is_symmetrical?: boolean;
    sleeves_front_back_is_same?: boolean;
    body_is_symmetrical?: boolean;
    body_front_back_is_same?: boolean;
  }

  const changes: changesProps = {};
  const changes2: clothingSegmentDataChangesProps = {};

  const saveChanges = async () => {
    if (numberOfChanges > 0 || numberOfChanges2 > 0) {
      //----------------------------------------
      // Maindata
      //----------------------------------------
      const variables = {
        id: revisionRelease.id,
        changes,
      };

      if (hasChanged.name) {
        variables.changes.name = name;
      }

      if (hasChanged.item_type) {
        variables.changes.item_type = item_type;
      }

      if (hasChanged.uniform_thickness) {
        variables.changes.uniform_thickness = uniform_thickness;
      }

      if (hasChanged.default_shell_layer_id) {
        variables.changes.default_shell_layer_id = default_shell_layer_id;
      }

      if (hasChanged.default_fill_layer_id) {
        variables.changes.default_fill_layer_id = default_fill_layer_id;
      }

      if (hasChanged.default_lining_layer_id) {
        variables.changes.default_lining_layer_id = default_lining_layer_id;
      }

      if (hasChanged.default_interlining_layer_id) {
        variables.changes.default_interlining_layer_id =
          default_interlining_layer_id;
      }
      //----------------------------------------
      // Extra - Clothing Segment Data
      //----------------------------------------
      const variables2 = {
        id: revisionRelease.clothing_segment_data.id,
        changes: changes2,
      };

      if (hasChanged2.right_sleeve_start_front)
        variables2.changes.right_sleeve_start_front =
          clothingSegmentsData.right_sleeve_start_front;
      if (hasChanged2.right_sleeve_end_front)
        variables2.changes.right_sleeve_end_front =
          clothingSegmentsData.right_sleeve_end_front;
      if (hasChanged2.right_sleeve_start_back)
        variables2.changes.right_sleeve_start_back =
          clothingSegmentsData.right_sleeve_start_back;
      if (hasChanged2.right_sleeve_end_back)
        variables2.changes.right_sleeve_end_back =
          clothingSegmentsData.right_sleeve_end_back;
      if (hasChanged2.left_sleeve_start_front)
        variables2.changes.left_sleeve_start_front =
          clothingSegmentsData.left_sleeve_start_front;
      if (hasChanged2.left_sleeve_end_front)
        variables2.changes.left_sleeve_end_front =
          clothingSegmentsData.left_sleeve_end_front;
      if (hasChanged2.left_sleeve_start_back)
        variables2.changes.left_sleeve_start_back =
          clothingSegmentsData.left_sleeve_start_back;
      if (hasChanged2.left_sleeve_end_back)
        variables2.changes.left_sleeve_end_back =
          clothingSegmentsData.left_sleeve_end_back;
      if (hasChanged2.right_body_start_front)
        variables2.changes.right_body_start_front =
          clothingSegmentsData.right_body_start_front;
      if (hasChanged2.right_body_end_front)
        variables2.changes.right_body_end_front =
          clothingSegmentsData.right_body_end_front;
      if (hasChanged2.right_body_start_back)
        variables2.changes.right_body_start_back =
          clothingSegmentsData.right_body_start_back;
      if (hasChanged2.right_body_end_back)
        variables2.changes.right_body_end_back =
          clothingSegmentsData.right_body_end_back;
      if (hasChanged2.left_body_start_front)
        variables2.changes.left_body_start_front =
          clothingSegmentsData.left_body_start_front;
      if (hasChanged2.left_body_end_front)
        variables2.changes.left_body_end_front =
          clothingSegmentsData.left_body_end_front;
      if (hasChanged2.left_body_start_back)
        variables2.changes.left_body_start_back =
          clothingSegmentsData.left_body_start_back;
      if (hasChanged2.left_body_end_back)
        variables2.changes.left_body_end_back =
          clothingSegmentsData.left_body_end_back;
      if (hasChanged2.sleeves_is_symmetrical)
        variables2.changes.sleeves_is_symmetrical =
          clothingSegmentsData.sleeves_is_symmetrical;
      if (hasChanged2.sleeves_front_back_is_same)
        variables2.changes.sleeves_front_back_is_same =
          clothingSegmentsData.sleeves_front_back_is_same;
      if (hasChanged2.body_is_symmetrical)
        variables2.changes.body_is_symmetrical =
          clothingSegmentsData.body_is_symmetrical;
      if (hasChanged2.body_front_back_is_same)
        variables2.changes.body_front_back_is_same =
          clothingSegmentsData.body_front_back_is_same;

      message.loading({ content: Common.Saving_Changes, key });
      // updateClothingShell({ variables }).then();
      setIsSaving(true);
      // NOTE
      // Unless we somehow create a hybrid graphql query where we can take
      // in two queries at once and do them simultaneously (and create a
      // return type that returns them both), then it's just better off we
      // just execute these queries one by one, first the maindata, then the
      // clothing segment data.
      if (numberOfChanges > 0) {
        console.error('is working 1. Variables:', variables);
        await updateClothingShellMaindata({ variables });
      }
      if (numberOfChanges2 > 0) {
        console.log('updateClothingSegmentData():', variables2);
        console.error('is working 222');
        await updateClothingSegmentData({ variables: variables2 });
      }
      // await updateClothingShellUpdatedAt({
      //   variables: {
      //     id: clothingShell.id,
      //   },
      // });
      message.success({ content: Common.Changes_Saved, key });
      setIsSaving(false);
    }
  };

  return (
    <>
      <ColumnOfFrames>
        <DetailsFrame
          clothingShell={clothingShell}
          uniqueRevisions={uniqueRevisions}
          paramsRevision={paramsRevision}
          clothingShellMaindataRevision={clothingShellMaindataRevision}
          numberOfChanges={numberOfChanges + numberOfChanges2}
          discardChanges={discardChanges}
          saveChanges={saveChanges}
          hasChanged={hasChanged}
          // isSaving={isSaving}
          // setIsSaving={setIsSaving}
          state={state}
          disabled={disabled}
          name={name}
          setName={setName}
          item_type={item_type}
          setItemType={setItemType}
          uniform_thickness={uniform_thickness}
          setUniformThickness={setUniformThickness}
          default_shell_layer_id={default_shell_layer_id}
          setDefaultShellLayerId={setDefaultShellLayerId}
          default_fill_layer_id={default_fill_layer_id}
          setDefaultFillLayerId={setDefaultFillLayerId}
          default_lining_layer_id={default_lining_layer_id}
          setDefaultLiningLayerId={setDefaultLiningLayerId}
          default_interlining_layer_id={default_interlining_layer_id}
          setDefaultInterliningLayerId={setDefaultInterliningLayerId}
        />
        <MiniItemsFrameClothingShell clothingShell={clothingShell} />
      </ColumnOfFrames>
      <ColumnOfFrames>
        <ClothingShellOverviewFrame
          overrideClothingShell={clothingShell}
          default_shell_layer_id={default_shell_layer_id}
          default_lining_layer_id={default_lining_layer_id}
          numberOfChanges={numberOfChanges2}
          hasChanged={hasChanged2}
          clothingSegmentsData={clothingSegmentsData}
          setClothingSegmentsData={setClothingSegmentsData}
          resetClothingSegmentData={resetClothingSegmentData}
          name={name}
          disabled={disabled}
        />
      </ColumnOfFrames>
      <ColumnOfFrames>
        <ClothingShellStateFrame
          clothingShellId={clothingShell.id}
          clothingShellMaindataRevision={clothingShellMaindataRevision}
          paramsRevision={paramsRevision}
          uniqueRevisions={uniqueRevisions}
          refetchRevisions={refetchRevisions}
          refetchBaseData={refetchBaseData}
        />
        <OverviewActivityFrame
          id={clothingShell.id}
          query={Get_Clothing_Shell_Maindata_Revision_Changes}
          childObjectString={'getClothingShellMaindataRevisionChanges'}
        />
      </ColumnOfFrames>
    </>
  );
}

export { OverviewMainFrame };
