/* eslint-disable @typescript-eslint/no-unused-vars */
import { logger } from '../../logger';
import { deleteItemTranslationRevisionChangesForItem } from '../item_translation_revision_changes/deleteItemTranslationRevisionChangesForItem';
import { deleteItemTranslationsForItem } from '../item_translations/deleteItemTranslationsForItem';
import { deleteItemTranslationRevisionsForItem } from '../item_translation_revisions/deleteItemTranslationRevisionsForItem';
import { deleteItemMaindataRevisionChangesForItem } from '../item_maindata_revision_changes/deleteItemMaindataRevisionChangesForItem';
import { deleteItemMaindataForItem } from '../item_maindata/deleteItemMaindataForItem';
import { deleteItemMaindataRevisionsForItem } from '../item_maindata_revisions/deleteItemMaindataRevisionsForItem';
// import { deleteClothingShellByPk } from './deleteClothingShellByPk';
import { deleteClothingShellMaindataRevisionChangesForClothingShell } from '../clothing_shell_maindata_revision_changes/deleteClothingShellMaindataRevisionChangesForClothingShell';
import { deleteClothingShellMaindataForClothingShell } from '../clothing_shell_maindata/deleteClothingShellMaindataForClothingShell';
import { deleteClothingShellMaindataRevisionsForClothingShell } from '../clothing_shell_maindata_revisions/deleteClothingShellMaindataRevisionsForClothingShell';
import { deleteClothingShellCountsForClothingShell } from '../clothing_shell_counts/deleteClothingShellCountsForClothingShell';
import { deleteClothingSegmentDataByPk } from '../clothing_segment_data/deleteClothingSegmentDataByPk';
import { client } from '../../graphql-client';
import { gql } from '@apollo/client';
import { getFabricLayerByPk } from './getFabricLayerByPk';

/**
 * Deletes a Fabric Layer entry with all of it's required dependent rows
 * (fabric_layer_and_colour_mix_parts, etc.).
 *
 * This will typically be called from the Settings tab, or on the Fabric
 * Layers' list page, usually as an admin action.
 * @param id - The id of the fabric layer row to delete
 * @param context - Apollo context
 */
async function deleteFabricLayerAndItsColourMixParts(id: number, context: any) {
  try {
    logger.info(
      `graphql > deleteFabricLayerAndItsColourMixParts() :: args: id: ${id} | context: ${JSON.stringify(
        context,
        null,
        2
      )}`
    );

    /*
     * 1. Check for user permission
     */

    /*
     * 2. Query the given id to make sure it's a valid entry
     */
    const data2 = await getFabricLayerByPk(id);
    console.log('data2:', data2);

    if (!data2) {
      logger.info(
        `graphql > deleteFabricLayerAndItsColourMixParts() :: getFabricLayerByPk(${id}) found no data entry with given id`
      );
      return null;
    }

    /*
     * 3. Delete `fabric_layer_and_colour_mix_parts` relationship rows
     */
    const data3 = await client.mutate({
      mutation: gql`
        mutation deleteFabricLayerAndColourMixParts($id: Int!) {
          delete_fabric_layer_and_colour_mix_part(
            where: { fabric_layer_id: { _eq: $id } }
          ) {
            returning {
              fabric_layer_id
              colour_mix_part_id
            }
          }
        }
      `,
      variables: {
        id: data2.id,
      },
    });
    console.log('data3:', data3.data.delete_fabric_layer_and_colour_mix_part);

    /*
     * 4. Delete the fabric layer
     */
    const data4 = await client.mutate({
      mutation: gql`
        mutation deleteFabricLayer($id: Int!) {
          delete_fabric_layers_by_pk(id: $id) {
            id
          }
        }
      `,
      variables: {
        id: data2.id,
      },
    });
    console.log('data4:', data4.data.delete_fabric_layers_by_pk);

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `graphql > deleteFabricLayerAndItsColourMixParts() :: Successfully returned data`
    );
    return data4.data.delete_fabric_layers_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteFabricLayerAndItsColourMixParts };
