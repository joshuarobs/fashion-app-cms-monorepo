import { gql } from '@apollo/client';

const Get_Item_Global_Media_Revisions_Given_Item_Id = gql`
  query getItemGlobalMediaRevisionsGivenItemId($item_id: Int!) {
    getItemGlobalMediaRevisionsGivenItemId(item_id: $item_id) {
      id
      item_id
      revision
      state
    }
  }
`;

export { Get_Item_Global_Media_Revisions_Given_Item_Id };
