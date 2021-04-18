import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getItemTranslationRevisionsGivenLocaleCode(
  itemId: number,
  localeCode: string
) {
  try {
    const data = await client.query({
      query: gql`
        query getItemTranslationRevisionsGivenLocaleCode(
          $itemId: Int!
          $localeCode: String!
        ) {
          item_translation_revisions(
            where: {
              item_id: { _eq: $itemId }
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
            item_translations(order_by: { is_release: desc }, limit: 1) {
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
        itemId,
        localeCode,
      },
    });
    return data.data.item_translation_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemTranslationRevisionsGivenLocaleCode };
