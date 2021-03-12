import { gql } from '@apollo/client';

const Get_Mask_Shapes = gql`
  query getMaskShapes {
    body_segment_mask_shapes {
      value
      description
    }
  }
`;

export { Get_Mask_Shapes };
