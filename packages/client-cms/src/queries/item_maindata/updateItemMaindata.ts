import { gql } from '@apollo/client';

const Update_Item_Maindata = gql`
  mutation updateItemMaindata(
    $id: String!
    $changes: item_maindata_set_input
    $itemId: Int!
    $countsId: Int
  ) {
    updateItemMaindata(
      id: $id
      changes: $changes
      itemId: $itemId
      countsId: $countsId
    ) {
      id
      name
      short_id
      type
      brand_id
      for_gender
      made_in_id
      clothing_shell_id
      clothing_shell {
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

export { Update_Item_Maindata };
