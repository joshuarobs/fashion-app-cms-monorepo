import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Updates the Clothing Shell Maindata Revision's state
 * Used in the Clothing Shell page's StateFrame, typically when promoting to
 * a newer state
 */
async function updateClothingShellMaindataRevisionState() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateClothingShellMaindataRevisionState(
          $revisionId: uuid!
          $state: data_states_enum!
        ) {
          update_clothing_shell_maindata_revisions_by_pk(
            pk_columns: { id: $revisionId }
            _set: { state: $state }
          ) {
            id
            clothing_shell_id
            revision
            state
          }
        }
      `,
    });
    return data.data.update_clothing_shell_maindata_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateClothingShellMaindataRevisionState };
