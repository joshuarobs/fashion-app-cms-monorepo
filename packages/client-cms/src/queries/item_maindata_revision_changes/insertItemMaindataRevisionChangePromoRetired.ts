import { gql } from '@apollo/client';

const Insert_Item_Maindata_Revision_Change_Promo_Retired = gql`
  mutation insertItemMaindataRevisionChangePromoRetired(
    $revisionId: uuid!
    $userId: Int!
  ) {
    insert_item_maindata_revision_changes_one(
      object: {
        item_maindata_revision_id: $revisionId
        change_type: Promotion
        to_state: Retired
        user_id: $userId
      }
    ) {
      id
      date
      action
      change_type
      to_state
      item_maindata_revision_id
      user_id
    }
  }
`;

export { Insert_Item_Maindata_Revision_Change_Promo_Retired };
