import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteCompanyTranslationsForRevision() {
  try {
    const data = await client.query({
      query: gql`
        mutation deleteCompanyTranslationsForRevision($revisionId: uuid!) {
          delete_company_translations(
            where: { revision_id: { _eq: $revisionId } }
          ) {
            returning {
              id
              is_release
              revision_id
              stylised_name
              short_name
              bio
            }
          }
        }
      `,
    });
    return data.data.delete_company_translations;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteCompanyTranslationsForRevision };
