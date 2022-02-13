import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets a clothing segment data by its pk (barebones data only).
 * This is mainly going to be used by other functions and queries on the server.
 * @param id
 */
async function getClothingSegmentDataBB(id: string) {
  logger.info(`graphql > getClothingSegmentDataBB() | args: id: ${id}`);

  try {
    const data = await client.query({
      query: gql`
        query getClothingSegmentDataBB($id: uuid!) {
          clothing_segment_data_by_pk(id: $id) {
            id
            clothing_shell_maindata {
              id
              revision_id
            }
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.clothing_segment_data_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getClothingSegmentDataBB };
