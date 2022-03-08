/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { getClothingShellMaindataRevisionsBBByPk } from './getClothingShellMaindataRevisionsBBByPk';
import { DataState, DataChangeType } from '@joshuarobs/clothing-framework';
import { insertClothingShellMaindataRevisionChange } from '../clothing_shell_maindata_revision_changes/insertClothingShellMaindataRevisionChange';
import { updateClothingShellUpdatedAt } from '../clothing_shells/updateClothingShellUpdatedAt';
import { getAllClothingShellMaindataRevisionsForClothingShell } from './getAllClothingShellMaindataRevisionsForClothingShell';
import { promoteClothingShellMaindataRevisionToRetired } from './promoteClothingShellMaindataRevisionToRetired';
import { getUniqueItemMaindataRevsForBrandProdOnly } from '../item_maindata_revisions/getUniqueItemMaindataRevisionsForBrandInProduction';

/**
 * Updates the Clothing Shell Maindata Revision's state
 * Used in the Clothing Shell page's StateFrame, typically when promoting to
 * a newer state
 * @param id - The id of the clothing shell maindata revision to promote
 * @param context - The Apollo context
 */
async function promoteClothingShellMaindataRevisionToProduction(
  id: string,
  context: any
) {
  logger.info(
    `graphql > promoteClothingShellMaindataRevisionToProduction() :: args: id: ${id} | context: ${JSON.stringify(
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
    // console.log(
    //   'clothingShellMaindataRevision:',
    //   clothingShellMaindataRevision
    // );

    // Ensure that the state is Review, otherwise we won't continue on
    if (clothingShellMaindataRevision.state !== DataState.Review) {
      return null;
    }

    const allClothingShellMaindataRevisions =
      await getAllClothingShellMaindataRevisionsForClothingShell(
        clothingShellMaindataRevision.clothing_shell_id,
        2,
        0
      );
    // console.log(
    //   'allClothingShellMaindataRevisions:',
    //   allClothingShellMaindataRevisions
    // );

    /*
     * 2. Check for the user's permissions
     */
    const data2 = 5;

    /*
     * 3. Update the state to Production
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
      variables: { id, state: DataState.Production },
    });

    /*
     * 4. If there is a previous revision, retire it
     */
    if (allClothingShellMaindataRevisions.length > 1) {
      const data4 = await promoteClothingShellMaindataRevisionToRetired(
        allClothingShellMaindataRevisions[1].id
      );
    }

    /*
     * 5. Create an activity entry
     */
    const data5 = await insertClothingShellMaindataRevisionChange(
      id,
      context.user.id,
      DataChangeType.Promotion,
      DataState.Production,
      null
    );

    /*
     * 6. Update the clothing shell's updated_at
     */
    const data6 = await updateClothingShellUpdatedAt(
      clothingShellMaindataRevision.clothing_shell_id
    );

    return data3.data.update_clothing_shell_maindata_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { promoteClothingShellMaindataRevisionToProduction };
