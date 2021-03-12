import { gql } from '@apollo/client';

const Insert_Item_Translation = gql`
  mutation insertItemTranslation(
    $revision_id: uuid!
    $is_release: Boolean!
    $full_name: String!
    $short_name: String
    $description: String
  ) {
    insert_item_translations_one(
      object: {
        revision_id: $revision_id
        is_release: $is_release
        full_name: $full_name
        short_name: $short_name
        description: $description
      }
    ) {
      id
      revision_id
      is_release
      full_name
      short_name
      description
    }
  }
`;

export { Insert_Item_Translation };
