import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { Data_Entry_Query_Amount_Max_Limit } from '../../settings';

async function getFabricLayersListBB(
  limit: number,
  offset: number,
  fabricLayerTypes: any
) {
  logger.info(
    `graphql > getFabricLayersListBB() | args: limit: ${limit} | offset: ${offset} | fabricLayerTypes: ${fabricLayerTypes}`
  );
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getFabricLayersListBB(
          $limit: Int
          $offset: Int
          $fabricLayerTypes: [fabric_layer_types_enum!]
        ) {
          fabric_layers(
            order_by: { updated_at: desc }
            # $filters
            where: { fabric_layer_type: { _in: $fabricLayerTypes } }
            limit: $limit
            offset: $offset
          ) {
            id
            thickness
            insulation
            density
            permeability
            fabric_layer_type
            fabric_layer_and_colour_mix_parts {
              fabric_layer_id
              colour_mix_part_id
              colour_mix_part {
                id
                percent
                colour {
                  id
                  name
                  colour_code
                }
              }
            }
          }
        }
      `,
      variables: {
        limit,
        offset,
        fabricLayerTypes,
      },
      fetchPolicy: 'network-only',
    });
    console.log('data:', data);
    return data.data.fabric_layers;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getFabricLayersListBB };
