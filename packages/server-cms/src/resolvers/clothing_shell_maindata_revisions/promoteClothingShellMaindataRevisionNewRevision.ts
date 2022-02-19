/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { getClothingShellMaindataRevisionsBBByPk } from './getClothingShellMaindataRevisionsBBByPk';
import { DataState, DataChangeType } from '@joshuarobs/clothing-framework';
import { insertClothingShellMaindataRevisionChange } from '../clothing_shell_maindata_revision_changes/insertClothingShellMaindataRevisionChange';
import { updateClothingShellUpdatedAt } from '../clothing_shells/updateClothingShellUpdatedAt';
import { insertClothingShellMaindataRevision } from './insertClothingShellMaindataRevision';
import { insertNewBlankClothingSegmentData } from '../clothing_segment_data/insertNewBlankClothingSegmentData';
import { insertClothingShellMaindataBarebones } from '../clothing_shell_maindata/insertClothingShellMaindataBarebones';
import { insertClothingShellMaindata } from '../clothing_shell_maindata/insertClothingShellMaindata';
import { getClothingShellMaindataRevisionByPk } from './getClothingShellMaindataRevisionByPk';
import { insertClothingSegmentData } from '../clothing_segment_data/insertClothingSegmentData';

/**
 * Updates the Clothing Shell Maindata Revision's state
 * Used in the Clothing Shell page's StateFrame, typically when promoting to
 * a newer state
 * @param id
 */
async function promoteClothingShellMaindataRevisionNewRevision(id: string) {
  logger.info(
    `graphql > promoteClothingShellMaindataRevisionNewRevision() :: args: id: ${id}`
  );
  const userId = 1;

  try {
    /*
     * 1. Get the query info we need about the revision
     */
    const clothingShellMaindataRevision =
      await getClothingShellMaindataRevisionByPk(id);
    console.log(
      'clothingShellMaindataRevision:',
      clothingShellMaindataRevision
    );

    // Ensure that the state is Production, otherwise we won't continue on
    if (clothingShellMaindataRevision.state !== DataState.Production) {
      return null;
    }

    const oldClothingShellMaindata =
      clothingShellMaindataRevision.clothing_shell_maindata[0];
    console.log('oldClothingShellMaindata:', oldClothingShellMaindata);
    // delete oldClothingShellMaindata.__typename;

    // Since we can't delete the `__typename`, we must recreate an object
    // copy without it. This is so we can pass in valid fields when creating
    // the next revision's maindata.
    // const { __typename, ...oldClothingShellMaindata } =
    //   oldClothingShellMaindataRaw;
    // console.log('oldClothingShellMaindata:', oldClothingShellMaindata);

    // Get the clothing segment data, so we can clone its values later
    // const { __typename, ...oldClothingShellMaindata } = oldClothingSegmentData;
    const oldClothingSegmentData =
      oldClothingShellMaindata.clothing_segment_data;
    console.log('oldClothingSegmentData:', oldClothingSegmentData);

    // return null;

    /*
     * 2. Check for the user's permissions
     */
    const data2 = 5;

    /*
     * 3. Insert a new clothing shell maindata revision and dependents
     */
    // Insertion order:
    // 1. clothing_shells (already inserted by the time we see the state frame)
    // 2. clothing_shell_maindata_revisions
    // 3. clothing_segment_data
    // 4. clothing_shell_maindata
    // 5. clothing_shell_maindata_revision_changes

    // return null;

    // A. clothing_shell_maindata_revisions
    const data3a = await insertClothingShellMaindataRevision(
      clothingShellMaindataRevision.clothing_shell_id,
      clothingShellMaindataRevision.revision + 1,
      DataState.Development
    );
    console.log('data3a:', data3a);

    // return null;

    // B. clothing_segment_data
    // const oldClothingShellMaindata =
    //   clothingShellMaindataRevision.clothing_shell_maindata;
    const data3b = await insertClothingSegmentData({
      right_sleeve_start_front: oldClothingSegmentData.right_sleeve_start_front,
      right_sleeve_end_front: oldClothingSegmentData.right_sleeve_end_front,
      right_sleeve_start_back: oldClothingSegmentData.right_sleeve_start_back,
      right_sleeve_end_back: oldClothingSegmentData.right_sleeve_end_back,
      left_sleeve_start_front: oldClothingSegmentData.left_sleeve_start_front,
      left_sleeve_end_front: oldClothingSegmentData.left_sleeve_end_front,
      left_sleeve_start_back: oldClothingSegmentData.left_sleeve_start_back,
      left_sleeve_end_back: oldClothingSegmentData.left_sleeve_end_back,
      right_body_start_front: oldClothingSegmentData.right_body_start_front,
      right_body_end_front: oldClothingSegmentData.right_body_end_front,
      right_body_start_back: oldClothingSegmentData.right_body_start_back,
      right_body_end_back: oldClothingSegmentData.right_body_end_back,
      left_body_start_front: oldClothingSegmentData.left_body_start_front,
      left_body_end_front: oldClothingSegmentData.left_body_end_front,
      left_body_start_back: oldClothingSegmentData.left_body_start_back,
      left_body_end_back: oldClothingSegmentData.left_body_end_back,
      sleeves_is_symmetrical: oldClothingSegmentData.sleeves_is_symmetrical,
      sleeves_front_back_is_same:
        oldClothingSegmentData.sleeves_front_back_is_same,
      body_is_symmetrical: oldClothingSegmentData.body_is_symmetrical,
      body_front_back_is_same: oldClothingSegmentData.body_front_back_is_same,
    });

    // C. clothing_shell_maindata
    const data3c = await insertClothingShellMaindata({
      revision_id: data3a.id,
      is_release: true,
      name: oldClothingShellMaindata.name,
      item_type: oldClothingShellMaindata.item_type,
      uniform_thickness: oldClothingShellMaindata.uniform_thickness,
      default_shell_layer_id: oldClothingShellMaindata.default_shell_layer_id,
      default_fill_layer_id: oldClothingShellMaindata.default_fill_layer_id,
      default_lining_layer_id: oldClothingShellMaindata.default_lining_layer_id,
      default_interlining_layer_id:
        oldClothingShellMaindata.default_interlining_layer_id,
      clothing_segment_data_id: data3b.id,
    });
    console.log('data3c:', data3c);

    // D. clothing_shell_maindata_revision_changes
    // See the next step

    /*
     * 4. Create an activity entry
     */
    // Insert an activity change for retiring the previous revision
    const data4a = await insertClothingShellMaindataRevisionChange(
      oldClothingShellMaindata.revision_id,
      userId,
      DataChangeType.Promotion,
      DataState.Retired,
      null
    );

    // Insert an activity change for creating a new promotion
    const data4b = await insertClothingShellMaindataRevisionChange(
      data3a.id,
      userId,
      DataChangeType.Promotion,
      DataState.Development,
      null
    );

    /*
     * 5. Update the clothing shell's updated_at
     */
    const data5 = await updateClothingShellUpdatedAt(
      clothingShellMaindataRevision.clothing_shell_id
    );

    return data3a;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { promoteClothingShellMaindataRevisionNewRevision };
