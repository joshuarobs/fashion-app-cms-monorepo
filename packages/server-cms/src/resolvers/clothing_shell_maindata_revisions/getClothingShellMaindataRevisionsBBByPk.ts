import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets a clothing shell maindata revision by its pk (barebones data only).
 * This is mainly going to be used by other functions and queries on the server.
 * @param id
 */
async function getClothingShellMaindataRevisionsBBByPk(id: string) {
  logger.info(
    `graphql > getClothingShellMaindataRevisionsBBByPk() | args: id: ${id}`
  );

  try {
    const data = await client.query({
      query: gql`
        query getClothingShellMaindataRevisionsBBByPk($id: uuid!) {
          clothing_shell_maindata_revisions_by_pk(id: $id) {
            id
            clothing_shell_id
            revision
            state
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.clothing_shell_maindata_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getClothingShellMaindataRevisionsBBByPk };
