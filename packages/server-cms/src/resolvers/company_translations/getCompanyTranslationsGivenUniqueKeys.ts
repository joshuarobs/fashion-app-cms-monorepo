import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getCompanyTranslationsGivenUniqueKeys(
  revision: number,
  companyId: number,
  localeCode: string
) {
  try {
    const data = await client.query({
      query: gql`
        query getCompanyTranslationsGivenUniqueKeys(
          $revision: Int!
          $companyId: Int!
          $localeCode: String!
        ) {
          company_translations(
            where: {
              revision: {
                revision: { _eq: $revision }
                company_id: { _eq: $companyId }
                locale_code: { _eq: $localeCode }
              }
            }
            order_by: { is_release: asc }
          ) {
            id
            revision_id
            is_release
            stylised_name
            short_name
            bio
            revision {
              revision
              company_id
              locale_code
            }
          }
        }
      `,
      variables: {
        revision,
        companyId,
        localeCode,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.company_translations;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getCompanyTranslationsGivenUniqueKeys };
