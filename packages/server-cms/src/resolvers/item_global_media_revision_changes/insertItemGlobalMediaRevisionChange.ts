import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { DataChangeType, DataState } from '@joshuarobs/clothing-framework';

async function insertItemGlobalMediaRevisionChange(
  revision_id: string,
  user_id: number,
  change_type: DataChangeType,
  to_state: DataState,
  context: any,
  loggerPrefix = ''
) {
  logger.info(
    `${loggerPrefix}graphql > insertItemGlobalMediaRevisionChange() :: args: revision_id: ${revision_id} | user_id: ${user_id} | change_type: ${change_type} | to_state: ${to_state} | context: ${JSON.stringify(
      context,
      null,
      2
    )}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation insertItemGlobalMediaRevisionChange(
          $revision_id: uuid!
          $change_type: data_change_types_enum!
          $to_state: data_states_enum
          $action: data_actions_enum
          $user_id: Int!
        ) {
          insert_item_global_media_revision_changes_one(
            object: {
              item_global_media_revision_id: $revision_id
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
            item_global_media_revision_id
            user_id
          }
        }
      `,
      variables: {
        revision_id,
        user_id,
        change_type,
        to_state,
      },
    });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `${loggerPrefix}graphql > insertItemGlobalMediaRevisionChange() :: Successfully returned data`
    );
    return data.data.insert_item_global_media_revision_changes_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemGlobalMediaRevisionChange };
