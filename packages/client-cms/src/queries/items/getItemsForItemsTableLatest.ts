import { gql } from '@apollo/client';

/**
 * Gets relevant basic information about items
 * Obtains the latest entries, i.e. one of all unique item entries in their
 * latest revision
 * This is used for going on the Items (list) page
 */
const Get_Items_For_Items_Table_Latest = gql`
  query getItemsForItemsTableLatest {
    items(order_by: { updated_at: desc }, limit: 20) {
      id
      short_id
      updated_at
      item_maindata_revisions_aggregate {
        aggregate {
          count
        }
      }
      latest_revision: item_maindata_revisions(
        order_by: { revision: desc }
        limit: 1
      ) {
        id
        revision
        state
        item_maindata(order_by: { is_release: desc }, limit: 1) {
          id
          name
          clothing_shell_id
          brand {
            id
            name
          }
          clothing_shell {
            id
            clothing_shell_maindata_revisions(
              where: { state: { _eq: Production } }
              order_by: { revision: desc }
              limit: 1
            ) {
              id
              revision
              clothing_shell_maindata(
                order_by: { is_release: desc }
                limit: 1
              ) {
                id
                name
                clothing_segment_data_id
                default_shell_layer_id
                default_fill_layer_id
                default_lining_layer_id
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
      }
      latest_prod: item_maindata_revisions(
        where: { state: { _eq: Production } }
        order_by: { revision: desc }
        limit: 1
      ) {
        id
        revision
        state
        item_maindata(order_by: { is_release: desc }, limit: 1) {
          id
          name
          clothing_shell_id
          brand {
            id
            name
          }
          clothing_shell {
            id
            clothing_shell_maindata_revisions(
              where: { state: { _eq: Production } }
              order_by: { revision: desc }
              limit: 1
            ) {
              id
              clothing_shell_maindata(
                order_by: { is_release: desc }
                limit: 1
              ) {
                id
                name
                clothing_segment_data_id
                default_shell_layer_id
                default_fill_layer_id
                default_lining_layer_id
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
              revision
            }
          }
        }
      }
    }
  }
`;

// query getItemsForItemsTableLatest {
//   items(order_by: { updated_at: desc }) {
//     id
//     short_id
//     updated_at
//     item_maindata_revisions_aggregate {
//       aggregate {
//         count
//       }
//     }
//     item_maindata_revisions(order_by: { revision: desc }, limit: 1) {
//       id
//       revision
//       state
//       item_maindata(order_by: { is_release: desc }, limit: 1) {
//         id
//         name
//         clothing_shell_id
//         brand {
//           id
//           name
//         }
//       }
//     }
//   }
// }

export { Get_Items_For_Items_Table_Latest };
