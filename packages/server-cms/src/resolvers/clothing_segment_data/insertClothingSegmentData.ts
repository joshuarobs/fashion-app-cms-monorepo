import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Insert a new clothing segment data.
 * Used in the Clothing Shell page, within the state frame or in the repair
 * prompt.
 */
async function insertClothingSegmentData(input: any) {
  const loggerPrefix = '';
  logger.info(
    `${loggerPrefix}graphql > insertClothingSegmentData() :: args: input: ${JSON.stringify(
      input,
      null,
      2
    )}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation insertClothingSegmentData(
          $object: clothing_segment_data_insert_input!
        ) {
          insert_clothing_segment_data_one(object: $object) {
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
      variables: {
        object: input,
      },
    });
    return data.data.insert_clothing_segment_data_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertClothingSegmentData };
