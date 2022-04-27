import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 *
 * @param item_id - The item's id that the searched for item_global_media
 * should belong to
 * @param context - Apollo context
 */
async function getItemGlobalMediaRevisionsGivenItemId(
  item_id: number,
  context: any
) {
  logger.info(
    `graphql > getItemGlobalMediaRevisionsGivenItemId() :: args: item_id: ${item_id} | context: ${JSON.stringify(
      context,
      null,
      2
    )}`
  );

  try {
    const data = await client.query({
      query: gql`
        query getItemGlobalMediaRevisionsGivenItemId($item_id: Int!) {
          item_global_media_revisions(
            where: { item_id: { _eq: $item_id } }
            order_by: { revision: desc }
          ) {
            id
            item_id
            revision
            state
            item_global_media(order_by: { is_release: desc }, limit: 1) {
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
        }
      `,
      variables: {
        item_id,
      },
      fetchPolicy: 'network-only',
    });
    // console.log(
    //   'data.data.item_translation_revisions:',
    //   data.data.item_translation_revisions
    // );
    logger.info(
      `graphql > getItemGlobalMediaRevisionsGivenItemId() :: Successfully returned data`
    );
    return data.data.item_global_media_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemGlobalMediaRevisionsGivenItemId };
