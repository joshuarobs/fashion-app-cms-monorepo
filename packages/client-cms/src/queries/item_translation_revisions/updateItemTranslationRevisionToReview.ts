import { gql } from '@apollo/client';

/**
 * Updates the Item Translations Revision's state by promoting it:
 * Development --> Review
 *
 * Used in the Item > Localisations page's StateFrame, when the current state
 * is Development
 */
const Update_Item_Translation_Revision_State_Promote_To_Review = gql`
  mutation updateItemTranslationRevisionStatePromoteToReview(
    $revisionId: uuid!
  ) {
    update_item_translation_revisions_by_pk(
      pk_columns: { id: $revisionId }
      _set: { state: Review }
    ) {
      id
      item_id
      locale_code
      revision
      state
    }
  }
`;

export { Update_Item_Translation_Revision_State_Promote_To_Review };
