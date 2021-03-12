import { gql } from '@apollo/client';

/**
 * Updates the Item Maindata Revision's state
 * Used in the Item page's StateFrame, typically when promoting to a newer state
 */
const Update_Item_Maindata_Revision_State = gql`
  mutation updateItemMaindataRevisionState(
    $revisionId: uuid!
    $state: data_states_enum!
  ) {
    update_item_maindata_revisions_by_pk(
      pk_columns: { id: $revisionId }
      _set: { state: $state }
    ) {
      id
      item_id
      revision
      state
    }
  }
`;

export { Update_Item_Maindata_Revision_State };
