import { gql } from '@apollo/client';

const Get_Colour_Mix_Parts_List_BB = gql`
  query getColourMixPartsListBB($limit: Int, $offset: Int) {
    getColourMixPartsListBB(limit: $limit, offset: $offset) {
      id
      colour_id
      colour {
        id
        colour_code
        name
      }
      percent
      fabric_layer_and_colour_mix_parts_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export { Get_Colour_Mix_Parts_List_BB };
