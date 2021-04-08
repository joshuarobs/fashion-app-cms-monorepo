import { gql } from '@apollo/client';
import { client } from '../graphql-client';
import { logger } from '../logger';

async function GET_ITEM_REVISION_CHANGES_AGGREGATES() {
  try {
    const data = await client.query({
      query: gql`
        query GET_ITEM_REVISION_CHANGES_AGGREGATES($itemId: Int!) {
          item_maindata_revision_changes_aggregate(
            where: { item_maindata_revision: { item_id: { _eq: $itemId } } }
          ) {
            aggregate {
              count
            }
          }
          item_translation_revision_changes_aggregate(
            where: { item_translation_revision: { item_id: { _eq: $itemId } } }
          ) {
            aggregate {
              count
            }
          }
        }
      `,
    });
    return data.data.base_colours;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { GET_ITEM_REVISION_CHANGES_AGGREGATES };
