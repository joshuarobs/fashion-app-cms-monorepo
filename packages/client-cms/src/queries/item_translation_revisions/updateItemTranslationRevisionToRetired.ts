import { gql } from '@apollo/client';

const Update_Item_Translation_Revision_To_Retired = gql`
  mutation updateItemTranslationRevisionToRetired($revisionId: uuid!) {
    update_item_translation_revisions_by_pk(
      pk_columns: { id: $revisionId }
      _set: { state: Retired }
    ) {
      id
      item_id
      locale_code
      revision
      state
    }
  }
`;

export { Update_Item_Translation_Revision_To_Retired };
