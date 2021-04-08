import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertClothingShellMaindataRevision() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertClothingShellMaindataRevision(
          $id: Int!
          $revision: Int!
          $state: data_states_enum
        ) {
          insert_clothing_shell_maindata_revisions_one(
            object: {
              clothing_shell_id: $id
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
    });
    return data.data.insert_clothing_shell_maindata_revisions_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertClothingShellMaindataRevision };
