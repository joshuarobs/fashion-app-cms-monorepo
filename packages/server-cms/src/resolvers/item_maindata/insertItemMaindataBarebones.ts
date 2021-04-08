import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

// Gets all the revisions for an item (main data only)
// Barebones (BB) data only (no other relational or foreign data)
// This is used for the Overview tab for the Item page (Revisions dropdown)
async function insertItemMaindataBarebones() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertItemMaindataBarebones(
          $revisionId: uuid!
          $isRelease: Boolean!
          $name: String!
          $type: item_types_enum!
        ) {
          insert_item_maindata_one(
            object: {
              revision_id: $revisionId
              is_release: $isRelease
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
    });
    return data.data.insert_item_maindata_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemMaindataBarebones };
