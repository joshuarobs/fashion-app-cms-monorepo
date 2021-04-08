import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function updateCompanyTranslationRevisionToReview() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateCompanyTranslationRevisionToReview($revisionId: uuid!) {
          update_company_translation_revisions_by_pk(
            pk_columns: { id: $revisionId }
            _set: { state: Review }
          ) {
            id
            company_id
            locale_code
            revision
            state
          }
        }
      `,
    });
    return data.data.update_company_translation_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateCompanyTranslationRevisionToReview };
