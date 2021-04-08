import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function updateClothingShellMaindataRevisionToRetired() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateClothingShellMaindataRevisionToRetired(
          $revisionId: uuid!
        ) {
          update_clothing_shell_maindata_revisions_by_pk(
            pk_columns: { id: $revisionId }
            _set: { state: Retired }
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

export { updateClothingShellMaindataRevisionToRetired };
