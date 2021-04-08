import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets all the revisions for a clothing shell (main data only)
 * Barebones (BB) data only (no other relational or foreign data)
 * This is used for the Overview tab for the Clothing Shell page (Revisions
 * dropdown)
 */
async function getRevisionsForClothingShellBarebones() {
  try {
    const data = await client.query({
      query: gql`
        query getRevisionsForClothingShellBarebones($id: Int!) {
          clothing_shell_maindata_revisions(
            where: { clothing_shell_id: { _eq: $id } }
            order_by: { revision: desc }
          ) {
            id
            revision
            state
          }
        }
      `,
    });
    return data.data.clothing_shell_maindata_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getRevisionsForClothingShellBarebones };
