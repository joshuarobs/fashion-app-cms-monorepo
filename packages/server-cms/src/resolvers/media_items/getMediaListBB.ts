import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { Data_Entry_Query_Amount_Max_Limit } from '../../settings';

async function getMediaListBB(
  limit: number,
  offset: number,
  fabricLayerTypes: any
) {
  logger.info(`graphql > getMediaListBB() | args: id:`);
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getMediaListBB(
          $limit: Int
          $offset: Int # $fabricLayerTypes: [fabric_layer_types_enum!]
        ) {
          media_items(
            order_by: { updated_at: desc }
            # $filters
            # where: { fabric_layer_type: { _in: $fabricLayerTypes } }
            limit: $limit
            offset: $offset
          ) {
            id
            name
            description
            type
            url
            created_at
            updated_at
          }
        }
      `,
      variables: {
        limit,
        offset,
        // fabricLayerTypes,
      },
      fetchPolicy: 'network-only',
    });
    console.log('data:', data);
    return data.data.media_items;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getMediaListBB };
