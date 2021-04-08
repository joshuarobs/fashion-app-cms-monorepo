import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertItemTranslationRevisionChangePromoProduction() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertItemTranslationRevisionChangePromoProduction(
          $revisionId: uuid!
          $userId: Int!
        ) {
          insert_item_translation_revision_changes_one(
            object: {
              item_translation_revision_id: $revisionId
              change_type: Promotion
              to_state: Production
              user_id: $userId
            }
          ) {
            id
            date
            action
            change_type
            to_state
            item_translation_revision_id
            user_id
          }
        }
      `,
    });
    return data.data.insert_item_translation_revision_changes_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemTranslationRevisionChangePromoProduction };
