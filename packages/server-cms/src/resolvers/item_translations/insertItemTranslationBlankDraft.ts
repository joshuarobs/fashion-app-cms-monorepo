import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertItemTranslationBlankDraft() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertItemTranslationBlankDraft($revisionId: uuid!) {
          insert_item_translations_one(
            object: {
              revision_id: $revisionId
              is_release: false
              full_name: ""
            }
          ) {
            id
            full_name
            is_release
            revision_id
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

export { insertItemTranslationBlankDraft };
