import { gql } from '@apollo/client';

// Insert a new clothing segment data
// Used in the Clothing Shells list page, when creating a new clothing shell
const Insert_New_Blank_Clothing_Segment_Data = gql`
  mutation newBlankClothingSegmentData {
    insert_clothing_segment_data_one(object: {}) {
      id
    }
  }
`;

export { Insert_New_Blank_Clothing_Segment_Data };
