import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { DataState } from '@joshuarobs/clothing-framework';

async function insertClothingShellMaindataRevision(
  clothing_shell_id: number,
  revision: number,
  state: DataState
) {
  try {
    const data = await client.mutate({
      mutation: gql`
        mutation insertClothingShellMaindataRevision(
          $clothing_shell_id: Int!
          $revision: Int!
          $state: data_states_enum
        ) {
          insert_clothing_shell_maindata_revisions_one(
            object: {
              clothing_shell_id: $clothing_shell_id
              revision: $revision
              state: $state
            }
          ) {
            id
            clothing_shell_id
            revision
            state
          }
        }
      `,
      variables: {
        clothing_shell_id,
        revision,
        state,
      },
    });
    return data.data.insert_clothing_shell_maindata_revisions_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertClothingShellMaindataRevision };
