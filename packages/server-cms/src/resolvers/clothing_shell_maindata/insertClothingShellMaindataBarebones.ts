import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

// Gets all the revisions for a clothing shell (main data only)
// Barebones (BB) data only (no other relational or foreign data)
// This is used for the Overview tab for the Clothing Shell page (Revisions
// dropdown)
async function insertClothingShellMaindataBarebones() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertClothingShellMaindataBarebones(
          $revisionId: uuid!
          $isRelease: Boolean!
          $name: String!
          $type: item_types_enum!
        ) {
          insert_clothing_shell_maindata_one(
            object: {
              revision_id: $revisionId
              is_release: $isRelease
              name: $name
              type: $type
            }
          ) {
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
              item_id
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

export { insertClothingShellMaindataBarebones };
