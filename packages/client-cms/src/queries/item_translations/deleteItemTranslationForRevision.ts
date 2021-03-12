import { gql } from '@apollo/client';

const Delete_Item_Translations_For_Revision = gql`
  mutation deleteItemTranslationsForRevision($revisionId: uuid!) {
    delete_item_translations(where: { revision_id: { _eq: $revisionId } }) {
      returning {
        id
        is_release
        revision_id
        full_name
        short_name
        description
      }
    }
  }
`;

export { Delete_Item_Translations_For_Revision };
