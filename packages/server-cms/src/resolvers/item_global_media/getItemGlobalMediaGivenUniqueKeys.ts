import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets a single `item_global_media` row given its unique keys. This query
 * does not obtain the row via it's primary key uuid, and we assume we only
 * have the url parameters to work with.
 * To be used within the Item's > Localisation > Global Media page.
 * @param revision - The revision number
 * @param item_id - The item id
 * @param context - Apollo context
 */
async function getItemGlobalMediaGivenUniqueKeys(
  revision: number,
  item_id: number,
  context: any
) {
  logger.info(
    `graphql > getItemGlobalMediaGivenUniqueKeys() :: args: revision: ${revision} | item_id: ${item_id} | context: ${JSON.stringify(
      context,
      null,
      2
    )}`
  );

  try {
    const data = await client.query({
      query: gql`
        query getItemGlobalMediaGivenUniqueKeys(
          $revision: Int!
          $item_id: Int!
        ) {
          item_global_media(
            where: {
              revision: {
                revision: { _eq: $revision }
                item_id: { _eq: $item_id }
              }
            }
            order_by: { is_release: asc }
          ) {
            id
            revision_id
            is_release
            media_1_id
            media_2_id
            media_3_id
            media_4_id
            media_5_id
            media_6_id
            media_7_id
            media_8_id
            media_9_id
            media_10_id
          }
        }
      `,
      variables: {
        revision,
        item_id,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.item_global_media;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemGlobalMediaGivenUniqueKeys };
