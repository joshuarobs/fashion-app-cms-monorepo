import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Delete a clothing segment data by its primary key
 */
async function deleteClothingSegmentDataByPk(id: string, loggerPrefix = '') {
  // const loggerPrefix = '';
  logger.info(
    `${loggerPrefix}graphql > deleteClothingSegmentDataByPk() :: args: id: ${id}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation deleteClothingSegmentDataByPk($id: uuid!) {
          delete_clothing_segment_data_by_pk(id: $id) {
            id
          }
        }
      `,
      variables: {
        id,
      },
    });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `${loggerPrefix}graphql > deleteClothingSegmentDataByPk() :: Successfully returned data`
    );
    return data.data.delete_clothing_segment_data_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteClothingSegmentDataByPk };
