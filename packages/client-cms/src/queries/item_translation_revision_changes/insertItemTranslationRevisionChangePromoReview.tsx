import { gql } from '@apollo/client';

const Insert_Item_Translation_Revision_Change_Promo_Review = gql`
  mutation insertItemTranslationRevisionChangePromoReview(
    $revisionId: uuid!
    $userId: Int!
  ) {
    insert_item_translation_revision_changes_one(
      object: {
        item_translation_revision_id: $revisionId
        change_type: Promotion
        to_state: Review
        user_id: $userId
      }
    ) {
      id
      date
      action
      change_type
      to_state
      item_translation_revision_id
      user_id
    }
  }
`;

export { Insert_Item_Translation_Revision_Change_Promo_Review };
