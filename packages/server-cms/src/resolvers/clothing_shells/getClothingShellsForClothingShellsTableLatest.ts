import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { Max_Limit_Data_Entry_Query_Amount } from '../../settings';

/**
 * Gets relevant basic information about clothing shells
 * Obtains the latest entries, i.e. one of all unique item entries in their
 * latest revision
 * This is used for going on the Items (list) page, and Clothing shells page
 * (and anything else that uses the clothing shells table popup)
 */
async function getClothingShellsForClothingShellsTableLatest(
  limit: number,
  offset: number
) {
  if (limit > Max_Limit_Data_Entry_Query_Amount)
    limit = Max_Limit_Data_Entry_Query_Amount;

  try {
    const data = await client.query({
      query: gql`
        query getClothingShellsForClothingShellsTableLatest(
          $limit: Int
          $offset: Int
        ) {
          clothing_shells(
            order_by: { updated_at: desc }
            limit: $limit
            offset: $offset
          ) {
            id
            updated_at
            clothing_shell_maindata_revisions_aggregate {
              aggregate {
                count
              }
            }
            clothing_shell_and_body_segment_masks_aggregate {
              aggregate {
                count
              }
            }
            latest_revision: clothing_shell_maindata_revisions(
              order_by: { revision: desc }
              limit: 1
            ) {
              id
              revision
              state
              clothing_shell_maindata(
                order_by: { is_release: desc }
                limit: 1
              ) {
                id
                name
                default_shell_layer_id
                default_fill_layer_id
                default_lining_layer_id
                clothing_segment_data_id
                clothing_segment_data {
                  id
                  left_body_end_back
                  left_body_end_front
                  left_body_start_back
                  left_body_start_front
                  left_sleeve_end_back
                  left_sleeve_end_front
                  left_sleeve_start_back
                  left_sleeve_start_front
                  right_body_end_back
                  right_body_end_front
                  right_body_start_back
                  right_body_start_front
                  right_sleeve_end_back
                  right_sleeve_end_front
                  right_sleeve_start_back
                  right_sleeve_start_front
                }
              }
            }
            latest_prod: clothing_shell_maindata_revisions(
              where: { state: { _eq: Production } }
              order_by: { revision: desc }
              limit: 1
            ) {
              id
              revision
              state
              clothing_shell_maindata(
                order_by: { is_release: desc }
                limit: 1
              ) {
                id
                name
                default_shell_layer_id
                clothing_segment_data_id
                clothing_segment_data {
                  id
                  left_body_end_back
                  left_body_end_front
                  left_body_start_back
                  left_body_start_front
                  left_sleeve_end_back
                  left_sleeve_end_front
                  left_sleeve_start_back
                  left_sleeve_start_front
                  right_body_end_back
                  right_body_end_front
                  right_body_start_back
                  right_body_start_front
                  right_sleeve_end_back
                  right_sleeve_end_front
                  right_sleeve_start_back
                  right_sleeve_start_front
                }
              }
            }
          }
        }
      `,
      variables: {
        limit,
        offset,
      },
    });
    return data.data.clothing_shells;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getClothingShellsForClothingShellsTableLatest };
