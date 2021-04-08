import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

// Gets all the revisions for an item (main data only)
// This is used for the Overview tab for the Item page (New revision state)
async function insertItemMaindata() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertItemMaindata(
          $revisionId: uuid!
          $isRelease: Boolean!
          $name: String!
          $type: item_types_enum!
          $brand_id: Int
          $clothing_shell_id: Int
          $for_gender: genders_enum!
          $item_family_id: Int
        ) {
          insert_item_maindata_one(
            object: {
              revision_id: $revisionId
              is_release: $isRelease
              name: $name
              type: $type
              brand_id: $brand_id
              clothing_shell_id: $clothing_shell_id
              for_gender: $for_gender
              item_family_id: $item_family_id
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

export { insertItemMaindata };
