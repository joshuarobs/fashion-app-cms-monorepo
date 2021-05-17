import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets all clothing shell maindata revision given a clothing shell id.
 * This is used for the Settings tab for the Clothing shell page.
 */
// Filename is: getLatestProdClothingShellMaindataRevByClothingShellId ???
async function getAllClothingShellMaindataRevisionsForClothingShell(
  clothingShellId: number,
  limit: number,
  offset: number
) {
  try {
    const data = await client.query({
      query: gql`
        query getAllClothingShellMaindataRevisionsForClothingShell(
          $clothingShellId: Int!
        ) {
          clothing_shell_maindata_revisions(
            where: { clothing_shell_id: { _eq: $clothingShellId } }
            order_by: { revision: desc }
          ) {
            id
            # item_id
            revision
            clothing_shell_maindata(order_by: { is_release: desc }) {
              id
              name
              clothing_segment_data_id
            }
          }
        }
      `,
      variables: {
        clothingShellId,
        limit,
        offset,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.clothing_shell_maindata_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getAllClothingShellMaindataRevisionsForClothingShell };
