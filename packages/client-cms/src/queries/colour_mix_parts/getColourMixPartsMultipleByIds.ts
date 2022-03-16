import { gql } from '@apollo/client';

const Get_Colour_Mix_Parts_Multiple_By_Ids = gql`
  query getColourMixPartsMultipleByIds($ids: [Int!]) {
    getColourMixPartsMultipleByIds(ids: $ids) {
      id
      colour_id
      colour {
        id
        base_colour
        colour_code
        name
      }
      percent
    }
  }
`;

export { Get_Colour_Mix_Parts_Multiple_By_Ids };
