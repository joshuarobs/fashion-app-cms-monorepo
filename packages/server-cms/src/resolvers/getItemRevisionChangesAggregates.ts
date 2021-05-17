import { gql } from '@apollo/client';
import { client } from '../graphql-client';
import { logger } from '../logger';

async function getItemRevisionChangesAggregates(itemId: number) {
  try {
    const data = await client.query({
      query: gql`
        query getItemRevisionChangesAggregates($itemId: Int!) {
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
      variables: {
        itemId,
      },
      fetchPolicy: 'network-only',
    });
    return data.data;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemRevisionChangesAggregates };
