import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getClothingShellMaindataRevisionChanges() {
  try {
    const data = await client.query({
      query: gql`
        query getClothingShellMaindataRevisionChanges($id: Int!, $limit: Int!) {
          clothing_shell_maindata_revision_changes(
            where: {
              clothing_shell_maindata_revision: {
                clothing_shell_id: { _eq: $id }
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
    });
    return data.data.clothing_shell_maindata_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getClothingShellMaindataRevisionChanges };
