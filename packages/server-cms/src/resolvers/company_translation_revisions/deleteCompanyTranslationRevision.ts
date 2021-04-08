import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteCompanyTranslationRevision() {
  try {
    const data = await client.query({
      query: gql`
        mutation deleteCompanyTranslationRevision($id: uuid!) {
          delete_company_translation_revisions_by_pk(id: $id) {
            id
            company_id
            revision
            state
            locale_code
          }
        }
      `,
    });
    return data.data.delete_company_translation_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteCompanyTranslationRevision };
