import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets a clothing shell maindata revision by its pk (all of its data and
 * foreign key data).
 * This is mainly going to be used by other functions and queries on the server.
 * @param id
 */
async function getClothingShellMaindataRevisionByPk(id: string) {
  logger.info(
    `graphql > getClothingShellMaindataRevisionByPk() | args: id: ${id}`
  );

  try {
    const data = await client.query({
      query: gql`
        query getClothingShellMaindataRevisionByPk($id: uuid!) {
          clothing_shell_maindata_revisions_by_pk(id: $id) {
            id
            clothing_shell_id
            revision
            state
            clothing_shell_maindata(order_by: { is_release: desc }) {
              id
              revision_id
              is_release
              name
              uniform_thickness
              default_shell_layer_id
              default_fill_layer_id
              default_lining_layer_id
              default_interlining_layer_id
              item_type
              clothing_segment_data_id
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
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });
    return data.data.clothing_shell_maindata_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getClothingShellMaindataRevisionByPk };
