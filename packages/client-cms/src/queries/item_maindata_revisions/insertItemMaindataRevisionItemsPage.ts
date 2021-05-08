import { gql } from '@apollo/client';

const Insert_Item_Maindata_Revision_Items_Page = gql`
  mutation insertItemMaindataRevisionItemsPage($id: Int!) {
    insertItemMaindataRevisionItemsPage(id: $id) {
      id
      item_id
      revision
      state
    }
  }
`;

export { Insert_Item_Maindata_Revision_Items_Page };
