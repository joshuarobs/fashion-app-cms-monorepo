import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { getClothingShellMaindataBB } from '../clothing_shell_maindata/getClothingShellMaindataBB';
import { getClothingShellMaindataRevisionsBBByPk } from '../clothing_shell_maindata_revisions/getClothingShellMaindataRevisionsBBByPk';
import { getClothingShellBaseDataByPk } from '../clothing_shells/getClothingShellBaseDataByPk';
import { updateClothingShellUpdatedAt } from '../clothing_shells/updateClothingShellUpdatedAt';
import { getClothingSegmentDataBB } from './getClothingSegmentDataBB';

/**
 * Updates a Clothing Segment Data.
 * Will mostly be used within the Clothing Shell Overview tab page when
 * making changes to the clothing segment data information, such as the
 * basic shape and fabrics, negative mask cutouts and minor details.
 * @param id
 * @param changes
 */
async function updateClothingSegmentData(id: string, changes: any) {
  logger.info(
    `graphql > updateClothingSegmentData() | args: id: ${id} | changes: ${JSON.stringify(
      changes,
      null,
      2
    )}`
  );

  // Delete all important fields of the maindata that should not be changed
  delete changes.id;

  const userId = 1;

  try {
    /*
     * 1. Get the query info we need about the revision and the data entry
     */
    // Get the maindata
    const data1clothingSegmentData = await getClothingSegmentDataBB(id);
    // console.log('data1maindata:', data1maindata);

    // Get the maindata revision
    const data1maindataRevision = await getClothingShellMaindataRevisionsBBByPk(
      data1clothingSegmentData.clothing_shell_maindata.revision_id
    );
    // console.log('data1maindataRevision:', data1maindataRevision);

    // Get the clothing shell
    const data1clothingShell = await getClothingShellBaseDataByPk(
      data1maindataRevision.clothing_shell_id
    );
    // console.log('data1clothingShell:', data1clothingShell);

    /*
     * 2. Check for permissions
     */

    /*
     * 3. Update the clothing segment data
     */
    const data3 = await client.mutate({
      mutation: gql`
        mutation updateClothingSegmentData(
          $id: uuid!
          $changes: clothing_segment_data_set_input
        ) {
          update_clothing_segment_data_by_pk(
            pk_columns: { id: $id }
            _set: $changes
          ) {
            id
            right_sleeve_start_front
            right_sleeve_end_front
            right_sleeve_start_back
            right_sleeve_end_back
            left_sleeve_start_front
            left_sleeve_end_front
            left_sleeve_start_back
            left_sleeve_end_back
            right_body_start_front
            right_body_end_front
            right_body_start_back
            right_body_end_back
            left_body_start_front
            left_body_end_front
            left_body_start_back
            left_body_end_back
            sleeves_is_symmetrical
            sleeves_front_back_is_same
            body_is_symmetrical
            body_front_back_is_same
            clothing_shell_maindata {
              id
              #items_aggregate {
              #  aggregate {
              #    count
              #  }
              #}
            }
          }
        }
      `,
      variables: {
        id,
        changes,
      },
    });

    /*
     * 4. Add an activity change
     */
    // TODO: When you add activity change merges, then data in this one will
    //  be merged with the previously added in the
    //  `updateClothingShellMaindata`

    /*
     * 5. Update the clothing shell's updated_at
     */
    await updateClothingShellUpdatedAt(data1clothingShell.id);

    return data3.data.update_clothing_segment_data_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateClothingSegmentData };
