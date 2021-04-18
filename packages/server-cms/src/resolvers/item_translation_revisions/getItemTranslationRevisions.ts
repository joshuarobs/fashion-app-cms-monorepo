import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getItemTranslationRevisions(id: number) {
  try {
    const data = await client.query({
      query: gql`
        query getItemTranslationRevisions($id: Int!) {
          item_translation_revisions(
            where: { item_id: { _eq: $id } }
            distinct_on: [locale_code]
            order_by: [{ locale_code: asc }, { revision: desc }]
          ) {
            id
            item_id
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
            item_translations(order_by: { is_release: desc }, limit: 1) {
              id
              revision_id
              is_release
              full_name
              short_name
              description
            }
          }
        }
      `,
      variables: {
        id,
      },
    });
    return data.data.item_translation_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemTranslationRevisions };
