import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getItemMaindataRevisionChanges() {
  try {
    const data = await client.query({
      query: gql`
        query getItemMaindataRevisionChanges($id: Int!, $limit: Int!) {
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
            }
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
    });
    return data.data.base_colours;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemMaindataRevisionChanges };
