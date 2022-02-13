/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { getClothingShellMaindataRevisionsBBByPk } from './getClothingShellMaindataRevisionsBBByPk';
import { DataState, DataChangeType } from '@joshuarobs/clothing-framework';
import { insertClothingShellMaindataRevisionChange } from '../clothing_shell_maindata_revision_changes/insertClothingShellMaindataRevisionChange';
import { updateClothingShellUpdatedAt } from '../clothing_shells/updateClothingShellUpdatedAt';

/**
 * Updates the Clothing Shell Maindata Revision's state to Retired
 * Used in the Clothing Shell page, for admin purposes
 * This will also be called by another function
 * `promoteClothingShellMaindataRevisionToProduction` when promoting to
 * production.
 * @param id
 */
async function promoteClothingShellMaindataRevisionToRetired(id: string) {
  logger.info(
    `graphql > promoteClothingShellMaindataRevisionToRetired() :: args: id: ${id}`
  );
  const userId = 1;

  try {
    /*
     * 1. Get the query info we need about the revision
     */
    const clothingShellMaindataRevision =
      await getClothingShellMaindataRevisionsBBByPk(id);
    console.log(
      'clothingShellMaindataRevision:',
      clothingShellMaindataRevision
    );

    // Ensure that the state is Production, otherwise we won't continue on
    if (clothingShellMaindataRevision.state !== DataState.Production) {
      return null;
    }

    /*
     * 2. Check for the user's permissions
     */
    const data2 = 5;

    /*
     * 3. Update the state to Retired
     */
    const data3 = await client.mutate({
      mutation: gql`
        mutation updateClothingShellMaindataRevisionState(
          $id: uuid!
          $state: data_states_enum!
        ) {
          update_clothing_shell_maindata_revisions_by_pk(
            pk_columns: { id: $id }
            _set: { state: $state }
          ) {
            id
            clothing_shell_id
            revision
            state
          }
        }
      `,
      variables: { id, state: DataState.Retired },
    });

    /*
     * 4. Create an activity entry
     */
    const data4 = await insertClothingShellMaindataRevisionChange(
      id,
      userId,
      DataChangeType.Promotion,
      DataState.Retired,
      null
    );

    /*
     * 5. Update the clothing shell's updated_at
     */
    const data5 = await updateClothingShellUpdatedAt(
      clothingShellMaindataRevision.clothing_shell_id
    );

    return data3.data.update_clothing_shell_maindata_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { promoteClothingShellMaindataRevisionToRetired };
