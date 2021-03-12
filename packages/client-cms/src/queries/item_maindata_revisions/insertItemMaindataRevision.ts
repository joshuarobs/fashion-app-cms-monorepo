import { gql } from '@apollo/client';

const Insert_Item_Maindata_Revision = gql`
  mutation insertItemMaindataRevision(
    $id: Int!
    $revision: Int!
    $state: data_states_enum
  ) {
    insert_item_maindata_revisions_one(
      object: { item_id: $id, revision: $revision, state: $state }
    ) {
      id
      item_id
      revision
      state
    }
  }
`;

export { Insert_Item_Maindata_Revision };
