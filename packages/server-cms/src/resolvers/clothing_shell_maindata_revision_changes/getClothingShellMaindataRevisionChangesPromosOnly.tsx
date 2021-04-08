import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { Data_Entry_Query_Amount_Max_Limit } from '../../settings';

async function getClothingShellMaindataRevisionChangesPromosOnly(
  limit: number,
  offset: number
) {
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getClothingShellMaindataRevisionChangesPromosOnly(
          $clothingShellId: Int!
          $revision: Int!
          $limit: Int
          $offset: Int
        ) {
          clothing_shell_maindata_revision_changes(
            where: {
              clothing_shell_maindata_revision: {
                clothing_shell_id: { _eq: $clothingShellId }
                revision: { _eq: $revision }
              }
              change_type: { _eq: Promotion }
            }
            distinct_on: to_state
            order_by: { to_state: asc, date: desc }
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
              email
            }
            clothing_shell_maindata_revision_id
            clothing_shell_maindata_revision {
              id
              clothing_shell_id
              revision
              #item {
              #  id
              # name
              #}
            }
          }
        }
      `,
      variables: {
        limit,
        offset,
      },
    });
    return data.data.clothing_shell_maindata_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getClothingShellMaindataRevisionChangesPromosOnly };
