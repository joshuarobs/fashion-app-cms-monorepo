import { gql } from '@apollo/client';

/**
 * Inserts a new Item Global Media Revision within the Localisation's Locale
 * page, via the state button "New Revision".
 * The new Revision starts off in the `Development` state.
 * @param id - The item id
 */
const Insert_Item_Global_Media_Revision_Promote_New_Revision = gql`
  mutation insertItemGlobalMediaRevisionPromoteNewRevision($id: Int!) {
    insertItemGlobalMediaRevisionPromoteNewRevision(id: $id) {
      id
      item_id
      revision
      state
    }
  }
`;

export { Insert_Item_Global_Media_Revision_Promote_New_Revision };
