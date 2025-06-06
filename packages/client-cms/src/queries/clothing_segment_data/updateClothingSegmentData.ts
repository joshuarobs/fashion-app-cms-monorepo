import { gql } from '@apollo/client';

const Update_Clothing_Segment_Data = gql`
  mutation updateClothingSegmentData(
    $id: String!
    $changes: clothing_segment_data_set_input
  ) {
    updateClothingSegmentData(id: $id, changes: $changes) {
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
      clothing_shell_maindata {
        id
        #items_aggregate {
        #  aggregate {
        #    count
        #  }
        #}
      }
    }
  }
`;

export { Update_Clothing_Segment_Data };
