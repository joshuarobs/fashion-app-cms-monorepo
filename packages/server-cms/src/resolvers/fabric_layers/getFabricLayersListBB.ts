import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getFabricLayersListBB() {
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
                }
              }
            }
          }
        }
      `,
    });
    return data.data.fabric_layers;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getFabricLayersListBB };
