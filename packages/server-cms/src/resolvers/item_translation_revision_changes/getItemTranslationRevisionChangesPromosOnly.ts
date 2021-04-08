import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getItemTranslationRevisionChangesPromosOnly() {
  try {
    const data = await client.query({
      query: gql`
        query getItemTranslationRevisionChangesPromosOnly(
          $itemId: Int!
          $localeCode: String!
          $revision: Int!
        ) {
          item_translation_revision_changes(
            where: {
              item_translation_revision: {
                item_id: { _eq: $itemId }
                locale_code: { _eq: $localeCode }
                revision: { _eq: $revision }
              }
              change_type: { _eq: Promotion }
            }
          ) {
            id
            to_state
            date
            change_type
            action
            user {
              id
              name
              email
            }
            item_translation_revision_id
            item_translation_revision {
              id
              item_id
              revision
              locale {
                code
                name
                country {
                  description
                }
                language {
                  description
                }
              }
              item {
                id
                # name
              }
            }
          }
        }
      `,
    });
    return data.data.item_translation_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemTranslationRevisionChangesPromosOnly };
