import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { getClothingShellMaindataRevisionsBBByPk } from '../clothing_shell_maindata_revisions/getClothingShellMaindataRevisionsBBByPk';
import { getClothingShellMaindataBB } from './getClothingShellMaindataBB';
import { getClothingShellBaseDataByPk } from '../clothing_shells/getClothingShellBaseDataByPk';
import { updateClothingShellUpdatedAt } from '../clothing_shells/updateClothingShellUpdatedAt';
import { insertClothingShellMaindataRevisionChange } from '../clothing_shell_maindata_revision_changes/insertClothingShellMaindataRevisionChange';
import { DataChangeType, DataAction } from '@joshuarobs/clothing-framework';

/**
 * Updates a Clothing Shell Maindata.
 * Will mostly be used within the Clothing Shell Overview tab page when
 * making changes to basic information, such as the name, item type,
 * thickness, and the various fabric layers.
 * @param id
 * @param changes
 */
async function updateClothingShellMaindata(id: string, changes: any) {
  logger.info(
    `graphql > updateClothingShellMaindata() | args: id: ${id} | changes: ${JSON.stringify(
      changes,
      null,
      2
    )}`
  );

  // Delete all important fields of the maindata that should not be changed
  delete changes.id;
  delete changes.revision_id;
  delete changes.is_release;
  delete changes.clothing_segment_data_id;

  const userId = 1;

  try {
    /*
     * 1. Get the query info we need about the revision and the data entry
     */
    // Get the maindata
    const data1maindata = await getClothingShellMaindataBB(id);
    // console.log('data1maindata:', data1maindata);

    // Get the maindata revision
    const data1maindataRevision = await getClothingShellMaindataRevisionsBBByPk(
      data1maindata.revision_id
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
     * 3. Update the maindata
     */
    const data3 = await client.mutate({
      mutation: gql`
        mutation updateClothingShellMaindata(
          $id: uuid!
          $changes: clothing_shell_maindata_set_input
        ) {
          update_clothing_shell_maindata_by_pk(
            pk_columns: { id: $id }
            _set: $changes
          ) {
            id
            name
            uniform_thickness
            default_shell_layer_id
            default_fill_layer_id
            default_lining_layer_id
            default_interlining_layer_id
            item_type
            clothing_segment_data_id
            clothing_segment_data {
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
    await insertClothingShellMaindataRevisionChange(
      data1maindata.revision_id,
      userId,
      DataChangeType.Action,
      null,
      DataAction.Update,
      ''
    );

    /*
     * 5. Update the clothing shell's updated_at
     */
    await updateClothingShellUpdatedAt(data1clothingShell.id);

    return data3.data.update_clothing_shell_maindata_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateClothingShellMaindata };
