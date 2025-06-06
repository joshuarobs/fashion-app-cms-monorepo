import { gql } from '@apollo/client';

/**
 * Gets relevant basic information about clothing shells
 * Obtains the latest entries, i.e. one of all unique item entries in their
 * latest revision
 * This is used for going on the Items (list) page, and Clothing shells page
 * (and anything else that uses the clothing shells table popup)
 */
const Get_Clothing_Shells_For_Clothing_Shells_Table_Latest = gql`
  query getClothingShellsForClothingShellsTableLatest(
    $limit: Int
    $offset: Int
  ) {
    getClothingShellsForClothingShellsTableLatest(
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
      latest_revision {
        id
        revision
        state
        clothing_shell_maindata {
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
      latest_prod {
        id
        revision
        state
        clothing_shell_maindata {
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
`;

export { Get_Clothing_Shells_For_Clothing_Shells_Table_Latest };
