import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getCompanyTranslationRevisionChangesPromosOnly(
  companyId: number,
  localeCode: string,
  revision: number
) {
  try {
    const data = await client.query({
      query: gql`
        query getCompanyTranslationRevisionChangesPromosOnly(
          $companyId: Int!
          $localeCode: String!
          $revision: Int!
        ) {
          company_translation_revision_changes(
            where: {
              company_translation_revision: {
                company_id: { _eq: $companyId }
                locale_code: { _eq: $localeCode }
                revision: { _eq: $revision }
              }
              change_type: { _eq: Promotion }
            }
          ) {
            id
            to_state
            date
            change_type
            action
            user {
              id
              name
              email
            }
            company_translation_revision_id
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
      variables: {
        companyId,
        localeCode,
        revision,
      },
    });
    return data.data.company_translation_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getCompanyTranslationRevisionChangesPromosOnly };
