import { gql } from '@apollo/client';

const Get_All_Colour_Mix_Parts_Ids = gql`
  query getAllColourMixPartsIds {
    getAllColourMixPartsIds {
      id
    }
  }
`;

export { Get_All_Colour_Mix_Parts_Ids };
