import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Deletes all the maindata for a clothing shell
 * This is used for the Settings tab for the Clothing shell page (Delete entry)
 * @param clothing_shell_id
 */
async function deleteClothingShellCountsForClothingShell(
  clothing_shell_id: number
) {
  logger.info(
    `graphql > deleteClothingShellCountsForClothingShell() :: args: clothing_shell_id: ${clothing_shell_id}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation deleteClothingShellMaindataForClothingShell(
          $clothing_shell_id: Int!
        ) {
          delete_clothing_shell_counts(
            where: { clothing_shell_id: { _eq: $clothing_shell_id } }
          ) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        clothing_shell_id,
      },
    });
    return data.data.delete_clothing_shell_counts;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteClothingShellCountsForClothingShell };
