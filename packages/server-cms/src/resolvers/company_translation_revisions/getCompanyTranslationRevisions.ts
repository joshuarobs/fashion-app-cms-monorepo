import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getCompanyTranslationRevisions(id: number) {
  try {
    const data = await client.query({
      query: gql`
        query getCompanyTranslationRevisions($id: Int!) {
          company_translation_revisions(
            where: { company_id: { _eq: $id } }
            distinct_on: [locale_code]
            order_by: [{ locale_code: asc }, { revision: desc }]
          ) {
            id
            company_id
            locale_code
            revision
            state
            locale {
              code
              name
              country {
                value
              }
              language {
                value
              }
            }
            company_translations(order_by: { is_release: desc }, limit: 1) {
              id
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
        id,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.company_translation_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getCompanyTranslationRevisions };
