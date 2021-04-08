import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertItemTranslation() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertItemTranslation(
          $revision_id: uuid!
          $is_release: Boolean!
          $full_name: String!
          $short_name: String
          $description: String
        ) {
          insert_item_translations_one(
            object: {
              revision_id: $revision_id
              is_release: $is_release
              full_name: $full_name
              short_name: $short_name
              description: $description
            }
          ) {
            id
            revision_id
            is_release
            full_name
            short_name
            description
          }
        }
      `,
    });
    return data.data.insert_item_translations_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemTranslation };
