import { gql } from '@apollo/client';

const Get_Clothing_Shells_List_BB = gql`
  query getClothingShellsListBB($limit: Int, $offset: Int) {
    clothing_shells(
      order_by: { updated_at: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      updated_at
      counts {
        id
        item_count
      }
    }
  }
`;

export { Get_Clothing_Shells_List_BB };
