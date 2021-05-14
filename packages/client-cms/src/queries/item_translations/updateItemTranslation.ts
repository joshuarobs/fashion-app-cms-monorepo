import { gql } from '@apollo/client';

const Update_Item_Translation = gql`
  mutation updateItemTranslation(
    $id: String!
    $changes: item_translations_set_input!
  ) {
    updateItemTranslation(id: $id, changes: $changes) {
      id
      revision_id
      is_release
      full_name
      short_name
      description
    }
  }
`;

export { Update_Item_Translation };
