import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertCompanyTranslationRevisionChangePromoProduction() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertCompanyTranslationRevisionChangePromoProduction(
          $revisionId: uuid!
          $userId: Int!
        ) {
          insert_company_translation_revision_changes_one(
            object: {
              company_translation_revision_id: $revisionId
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
            company_translation_revision_id
            user_id
          }
        }
      `,
    });
    return data.data.insert_company_translation_revision_changes_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertCompanyTranslationRevisionChangePromoProduction };
