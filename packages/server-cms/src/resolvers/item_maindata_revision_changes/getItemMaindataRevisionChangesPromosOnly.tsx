import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getItemMaindataRevisionChangesPromosOnly() {
  try {
    const data = await client.query({
      query: gql`
        query getItemMaindataRevisionChangesPromosOnly(
          $itemId: Int!
          $revision: Int!
        ) {
          item_maindata_revision_changes(
            where: {
              item_maindata_revision: {
                item_id: { _eq: $itemId }
                revision: { _eq: $revision }
              }
              change_type: { _eq: Promotion }
            }
            distinct_on: to_state
            order_by: { to_state: asc, date: desc }
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
              #item {
              #  id
              # name
              #}
            }
          }
        }
      `,
    });
    return data.data.item_maindata_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemMaindataRevisionChangesPromosOnly };
