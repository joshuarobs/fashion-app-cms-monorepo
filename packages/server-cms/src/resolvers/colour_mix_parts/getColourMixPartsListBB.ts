import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { Data_Entry_Query_Amount_Max_Limit } from '../../settings';

async function getColourMixPartsListBB(limit: number, offset: number) {
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getColourMixPartsListBB($limit: Int, $offset: Int) {
          colour_mix_parts(
            # order_by: { updated_at: desc }
            limit: $limit
            offset: $offset
          ) {
            id
            colour_id
            colour {
              id
              colour_code
              name
            }
            percent
            fabric_layer_and_colour_mix_parts_aggregate {
              aggregate {
                count
              }
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
    return data.data.colour_mix_parts;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getColourMixPartsListBB };
