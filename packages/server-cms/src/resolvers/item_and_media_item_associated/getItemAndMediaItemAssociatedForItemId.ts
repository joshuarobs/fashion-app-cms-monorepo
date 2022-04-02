import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  Data_Entry_Query_Amount_Max_Limit,
  Data_Entry_Query_Amount_Min_Half,
} from '../../settings';

async function getItemAndMediaItemAssociatedForItemId(
  id: number,
  limit: number,
  offset: number
) {
  if (!limit) limit = Data_Entry_Query_Amount_Min_Half;
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;
  if (offset < 0) offset = 0;

  try {
    const data = await client.query({
      query: gql`
        query getItemAndMediaItemAssociatedForItemId(
          $item_id: Int!
          $limit: Int
          $offset: Int
        ) {
          item_and_media_item_associated(
            where: { item_id: { _eq: $item_id } }
            limit: $limit
            offset: $offset
            order_by: { media_item: { created_at: asc } }
          ) {
            item_id
            media_item_id
            media_item {
              id
              name
              url
            }
          }
        }
      `,
      variables: {
        item_id: id,
        limit,
        offset,
      },
      fetchPolicy: 'network-only',
    });
    // console.log('data:', data);
    return data.data.item_and_media_item_associated;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemAndMediaItemAssociatedForItemId };
