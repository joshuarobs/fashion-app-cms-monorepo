import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertItemTranslationRevision() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertItemTranslationRevision(
          $entryId: Int!
          $localeCode: String!
          $revision: Int!
        ) {
          insert_item_translation_revisions_one(
            object: {
              item_id: $entryId
              locale_code: $localeCode
              revision: $revision
            }
          ) {
            id
            item_id
            locale_code
            revision
            state
          }
        }
      `,
    });
    return data.data.insert_item_translation_revisions_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemTranslationRevision };
