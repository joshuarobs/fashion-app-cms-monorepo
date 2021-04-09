import { gql } from '@apollo/client';

const Get_Item_Maindata_Revision_By_Rev_And_Item_Id = gql`
  query getItemMaindataRevisionByRevAndItemId($itemId: Int!, $revision: Int!) {
    getItemMaindataRevisionByRevAndItemId(
      itemId: $itemId
      revision: $revision
    ) {
      id
      item_id
      revision
      state
      item_maindata {
        id
        is_release
        name
        type
        brand_id
        for_gender
        brand {
          id
          logo_url
          name
          counts {
            id
            item_count
          }
        }
        clothing_shell_id
        clothing_shell {
          id
          # name
          counts {
            id
            item_count
          }
          clothing_shell_maindata_revisions {
            id
            revision
            clothing_shell_maindata {
              id
              is_release
              name
              uniform_thickness
              default_shell_layer_id
              default_fill_layer_id
              default_lining_layer_id
              default_interlining_layer_id
              item_type
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
        made_in_id
        made_in {
          value
          description
        }
      }
    }
  }
`;

export { Get_Item_Maindata_Revision_By_Rev_And_Item_Id };
