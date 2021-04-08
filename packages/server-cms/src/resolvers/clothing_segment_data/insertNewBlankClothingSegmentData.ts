import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

// Insert a new clothing segment data
// Used in the Clothing Shells list page, when creating a new clothing shell
async function insertNewBlankClothingSegmentData() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertNewBlankClothingSegmentData {
          insert_clothing_segment_data_one(object: {}) {
            id
          }
        }
      `,
    });
    return data.data.insert_clothing_segment_data_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertNewBlankClothingSegmentData };
