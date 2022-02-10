import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { DataChangeType, DataState } from '@joshuarobs/clothing-framework';

async function insertClothingShellMaindataRevisionChange(
  revision_id: string,
  user_id: number,
  change_type: DataChangeType,
  to_state: DataState,
  loggerPrefix = ''
) {
  logger.info(
    `${loggerPrefix}graphql > insertClothingShellMaindataRevisionChange() :: args: revision_id: ${revision_id} | user_id: ${user_id} | change_type: ${change_type} | to_state: ${to_state}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation insertClothingShellMaindataRevisionChange(
          $revision_id: uuid!
          $change_type: data_change_types_enum!
          $to_state: data_states_enum
          $action: data_actions_enum
          $user_id: Int!
        ) {
          insert_clothing_shell_maindata_revision_changes_one(
            object: {
              clothing_shell_maindata_revision_id: $revision_id
              change_type: $change_type
              to_state: $to_state
              action: $action
              user_id: $user_id
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
      variables: {
        revision_id,
        user_id,
        change_type,
        to_state,
        // action: DATA_ACTIONS.CREATE
      },
    });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `${loggerPrefix}graphql > insertClothingShellMaindataRevisionChange() :: Successfully returned data`
    );
    return data.data.insert_clothing_shell_maindata_revision_changes_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertClothingShellMaindataRevisionChange };
