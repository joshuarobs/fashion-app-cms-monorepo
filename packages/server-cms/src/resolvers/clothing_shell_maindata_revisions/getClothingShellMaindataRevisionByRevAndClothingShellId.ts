import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getClothingShellMaindataRevisionByRevAndClothingShellId() {
  try {
    const data = await client.query({
      query: gql`
        query getClothingShellMaindataRevisionByRevAndClothingShellId(
          $clothingShellId: Int!
          $revision: Int!
        ) {
          clothing_shell_maindata_revisions(
            where: {
              clothing_shell_id: { _eq: $clothingShellId }
              revision: { _eq: $revision }
            }
            limit: 1
          ) {
            id
            clothing_shell_id
            revision
            state
            clothing_shell_maindata(order_by: { is_release: desc }) {
              id
              is_release
              name
              uniform_thickness
              default_shell_layer_id
              default_fill_layer_id
              default_lining_layer_id
              default_interlining_layer_id
              item_type
              clothing_segment_data_id
              default_shell_layer {
                id
              }
              default_fill_layer {
                id
              }
              default_lining_layer {
                id
              }
              default_interlining_layer {
                id
              }
              clothing_segment_data {
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
          }
        }
      `,
    });
    return data.data.clothing_shell_maindata_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getClothingShellMaindataRevisionByRevAndClothingShellId };
