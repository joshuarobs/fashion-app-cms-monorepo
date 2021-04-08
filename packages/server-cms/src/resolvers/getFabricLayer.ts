import { gql } from '@apollo/client';
import { client } from '../graphql-client';
import { logger } from '../logger';

async function getFabricLayer() {
  try {
    const data = await client.query({
      query: gql`
        query getFabricLayer($id: Int!) {
          fabric_layers_by_pk(id: $id) {
            id
            fabric_layer_and_colour_mix_parts {
              fabric_layer_id
              colour_mix_part_id
              colour_mix_part {
                id
                percent
                colour {
                  name
                  base_colour
                  colour_code
                }
              }
            }
          }
        }
      `,
    });
    return data.data.fabric_layers_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getFabricLayer };
