import { gql } from '@apollo/client';

const Update_Item_Maindata_Revision_To_Retired = gql`
  mutation updateItemMaindataRevisionToRetired($revisionId: uuid!) {
    update_item_maindata_revisions_by_pk(
      pk_columns: { id: $revisionId }
      _set: { state: Retired }
    ) {
      id
      item_id
      revision
      state
    }
  }
`;

export { Update_Item_Maindata_Revision_To_Retired };
