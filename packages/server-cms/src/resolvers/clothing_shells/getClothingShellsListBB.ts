import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  Data_Entry_Query_Amount_Max_Limit,
  Data_Entry_Query_Amount_Min_Standard,
} from '../../settings';

async function getClothingShellsListBB(
  limit = Data_Entry_Query_Amount_Min_Standard,
  offset: number
) {
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getClothingShellsListBB($limit: Int, $offset: Int) {
          clothing_shells(
            order_by: { updated_at: desc }
            limit: $limit
            offset: $offset
          ) {
            id
            updated_at
            counts {
              id
              item_count
            }
          }
        }
      `,
      variables: {
        limit,
        offset,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.clothing_shells;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getClothingShellsListBB };
