import { gql } from '@apollo/client';

const Delete_Item_Maindata_Revision_Admin_Edit = gql`
  mutation deleteItemMaindataRevisionAdminEdit($id: String!) {
    deleteItemMaindataRevisionAdminEdit(id: $id) {
      id
      item_id
      revision
      state
    }
  }
`;

export { Delete_Item_Maindata_Revision_Admin_Edit };
