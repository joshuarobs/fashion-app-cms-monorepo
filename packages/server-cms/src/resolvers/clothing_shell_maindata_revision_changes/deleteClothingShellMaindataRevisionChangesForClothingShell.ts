import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteClothingShellMaindataRevisionChangesForClothingShell(
  clothing_shell_id: number
) {
  logger.info(
    `graphql > deleteClothingShellMaindataRevisionChangesForClothingShell() :: args: clothing_shell_id: ${clothing_shell_id}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation deleteClothingShellMaindataRevisionChangesForClothingShell(
          $clothing_shell_id: Int!
        ) {
          delete_clothing_shell_maindata_revision_changes(
            where: {
              clothing_shell_maindata_revision: {
                clothing_shell_id: { _eq: $clothing_shell_id }
              }
            }
          ) {
            returning {
              id
              clothing_shell_maindata_revision {
                id
              }
            }
          }
        }
      `,
      variables: {
        clothing_shell_id,
      },
    });
    return data.data.delete_clothing_shell_maindata_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteClothingShellMaindataRevisionChangesForClothingShell };
