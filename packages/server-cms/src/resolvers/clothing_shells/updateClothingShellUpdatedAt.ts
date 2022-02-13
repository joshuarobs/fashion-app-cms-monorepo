import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Updates the item's updated_at field to "now"
 * This should be called after making any changes to an any item's maindata
 * or translation
 * @param id
 */
async function updateClothingShellUpdatedAt(id: number) {
  logger.info(`graphql > updateClothingShellUpdatedAt() | args: id: ${id}`);

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation updateClothingShellUpdatedAt($id: Int!) {
          update_clothing_shells_by_pk(
            pk_columns: { id: $id }
            _set: { updated_at: "now()" }
          ) {
            updated_at
            id
          }
        }
      `,
      variables: { id },
    });
    return data.data.update_clothing_shells_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateClothingShellUpdatedAt };
