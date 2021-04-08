import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getCompanyTranslationRevisionChangesForLocale() {
  try {
    const data = await client.query({
      query: gql`
        query getCompanyTranslationRevisionChangesForLocale(
          $companyId: Int!
          $localeCode: String!
        ) {
          company_translation_revision_changes(
            where: {
              company_translation_revision: {
                company_id: { _eq: $companyId }
                locale_code: { _eq: $localeCode }
              }
            }
            order_by: { date: desc }
            limit: 10
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
            company_translation_revision {
              id
              company_id
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
              company {
                id
                name
              }
            }
          }
        }
      `,
    });
    return data.data.company_translation_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getCompanyTranslationRevisionChangesForLocale };
