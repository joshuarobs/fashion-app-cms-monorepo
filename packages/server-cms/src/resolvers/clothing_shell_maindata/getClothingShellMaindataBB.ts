import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets a clothing shell maindata by its pk (barebones data only).
 * This is mainly going to be used by other functions and queries on the server.
 * @param id
 */
async function getClothingShellMaindataBB(id: string) {
  logger.info(`graphql > getClothingShellMaindataBB() | args: id: ${id}`);

  try {
    const data = await client.query({
      query: gql`
        query getClothingShellMaindataBB($id: uuid!) {
          clothing_shell_maindata_by_pk(id: $id) {
            id
            revision_id
            is_release
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.clothing_shell_maindata_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getClothingShellMaindataBB };
