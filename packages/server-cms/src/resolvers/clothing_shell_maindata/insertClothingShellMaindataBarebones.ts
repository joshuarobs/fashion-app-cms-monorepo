import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { ItemType } from '@joshuarobs/clothing-framework';

/**
 * Gets all the revisions for a clothing shell (main data only)
 * Barebones (BB) data only (no other relational or foreign data)
 * This is used for the Overview tab for the Clothing Shell page (Revisions
 * dropdown)
 * @param revision_id
 * @param is_release
 * @param name
 * @param item_type
 */
async function insertClothingShellMaindataBarebones(
  revision_id: string,
  is_release: boolean,
  name: string,
  item_type: ItemType,
  clothing_segment_data_id: string
) {
  logger.info(
    `graphql > insertClothingShellMaindataBarebones() :: args: revision_id: ${revision_id} | is_release: ${is_release} | name: ${name} | item_type: ${item_type}`
  );
  try {
    const data = await client.mutate({
      mutation: gql`
        mutation insertClothingShellMaindataBarebones(
          $revision_id: uuid!
          $is_release: Boolean!
          $name: String!
          $item_type: item_types_enum!
          $clothing_segment_data_id: uuid!
        ) {
          insert_clothing_shell_maindata_one(
            object: {
              revision_id: $revision_id
              is_release: $is_release
              name: $name
              item_type: $item_type
              clothing_segment_data_id: $clothing_segment_data_id
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
              id
              clothing_shell_id
              revision
            }
          }
        }
      `,
      variables: {
        revision_id,
        is_release,
        name,
        item_type,
        clothing_segment_data_id,
      },
    });
    return data.data.insert_clothing_shell_maindata_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertClothingShellMaindataBarebones };
