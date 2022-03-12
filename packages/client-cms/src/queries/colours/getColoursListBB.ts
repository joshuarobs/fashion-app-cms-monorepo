import { gql } from '@apollo/client';

const Get_Colours_List_BB = gql`
  query getColoursListBB($limit: Int, $offset: Int) {
    getColoursListBB(limit: $limit, offset: $offset) {
      id
      name
      base_colour
      colour_code
      updated_at
    }
  }
`;

export { Get_Colours_List_BB };
