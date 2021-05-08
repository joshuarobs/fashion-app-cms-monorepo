import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import {
  Data_Entry_Query_Amount_Max_Limit,
  Data_Entry_Query_Amount_Min_Half,
} from '../../settings';

async function getItemMaindataRevisionChanges(id: number, limit: number) {
  if (!limit) limit = Data_Entry_Query_Amount_Min_Half;
  if (limit > Data_Entry_Query_Amount_Max_Limit)
    limit = Data_Entry_Query_Amount_Max_Limit;

  try {
    const data = await client.query({
      query: gql`
        query getItemMaindataRevisionChanges($id: Int!, $limit: Int) {
          item_maindata_revision_changes(
            where: { item_maindata_revision: { item_id: { _eq: $id } } }
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
              email
            }
            item_maindata_revision_id
            item_maindata_revision {
              id
              item_id
              revision
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
      },
      fetchPolicy: 'network-only',
    });
    // console.log('data:', data);
    return data.data.item_maindata_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemMaindataRevisionChanges };
