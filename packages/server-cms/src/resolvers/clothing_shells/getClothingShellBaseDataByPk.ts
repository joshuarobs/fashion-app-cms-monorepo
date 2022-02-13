import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets the clothing shell's base data (by pk), i.e. no other data from other
 * tables (except for aggregates).
 * This is used for going on the Clothing Shell page, for data required by the
 * Header, overview and settings tab
 */
async function getClothingShellBaseDataByPk(id: number) {
  logger.info(`graphql > getClothingShellBaseDataByPk() | args: id: ${id}`);

  try {
    const data = await client.query({
      query: gql`
        query getClothingShellBaseDataByPk($id: Int!) {
          clothing_shells_by_pk(id: $id) {
            id
            created_at
            updated_at
            counts {
              id
              item_count
            }
            clothing_shell_maindata_revisions(
              order_by: { revision: desc }
              limit: 1
            ) {
              id
              revision
              state
              clothing_shell_maindata(
                limit: 1
                order_by: { is_release: desc }
              ) {
                id
                name
              }
            }
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.clothing_shells_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getClothingShellBaseDataByPk };
