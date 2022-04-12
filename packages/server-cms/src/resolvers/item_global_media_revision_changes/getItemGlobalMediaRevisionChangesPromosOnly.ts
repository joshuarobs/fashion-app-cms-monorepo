import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Obtains a list of revision changes for `Item Global Media`, that are
 * promotions only. This is for the state frame.
 * @param item_id - The id of the item that the `item_global_media` table
 *                  belongs to
 * @param revision - The revision number we want to find promotions for
 * @param context - Apollo context
 */
async function getItemGlobalMediaRevisionChangesPromosOnly(
  item_id: number,
  revision: number,
  context: any
) {
  try {
    const data = await client.query({
      query: gql`
        query getItemGlobalMediaRevisionChangesPromosOnly(
          $item_id: Int!
          $revision: Int!
        ) {
          item_global_media_revision_changes(
            where: {
              item_global_media_revision: {
                item_id: { _eq: $item_id }
                revision: { _eq: $revision }
              }
              change_type: { _eq: Promotion }
            }
          ) {
            id
            to_state
            date
            change_type
            action
            user {
              id
              name
              email
            }
          }
        }
      `,
      variables: {
        item_id,
        revision,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.item_global_media_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemGlobalMediaRevisionChangesPromosOnly };
