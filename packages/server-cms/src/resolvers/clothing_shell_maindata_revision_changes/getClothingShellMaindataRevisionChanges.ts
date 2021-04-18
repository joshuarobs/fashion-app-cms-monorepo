import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { Data_Entry_Query_Amount_Max_Limit } from '../../settings';

async function getClothingShellMaindataRevisionChanges(
  id: number,
  limit: number,
  offset: number
) {
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getClothingShellMaindataRevisionChanges(
          $id: Int!
          $limit: Int
          $offset: Int
        ) {
          clothing_shell_maindata_revision_changes(
            where: {
              clothing_shell_maindata_revision: {
                clothing_shell_id: { _eq: $id }
              }
            }
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
            clothing_shell_maindata_revision {
              id
              clothing_shell_id
              revision
              clothing_shell {
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
    });
    return data.data.clothing_shell_maindata_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getClothingShellMaindataRevisionChanges };
