import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  Data_Entry_Query_Amount_Max_Limit,
  Data_Entry_Query_Amount_Min_Half,
} from '../../settings';

/**
 * Obtains a list of revision changes for `Item Global Media`, sorted by latest.
 * This is for the Latest Activity frame for the Item > Localisation >
 * Global Media tab.
 * @param item_id - The id of the item to obtain revision changes for
 * @param limit - The maximum number of entries to return
 * @param offset - The index where to start looking for within the list
 * @param context - Apollo context
 */
async function getItemGlobalMediaRevisionChangesGivenItemId(
  item_id: number,
  limit = Data_Entry_Query_Amount_Min_Half,
  offset: number,
  context: any
) {
  logger.info(
    `graphql > getItemGlobalMediaRevisionChangesGivenItemId() | args: itemId: ${item_id} | limit: ${limit} | offset: ${offset} | context: ${JSON.stringify(
      context,
      null,
      2
    )}`
  );

  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getItemGlobalMediaRevisionChangesGivenItemId(
          $item_id: Int!
          $limit: Int
          $offset: Int
        ) {
          item_global_media_revision_changes(
            where: {
              item_global_media_revision: { item_id: { _eq: $item_id } }
            }
            order_by: { date: desc }
            limit: $limit
          ) {
            id
            to_state
            date
            change_type
            action
            user {
              id
              name
            }
            item_global_media_revision {
              id
              item_id
              revision
            }
          }
        }
      `,
      variables: {
        item_id,
        limit,
        offset,
      },
      fetchPolicy: 'network-only',
    });

    logger.info(
      `graphql > getItemGlobalMediaRevisionChangesGivenItemId() | Successfully returned data`
    );
    return data.data.item_global_media_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemGlobalMediaRevisionChangesGivenItemId };
