import { gql } from '@apollo/client';

const Add_Item_Maindata_Revision_Fix_Prompt = gql`
  mutation addItemMaindataRevisionFixPrompt(
    $id: Int!
    $name: String!
    $item_type: item_types_enum!
  ) {
    addItemMaindataRevisionFixPrompt(
      id: $id
      name: $name
      item_type: $item_type
    ) {
      id
      item_id
      revision
      state
    }
  }
`;

export { Add_Item_Maindata_Revision_Fix_Prompt };
