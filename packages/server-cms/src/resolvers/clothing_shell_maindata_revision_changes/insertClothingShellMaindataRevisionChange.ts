import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertClothingShellMaindataRevisionChange() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertClothingShellMaindataRevisionChange(
          $revisionId: uuid!
          $changeType: data_change_types_enum!
          $toState: data_states_enum
          $action: data_actions_enum
          $userId: Int!
        ) {
          insert_clothing_shell_maindata_revision_changes_one(
            object: {
              clothing_shell_maindata_revision_id: $revisionId
              change_type: $changeType
              to_state: $toState
              action: $action
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

export { insertClothingShellMaindataRevisionChange };
