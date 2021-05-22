import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { ItemType } from '@joshuarobs/clothing-framework/build/enums';

/**
 * Gets all the revisions for an item (main data only)
 * Barebones (BB) data only (no other relational or foreign data)
 * This is used for the Overview tab for the Item page (Revisions dropdown)
 * @param revision_id
 * @param is_release
 * @param name
 * @param type
 */
async function insertItemMaindataBarebones(
  revision_id: string,
  is_release: boolean,
  name: string,
  type: ItemType
) {
  logger.info(
    `graphql > insertItemMaindataBarebones() :: args: revision_id: ${revision_id} | is_release: ${is_release} | name: ${name} | type: ${type}`
  );
  try {
    const data = await client.mutate({
      mutation: gql`
        mutation insertItemMaindataBarebones(
          $revision_id: uuid!
          $is_release: Boolean!
          $name: String!
          $type: item_types_enum!
        ) {
          insert_item_maindata_one(
            object: {
              revision_id: $revision_id
              is_release: $is_release
              name: $name
              type: $type
            }
          ) {
            id
            is_release
            name
            type
            brand_id
            clothing_shell_id
            for_gender
            item_family_id
            revision_id
            short_id
            revision {
              item_id
              revision
            }
          }
        }
      `,
      variables: {
        revision_id,
        is_release,
        name,
        type,
      },
    });
    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `graphql > insertItemMaindataBarebones() :: Successfully returned data`
    );
    return data.data.insert_item_maindata_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemMaindataBarebones };
