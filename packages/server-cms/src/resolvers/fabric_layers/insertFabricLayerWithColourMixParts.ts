import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Inserts a new Fabric Layer entry, along with new Colour Mix Parts
 * relationship entries that point to the newly created entry and the
 * selected colours.
 * This is used for the Fabric Layers page (Header popup modal)
 * @param fabric_layer
 * @param colour_mix_parts_ids
 * @param context - Apollo context
 */
async function insertFabricLayerWithColourMixParts(
  fabric_layer: any,
  colour_mix_parts_ids: number[],
  context?: any
) {
  logger.info(
    `graphql > insertFabricLayerWithColourMixParts() :: args: fabric_layer: ${JSON.stringify(
      fabric_layer,
      null,
      2
    )} | colour_mix_parts_ids: ${JSON.stringify(
      colour_mix_parts_ids,
      null,
      2
    )} | context: ${JSON.stringify(context, null, 2)}`
  );
  try {
    // Delete all important fields of the maindata that should not be changed
    delete fabric_layer.id;
    delete fabric_layer.created_at;
    delete fabric_layer.updated_at;

    /*
     * ============================================================
     * 1. Get the user's permissions
     * ============================================================
     */

    /*
     * ============================================================
     * 2. Create a new fabric layer
     * ============================================================
     */
    const data2 = await client.mutate({
      mutation: gql`
        mutation insertFabricLayer($object: fabric_layers_insert_input!) {
          insert_fabric_layers_one(object: $object) {
            id
            thickness
            notes
            fabric_layer_type
            insulation
            density
            permeability
          }
        }
      `,
      variables: {
        object: fabric_layer,
      },
    });
    console.log('data2:', data2.data.insert_fabric_layers_one);

    /*
     * ============================================================
     * 3. Create a new fabric layer and colour mix part
     *    relationships
     * ============================================================
     */
    const relationships: any = [];
    colour_mix_parts_ids.forEach((id) => {
      relationships.push({
        colour_mix_part_id: id,
        fabric_layer_id: data2.data.insert_fabric_layers_one.id,
      });
    });
    console.log('relationships2:', relationships);

    const data3 = await client.mutate({
      mutation: gql`
        mutation insertRelationships(
          $objects: [fabric_layer_and_colour_mix_part_insert_input!]!
        ) {
          insert_fabric_layer_and_colour_mix_part(objects: $objects) {
            returning {
              colour_mix_part_id
              fabric_layer_id
            }
          }
        }
      `,
      variables: {
        objects: relationships,
      },
    });
    console.log('data3:', data3.data.insert_fabric_layer_and_colour_mix_part);

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `graphql > insertFabricLayerWithColourMixParts() :: Successfully returned data`
    );
    return data2.data.insert_fabric_layers_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertFabricLayerWithColourMixParts };
