import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getCompanyTranslationRevisionsByLocaleCode(
  companyId: number,
  localeCode: string
) {
  try {
    const data = await client.query({
      query: gql`
        query getCompanyTranslationRevisionsByLocaleCode(
          $companyId: Int!
          $localeCode: String!
        ) {
          company_translation_revisions(
            where: {
              company_id: { _eq: $companyId }
              locale_code: { _eq: $localeCode }
            }
            order_by: { revision: desc }
          ) {
            id
            locale_code
            revision
            state
            locale {
              code
              name
              country {
                value
                description
              }
              language {
                value
                description
              }
            }
            company_translations(order_by: { is_release: desc }, limit: 1) {
              revision_id
              is_release
              stylised_name
              short_name
              bio
            }
          }
        }
      `,
      variables: {
        companyId,
        localeCode,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.company_translation_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getCompanyTranslationRevisionsByLocaleCode };
