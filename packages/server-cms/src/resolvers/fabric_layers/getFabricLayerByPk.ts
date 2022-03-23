import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getFabricLayerByPk(id: number, context?: any) {
  try {
    const data = await client.query({
      query: gql`
        query getFabricLayerByPk($id: Int!) {
          fabric_layers_by_pk(id: $id) {
            id
            thickness
            insulation
            density
            permeability
            fabric_layer_type
            notes
            fabric_layer_and_colour_mix_parts {
              fabric_layer_id
              colour_mix_part_id
              colour_mix_part {
                id
                percent
                colour_id
                colour {
                  id
                  name
                  base_colour
                  colour_code
                }
              }
            }
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.fabric_layers_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getFabricLayerByPk };
