import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  Data_Entry_Query_Amount_Max_Limit,
  Data_Entry_Query_Amount_Min_Half,
} from '../../settings';

/**
 * Gets the 10 latest-made unique production items for a company
 * (Barebones data only)
 * This is used for the Item page, when showing the 10 latest-made items in
 * the mini items frame
 */
async function getTopXUniqueProdItemsForCompanyBB(
  limit = Data_Entry_Query_Amount_Min_Half,
  offset: number
) {
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getTopXUniqueProdItemsForCompanyBB(
          $id: Int!
          $limit: Int
          $offset: Int
        ) {
          item_maindata_revisions(
            where: {
              item_maindata: { brand_id: { _eq: $id } }
              state: { _eq: Production }
            }
            order_by: { item_id: desc, revision: desc }
            distinct_on: item_id
            limit: $limit
            offset: $offset
          ) {
            id
            item_maindata(order_by: { is_release: desc }, limit: 1) {
              id
              name
              short_id
            }
            item_id
            revision
            state
          }
        }
      `,
      variables: {
        limit,
        offset,
      },
    });
    return data.data.item_maindata_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getTopXUniqueProdItemsForCompanyBB };
