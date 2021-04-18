import { gql } from '@apollo/client';

const Get_Clothing_Shell_Maindata_Revision_By_Rev_And_Clothing_Shell_Id = gql`
  query getClothingShellMaindataRevisionByRevAndClothingShellId(
    $clothingShellId: Int!
    $revision: Int!
  ) {
    getClothingShellMaindataRevisionByRevAndClothingShellId(
      clothingShellId: $clothingShellId
      revision: $revision
    ) {
      id
      clothing_shell_id
      revision
      state
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
`;

export { Get_Clothing_Shell_Maindata_Revision_By_Rev_And_Clothing_Shell_Id };
