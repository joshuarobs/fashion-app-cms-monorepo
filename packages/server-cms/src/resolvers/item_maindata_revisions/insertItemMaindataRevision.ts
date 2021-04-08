import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertItemMaindataRevision() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertItemMaindataRevision(
          $id: Int!
          $revision: Int!
          $state: data_states_enum
        ) {
          insert_item_maindata_revisions_one(
            object: { item_id: $id, revision: $revision, state: $state }
          ) {
            id
            item_id
            revision
            state
          }
        }
      `,
    });
    return data.data.insert_item_maindata_revisions_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemMaindataRevision };
