import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertCompanyTranslationBlankDraft() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertCompanyTranslationBlankDraft($revisionId: uuid!) {
          insert_company_translations_one(
            object: {
              revision_id: $revisionId
              is_release: false
              stylised_name: ""
              short_name: ""
            }
          ) {
            id
            revision_id
            is_release
            stylised_name
            short_name
            bio
          }
        }
      `,
    });
    return data.data.insert_company_translations_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertCompanyTranslationBlankDraft };
