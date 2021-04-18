import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  Data_Entry_Query_Amount_Max_Limit,
  Data_Entry_Query_Amount_Min_Half,
} from '../../settings';

async function getItemTranslationRevisionChangesForLocale(
  itemId: number,
  localeCode: string,
  limit = Data_Entry_Query_Amount_Min_Half,
  offset: number
) {
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getItemTranslationRevisionChangesForLocale(
          $itemId: Int!
          $localeCode: String!
          $limit: Int
          $offset: Int
        ) {
          item_translation_revision_changes(
            where: {
              item_translation_revision: {
                item_id: { _eq: $itemId }
                locale_code: { _eq: $localeCode }
              }
            }
            order_by: { date: desc }
            limit: $limit
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
            item_translation_revision {
              id
              item_id
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
              item {
                id
                # name
              }
            }
          }
        }
      `,
      variables: {
        itemId,
        localeCode,
        limit,
        offset,
      },
    });
    return data.data.item_translation_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemTranslationRevisionChangesForLocale };
