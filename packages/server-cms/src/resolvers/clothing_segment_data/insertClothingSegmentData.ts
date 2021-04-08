import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

// Insert a new clothing segment data
// Used in the Clothing Shell page, within the state frame or in the repair
// prompt
async function insertClothingSegmentData() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertClothingSegmentData(
          $id: uuid!
          $right_sleeve_start_front: smallint
          $right_sleeve_end_front: smallint
          $right_sleeve_start_back: smallint
          $right_sleeve_end_back: smallint
          $left_sleeve_start_front: smallint
          $left_sleeve_end_front: smallint
          $left_sleeve_start_back: smallint
          $left_sleeve_end_back: smallint
          $right_body_start_front: smallint
          $right_body_end_front: smallint
          $right_body_start_back: smallint
          $right_body_end_back: smallint
          $left_body_start_front: smallint
          $left_body_end_front: smallint
          $left_body_start_back: smallint
          $left_body_end_back: smallint
          $sleeves_is_symmetrical: Boolean
          $sleeves_front_back_is_same: Boolean
          $body_is_symmetrical: Boolean
          $body_front_back_is_same: Boolean
        ) {
          insert_clothing_segment_data_one(
            object: {
              id: $id
              right_sleeve_start_front: $right_sleeve_start_front
              right_sleeve_end_front: $right_sleeve_end_front
              right_sleeve_start_back: $right_sleeve_start_back
              right_sleeve_end_back: $right_sleeve_end_back
              left_sleeve_start_front: $left_sleeve_start_front
              left_sleeve_end_front: $left_sleeve_end_front
              left_sleeve_start_back: $left_sleeve_start_back
              left_sleeve_end_back: $left_sleeve_end_back
              right_body_start_front: $right_body_start_front
              right_body_end_front: $right_body_end_front
              right_body_start_back: $right_body_start_back
              right_body_end_back: $right_body_end_back
              left_body_start_front: $left_body_start_front
              left_body_end_front: $left_body_end_front
              left_body_start_back: $left_body_start_back
              left_body_end_back: $left_body_end_back
              sleeves_is_symmetrical: $sleeves_is_symmetrical
              sleeves_front_back_is_same: $sleeves_front_back_is_same
              body_is_symmetrical: $body_is_symmetrical
              body_front_back_is_same: $body_front_back_is_same
            }
          ) {
            id
            right_sleeve_start_front
            right_sleeve_end_front
            right_sleeve_start_back
            right_sleeve_end_back
            left_sleeve_start_front
            left_sleeve_end_front
            left_sleeve_start_back
            left_sleeve_end_back
            right_body_start_front
            right_body_end_front
            right_body_start_back
            right_body_end_back
            left_body_start_front
            left_body_end_front
            left_body_start_back
            left_body_end_back
            sleeves_is_symmetrical
            sleeves_front_back_is_same
            body_is_symmetrical
            body_front_back_is_same
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

export { insertClothingSegmentData };
