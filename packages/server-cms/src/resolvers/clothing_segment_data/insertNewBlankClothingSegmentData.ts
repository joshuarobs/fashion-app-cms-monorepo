import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

// Insert a new clothing segment data
// Used in the Clothing Shells list page, when creating a new clothing shell
async function insertNewBlankClothingSegmentData() {
  const loggerPrefix = '';
  logger.info(
    `${loggerPrefix}graphql > insertNewBlankClothingSegmentData() :: args: n/a`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation insertNewBlankClothingSegmentData {
          insert_clothing_segment_data_one(object: {}) {
            id
          }
        }
      `,
    });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `${loggerPrefix}graphql > insertNewBlankClothingSegmentData() :: Successfully returned data`
    );
    return data.data.insert_clothing_segment_data_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertNewBlankClothingSegmentData };
