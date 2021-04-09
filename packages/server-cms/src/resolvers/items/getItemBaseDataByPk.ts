import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets the item's base data (by pk), i.e. no other data from other tables
 * (except for aggregates)
 * This is used for going on the Item page, for data required by the Header,
 * overview and settings tab
 */
async function getItemBaseDataByPk(id: number) {
  try {
    const data = await client.query({
      query: gql`
        query getItemBaseDataByPk($id: Int!) {
          items_by_pk(id: $id) {
            id
            short_id
            created_at
            updated_at
            item_maindata_revisions(order_by: { revision: desc }, limit: 1) {
              id
              revision
              state
              item_maindata(limit: 1, order_by: { is_release: desc }) {
                id
                name
                brand_id
              }
            }
            item_translation_revisions_aggregate(distinct_on: locale_code) {
              aggregate {
                count
              }
            }
          }
        }
      `,
      variables: {
        id,
      },
    });
    return data.data.items_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemBaseDataByPk };
