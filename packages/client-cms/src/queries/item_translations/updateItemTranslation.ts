import { gql } from '@apollo/client';

const Update_Item_Translation = gql`
  mutation updateItemTranslation(
    #    $revisionId: uuid!
    #    $isRelease: Boolean!
    $id: uuid!
    $changes: item_translations_set_input
  ) {
    update_item_translations_by_pk(
      #      pk_columns: { revision_id: $revisionId, is_release: $isRelease }
      pk_columns: { id: $id }
      _set: $changes
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

export { Update_Item_Translation };
