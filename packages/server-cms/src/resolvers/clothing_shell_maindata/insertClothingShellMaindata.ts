import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

// Gets all the revisions for an item (main data only)
// This is used for the Overview tab for the Item page (New revision state)
async function insertClothingShellMaindata() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertClothingShellMaindata(
          $object: clothing_shell_maindata_insert_input!
        ) {
          insert_clothing_shell_maindata_one(object: $object) {
            id
            revision_id
            is_release
            name
            item_type
            uniform_thickness
            default_shell_layer_id
            default_fill_layer_id
            default_lining_layer_id
            default_interlining_layer_id
            clothing_segment_data_id
            revision {
              clothing_shell_id
              revision
            }
          }
        }
      `,
    });
    return data.data.insert_clothing_shell_maindata_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertClothingShellMaindata };
