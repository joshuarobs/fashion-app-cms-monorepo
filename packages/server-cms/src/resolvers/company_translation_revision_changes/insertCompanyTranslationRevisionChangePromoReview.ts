import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertCompanyTranslationRevisionChangePromoReview() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertCompanyTranslationRevisionChangePromoReview(
          $revisionId: uuid!
          $userId: Int!
        ) {
          insert_company_translation_revision_changes_one(
            object: {
              company_translation_revision_id: $revisionId
              change_type: Promotion
              to_state: Review
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
    return data.data.insertCompanyTranslationRevisionChangePromoReview;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertCompanyTranslationRevisionChangePromoReview };
