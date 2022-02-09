import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets an item maindata revision by pk.
 *
 * This is used for the Overview tab for the Item page (State Frame) and as
 * a reusable component query in other complex functions.
 * @param id
 */
async function getItemMaindataRevision(id: string) {
  logger.info(`graphql > getItemMaindataRevision() :: args: id: ${id}`);

  try {
    const data = await client.query({
      query: gql`
        query getItemMaindataRevision($id: uuid!) {
          item_maindata_revisions_by_pk(id: $id) {
            id
            item_id
            state
            revision
            item_maindata(order_by: { is_release: desc }) {
              id
              is_release
              name
              for_gender
              brand_id
              clothing_shell_id
              item_family_id
              revision_id
              short_id
              type
            }
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.item_maindata_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemMaindataRevision };
