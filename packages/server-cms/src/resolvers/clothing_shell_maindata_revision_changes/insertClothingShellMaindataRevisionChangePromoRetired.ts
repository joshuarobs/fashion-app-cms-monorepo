import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertClothingShellMaindataRevisionChangePromoRetired() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertClothingShellMaindataRevisionChangePromoRetired(
          $revisionId: uuid!
          $userId: Int!
        ) {
          insert_clothing_shell_maindata_revision_changes_one(
            object: {
              clothing_shell_maindata_revision_id: $revisionId
              change_type: Promotion
              to_state: Retired
              user_id: $userId
            }
          ) {
            id
            date
            action
            change_type
            to_state
            clothing_shell_maindata_revision_id
            user_id
          }
        }
      `,
    });
    return data.data.insert_clothing_shell_maindata_revision_changes_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertClothingShellMaindataRevisionChangePromoRetired };
