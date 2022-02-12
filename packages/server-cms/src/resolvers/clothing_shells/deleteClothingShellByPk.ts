import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Deletes a clothing shell entry by primary key
 * This should only be used after every other clothing shell maindata revision,
 * activity logs, permission matrices, etc. are all deleted
 * Otherwise it won't work
 */
async function deleteClothingShellByPk(id: number) {
  logger.info(`graphql > deleteClothingShellByPk() :: args: id: ${id}`);

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation deleteClothingShellByPk($id: Int!) {
          delete_clothing_shells_by_pk(id: $id) {
            id
          }
        }
      `,
      variables: {
        id,
      },
    });
    return data.data.delete_clothing_shells_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteClothingShellByPk };
