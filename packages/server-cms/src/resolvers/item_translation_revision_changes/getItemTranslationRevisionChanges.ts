import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getItemTranslationRevisionChanges() {
  try {
    const data = await client.query({
      query: gql`
        query getItemTranslationRevisionChanges($itemId: Int!, $limit: Int!) {
          item_translation_revision_changes(
            where: { item_translation_revision: { item_id: { _eq: $itemId } } }
            order_by: { date: desc }
            limit: $limit
          ) {
            id
            to_state
            date
            change_type
            action
            user {
              id
              name
            }
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

export { getItemTranslationRevisionChanges };
