/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { getClothingShellMaindataRevisionsBBByPk } from './getClothingShellMaindataRevisionsBBByPk';
import { DataState, DataChangeType } from '@joshuarobs/clothing-framework';
import { insertClothingShellMaindataRevisionChange } from '../clothing_shell_maindata_revision_changes/insertClothingShellMaindataRevisionChange';
import { updateClothingShellUpdatedAt } from '../clothing_shells/updateClothingShellUpdatedAt';

/**
 * Updates the Clothing Shell Maindata Revision's state
 * Used in the Clothing Shell page's StateFrame, typically when promoting to
 * a newer state
 * @param id - The id of the clothing shell maindata revision to promote
 * @param context - The Apollo context
 */
async function promoteClothingShellMaindataRevisionToReview(
  id: string,
  context: any
) {
  logger.info(
    `graphql > promoteClothingShellMaindataRevisionToReview() :: args: id: ${id} | context: ${JSON.stringify(
      context,
      null,
      2
    )}`
  );

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

    // Ensure that the state is Development, otherwise we won't continue on
    if (clothingShellMaindataRevision.state !== DataState.Development) {
      return null;
    }

    /*
     * 2. Check for the user's permissions
     */
    const data2 = 5;

    /*
     * 3. Update the state to Review
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
      variables: { id, state: DataState.Review },
    });

    /*
     * 4. Create an activity entry
     */
    const data4 = await insertClothingShellMaindataRevisionChange(
      id,
      context.user.id,
      DataChangeType.Promotion,
      DataState.Review,
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

export { promoteClothingShellMaindataRevisionToReview };
