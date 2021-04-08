import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertCompanyTranslationRevision() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertCompanyTranslationRevision(
          $entryId: Int!
          $localeCode: String!
          $revision: Int!
        ) {
          insert_company_translation_revisions_one(
            object: {
              company_id: $entryId
              locale_code: $localeCode
              revision: $revision
            }
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
    return data.data.insert_company_translation_revisions_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertCompanyTranslationRevision };
