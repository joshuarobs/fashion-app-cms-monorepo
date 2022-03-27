import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { Data_Entry_Query_Amount_Max_Limit } from '../../settings';

async function getMediaListBB(limit: number, offset: number) {
  logger.info(
    `graphql > getMediaListBB() | args: limit: ${limit} | offset: ${offset}`
  );
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getMediaListBB(
          $limit: Int
          $offset: Int # $fabricLayerTypes: [fabric_layer_types_enum!]
        ) {
          media_items(limit: $limit, offset: $offset) {
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
