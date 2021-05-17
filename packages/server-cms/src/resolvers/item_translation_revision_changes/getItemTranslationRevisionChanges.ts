import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  Data_Entry_Query_Amount_Max_Limit,
  Data_Entry_Query_Amount_Min_Half,
} from '../../settings';

async function getItemTranslationRevisionChanges(
  id: number,
  limit = Data_Entry_Query_Amount_Min_Half,
  offset: number
) {
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getItemTranslationRevisionChanges(
          $id: Int!
          $limit: Int
          $offset: Int
        ) {
          item_translation_revision_changes(
            where: { item_translation_revision: { item_id: { _eq: $id } } }
            order_by: { date: desc }
            limit: $limit
            offset: $offset
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
        id,
        limit,
        offset,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.item_translation_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemTranslationRevisionChanges };
