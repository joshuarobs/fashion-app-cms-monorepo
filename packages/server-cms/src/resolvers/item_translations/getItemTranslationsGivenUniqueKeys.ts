import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getItemTranslationsGivenUniqueKeys(
  revision: number,
  itemId: number,
  localeCode: string
) {
  try {
    const data = await client.query({
      query: gql`
        query getItemTranslationsGivenUniqueKeys(
          $revision: Int!
          $itemId: Int!
          $localeCode: String!
        ) {
          item_translations(
            where: {
              revision: {
                revision: { _eq: $revision }
                item_id: { _eq: $itemId }
                locale_code: { _eq: $localeCode }
              }
            }
            order_by: { is_release: asc }
          ) {
            id
            revision_id
            is_release
            full_name
            short_name
            description
            revision {
              revision
              item_id
              locale_code
            }
          }
        }
      `,
      variables: {
        revision,
        itemId,
        localeCode,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.item_translations;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemTranslationsGivenUniqueKeys };
