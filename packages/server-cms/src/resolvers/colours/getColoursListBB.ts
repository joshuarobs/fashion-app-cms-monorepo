import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { Data_Entry_Query_Amount_Max_Limit } from '../../settings';

async function getColoursListBB(limit: number, offset: number) {
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getColoursListBB($limit: Int, $offset: Int) {
          colours(
            order_by: { updated_at: desc }
            limit: $limit
            offset: $offset
          ) {
            id
            name
            base_colour
            colour_code
            updated_at
          }
        }
      `,
      variables: {
        limit,
        offset,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.colours;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getColoursListBB };
