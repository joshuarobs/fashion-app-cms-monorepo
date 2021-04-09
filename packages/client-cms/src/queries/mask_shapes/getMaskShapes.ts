import { gql } from '@apollo/client';

const Get_Mask_Shapes = gql`
  query getMaskShapes {
    getMaskShapes {
      value
      description
    }
  }
`;

export { Get_Mask_Shapes };
